import bodybuilder from 'bodybuilder';
import axios from 'axios';

// NOTE: using ElasticSearch terms aggregations to find distinct values
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html

const API = ( cdp.publicAPI ) ? cdp.publicAPI : 'https://api.america.gov/v1/search';  
const INDEXES = (cdp.searchIndexes) ? fetchIndexes(cdp.searchIndexes) : 'yali.dev.america.gov';

export function getTypes( select, cb ) { 
  axios.post( API, {
    body: bodybuilder()
      .size(0)
      .query('terms', 'site', INDEXES )
      .agg('terms', 'type.keyword', {  
        'size': 50, 
        'order': { '_term' : 'asc' }  }, 'type'
      )
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
      }, 
      'distinct_series')
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

// Helpers
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

function fetchIndexes( str ) {
  return str.split(',').map( item => item.trim() );
}
