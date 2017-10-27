import bodybuilder from 'bodybuilder';
import axios from 'axios';

// NOTE: using ElasticSearch terms aggregations to find distinct values
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html

const API = ( cdp.publicAPI ) ? cdp.publicAPI : 'https://api.america.gov/v1/search';  
const INDEXES = (cdp.searchIndexes) ? fetchArray(cdp.searchIndexes) : 'yali.dev.america.gov';

// Populate dropdown filters
export function getTypes( select, cb ) { 
  axios.post( API, {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg('terms', 'type.keyword', {  
        'size': 50, 
        'order': { '_term' : 'asc' }  }, 'type')
      .build(),
  }).then( (response) => {
    let data = formatResponse( response, 'type' ) 
    cb( select, data )
  });
}

export function getCategories( select, cb ) {
  axios.post(API , {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg( 'terms', 'categories.slug.keyword', { 
          'size': 1000,  
          'order': { '_term' : 'asc' } 
        }, 
        'distinct_categories', (a) => { 
          return a.aggregation('terms', 'categories.name.keyword', { 'size': 1 }, 'display')
        })
      .build(),
  }).then( (response) => {
    let data = formatResponse( response, 'distinct_categories' ) 
    cb( select, data )
  });
}

export function getSeries( select, cb ) {
  axios.post(API , {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg( 'terms', 'taxonomies.series.name.keyword', { 
        'size': 1000,  
        'order': { '_term' : 'asc' } 
        }, 'distinct_series')
      .build(),
  }).then( (response) => {
    let data = formatResponse( response, 'distinct_series' );
    cb( select, data )
  });
}

export function getLanguages( select, cb ) {
  axios.post(API, {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg('terms', 'language.locale.keyword', {
          'size': 200,  
          'order': { '_term' : 'asc' } 
        }, 
        'distinct_languages', (a) => {
          return a.aggregation('terms', 'language.display_name.keyword', {  'size': 1  }, 'display')
        })
      .build(),
  }).then( (response) =>{
    let data = formatResponse( response, 'distinct_languages' ) 
    cb( select, data )
  });

}

export function builder ( params )  {
  let body = new bodybuilder();

  INDEXES.forEach( (item) => {
    body.orFilter('term', 'site', item )
  });

  // becomes a MUST if there is only 1 site
  body.filterMinimumShouldMatch(1)  
  
  let qry = [];
  qry.push( ...appendArray(params.langs, 'language.locale') );
  qry.push( ...appendArray(params.categories, 'categories.name') );
  qry.push( ...appendArray(params.tags, 'tags.name') );
  qry.push( ...appendArray(params.types, 'type') );
   
  let qryStr  = reduceArray( qry );
  body.query( 'query_string', 'query', qryStr );
 
  body.from( params.from ); 
  body.size( params.size ); 
  
  body.sort( 'published', 'desc' )

  return body.build();
};


// Helpers
function formatResponse( response, type ) {
  if( !response.data.aggregations[type] ) { return null; }

  let buckets = response.data.aggregations[type].buckets;
  if( !buckets ) {  return null; }

  // only return buckets with valid key
  buckets = buckets.filter( bucket => bucket.key );
 
  return buckets.map( bucket => {
    return { 
      key: bucket.key,
      display: getDisplayName( bucket )
    }
  });
}

function getDisplayName( bucket ) {
  let display = bucket.display;
  if( display &&  display.buckets && display.buckets[0] && display.buckets[0].key ) {
    return bucket.display.buckets[0].key;
  } else {
    return capitalize( bucket.key );
  }
 }


 function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchArray( str ) {
  return str.split(',').filter( item => item.trim() ).map( item => item );
}

function appendArray ( val, field )  {
  let items = ( typeof val == 'string') ? fetchArray( val ) : val;
  return items.map( item => `${field}: ${item}` );
}

function reduceArray ( qry )  {
 let qryStr = qry.reduce((acc, value, index, arr) => {
   if (index === (arr.length - 1)) {
     acc += value;
   } else {
     acc += `${value} AND `;
   }
   return acc;
 }, '');

 return qryStr;
}
