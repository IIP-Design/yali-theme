import bodybuilder from 'bodybuilder';
import axios from 'axios';

// NOTE: using ElasticSearch terms aggregations to find distinct values
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html

const API = ( cdp.publicAPI ) ? cdp.publicAPI : 'https://api.america.gov/v1/search';  
const INDEXES = (cdp.searchIndexes) ? fetchArray(cdp.searchIndexes) : 'yali.dev.america.gov';

// Populate dropdown filters
export function getTypes( filter, cb ) { 
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
    cb( filter, data )
  });
}

export function getCategories( filter, cb ) {
  axios.post(API , {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg( 'terms', 'categories.name.keyword', { 
          'size': 1000,  
          'order': { '_term' : 'asc' } 
        }, 
        'distinct_categories', (a) => { 
          return a.aggregation('terms', 'categories.name.keyword', { 'size': 1 }, 'display')
        })
      .build(),
  }).then( (response) => {
    let data = formatResponse( response, 'distinct_categories' ) 
    cb( filter, data )
  });
}

export function getSeries( filter, cb ) {
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
    cb( filter, data )
  });
}

export function getLanguages( filter, cb ) {
  axios.post(API, {
    body: bodybuilder()
      .size(0)
      .query( 'terms', 'site', INDEXES )
      .notFilter( 'term', 'language.locale', 'es')
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
    cb( filter, data, { key: 'en', value: 'English'} )
  });

}

export function builder ( params )  {
  let config = {
    meta: params.meta,
    selector: params.selector,
    ui: params.ui,
    query: generateBodyQry({
      sites: INDEXES,
      langs: params.langs,
      categories: params.categories,
      types: params.types,
      series: params.series,
      from: params.from,
      size: params.size,
      sort: params.sort
    })
  }

  return config;
}

export const generateBodyQry = ( params ) => {
  let body = new bodybuilder();
  let qry = [];

  params.sites.forEach( (item) => {
    body.orFilter('term', 'site', item )
  });

  // becomes a MUST if there is only 1 site
  body.filterMinimumShouldMatch(1)  

  if ( params.series ) {
    body.filter('term', 'taxonomies.series.name.keyword', params.series ) // need exact match
  }

  if ( params.langs ) {
    qry.push( ...appendQry(params.langs, 'language.locale') );
  }

  if ( params.categories ) {
    qry.push( ...appendQry(params.categories, 'categories.name') );
  }

  if ( params.types ) {
    qry.push( ...appendQry(params.types, 'type') );
  }

  let qryStr  = reduceQry( qry );
  if( qryStr.trim() !== '' ) {
    body.query( 'query_string', 'query', qryStr );
  }

  body.from( params.from ); 
  body.size( params.size ); 
  
  if( params.sort === 'recent' ) {
    body.sort( 'published', 'desc' );
  } else {
    body.sort( 'title.keyword', 'asc' );
  }
 
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
  //console.log(str.split(',').filter( item => item.trim()) );
  return str.split(',').map( item => item.trim() );
}

const appendQry = ( str, field ) => {
   let items = fetchArray( str );
   return items.map( item => `${field}: ${item}` );
}
 
const reduceQry = ( qry ) => {
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