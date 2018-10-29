import bodybuilder from 'bodybuilder';
import axios from 'axios';

// NOTE: using ElasticSearch terms aggregations to find distinct values
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html

const API = ( cdp.publicAPI ) ? cdp.publicAPI : 'https://api.america.gov/v1/search';
const INDEXES = ( cdp.searchIndexes ) ? fetchArray( cdp.searchIndexes ) : 'yali.dev.america.gov';

// Populate dropdown filters
export function getTypes ( filter, cb ) {
  	cb( filter, [
    { key: 'article', display: 'Article' },
    { key: 'courses', display: 'Course' },
    { key: 'Podcast', display: 'Podcast' },
    { key: 'Video', display: 'Video' }
  ] );
}

export function getCategories ( filter, cb ) {
  	axios.post( API, {
    	body: bodybuilder()
      .size( 0 )
      .query( 'terms', 'site', INDEXES )
      .agg( 'terms', 'site_taxonomies.categories.name.keyword', {
        	'size': 1000,
        	'order': { '_term': 'asc' }
        },
        'distinct_categories', ( a ) => {
            return a.aggregation( 'terms', 'site_taxonomies.categories.name.keyword', { 'size': 1 }, 'display' );
        } )
      .build()
  } ).then( ( response ) => {
    	let data = formatResponse( response, 'distinct_categories', [ 'Uncategorized' ] );
      // work around has key value is not matching up
    	data = data.map( ( item ) => {
      	return {
        	key: item.key,
        	display: capitalize(item.key.replace( '&amp;', '&' ))
        };
      } );
    	cb( filter, data );
  } );
}

export function getSeries ( filter, cb ) {
  	axios.post( API, {
    	body: bodybuilder()
      .size( 0 )
      .query( 'terms', 'site', INDEXES )
      .agg( 'terms', 'site_taxonomies.series.name.keyword', {
        	'size': 1000,
        	'order': { '_term': 'asc' }
      }, 'distinct_series' )
      .build()
  } ).then( ( response ) => {
    	let data = formatResponse( response, 'distinct_series' );
    	cb( filter, data );
  } );
}

export function getLanguages ( filter, cb ) {
  	axios.post( API, {
    	body: bodybuilder()
      .size( 0 )
      .query( 'terms', 'site', INDEXES )
      .notFilter( 'term', 'language.locale', 'es' )
      .agg( 'terms', 'language.locale.keyword', {
        	'size': 200,
        	'order': { '_term': 'asc' }
        },
        'distinct_languages', ( a ) => {
            return a.aggregation( 'terms', 'language.display_name.keyword', { 'size': 1 }, 'display' );
        } )
      .build()
  } ).then( ( response ) => {
    	let data = formatResponse( response, 'distinct_languages' );
    	cb( filter, data, { key: 'en-us', value: 'English' } );
  } );

}

export function builder ( params, context ) {
  	let config = {
    	meta: params.meta,
    	selector: params.selector,
    	ui: params.ui,
    	query: generateBodyQry( {
      	sites: INDEXES,
      	langs: params.langs,
      	categories: fetchQry( 'category', context, params.categories ),
      	tags: fetchQry( 'tag', context, params.tags ),
      	types: fetchQry( 'content_type', context, params.types ),
      	series: fetchQry( 'series', context, params.series ),
      	from: ( params.from ) ? params.from : 0,
      	size: params.size,
      	sort: ( params.sort ) ? params.sort : 'recent'
    }, context )
  };

  	return config;
}

export const generateBodyQry = ( params, context ) => {
  let body = new bodybuilder();
  // let qry = [], str;

  appendFilter( body, params.sites, 'site' );

  // This only applies to courses. When branded field exists, it must be true.
  // YALI wants only courses YALI branded which all that this field represents.
  body.filter( 'bool', b => b
    .orFilter('term', 'branded', 'true')
    .orFilter('bool', f => f.notFilter('exists', 'branded'))
    .filterMinimumShouldMatch( 1 )
  );

  if ( params.series ) {
    appendFilter( body, params.series, 'site_taxonomies.series.name.keyword');
  }

  if ( params.tags ) {
    appendFilter( body, params.tags, 'site_taxonomies.tags.name.keyword');
  }

  if ( params.langs ) {
    // qry.push( ...appendQry( params.langs, 'language.locale' ) );
    appendFilter( body, params.langs, 'language.locale.keyword')
  }

  if ( params.categories ) {
    // leave for use w/multiple categories, i.e 'environment, climate'
    appendFilter( body, params.categories, [
      {
        key: 'categories.name.keyword',
        lowercase: true
      },
      {
        key: 'site_taxonomies.categories.name.keyword',
        lowercase: false
      }
    ] );
  }

  if ( params.types ) {
    let types = fetchArray( params.types );
    body.filter( 'bool', b => {
      types.forEach( ( type ) => {
        switch ( type ) {
          case 'article':
            b.orFilter( 'term', 'type.keyword', 'post')
            .orFilter( 'term', 'type.keyword', 'page');
            break;

          case 'courses':
            b.orFilter( 'term', 'type.keyword', 'courses');
            break;

          case 'Podcast':
          case 'Video':
            b.orFilter( 'term', 'site_taxonomies.content_type.name.keyword', type );
            break;

          default:
            b.orFilter( 'term', 'type.keyword', type );
        }
      } );
      return b.filterMinimumShouldMatch(1);
    } );
  }

  // let qryStr = reduceQry( qry );
  // if ( qryStr.trim() !== '' ) {
  //   body.query( 'query_string', 'query', qryStr );
  // }

  body.from( params.from );
  body.size( params.size );

  if ( params.sort === 'recent' ) {
    body.sort( 'published', 'desc' );
  } else {
    body.sort( 'title.keyword', 'asc' );
  }
  return body.build();
};


// Helpers
function formatResponse ( response, type, itemsToRemove ) {
  	if ( !response.data.aggregations || !response.data.aggregations[ type ] ) { return null; }

  	let buckets = response.data.aggregations[ type ].buckets;
  	if ( !buckets ) { return null; }

  // only return buckets with valid key
  	buckets = buckets.filter( bucket => bucket.key );

  	if ( itemsToRemove ) {
    	if ( Array.isArray( itemsToRemove ) ) {
      	buckets = buckets.filter( bucket => !itemsToRemove.includes( bucket.key ) );
    }
  }

  	return buckets.map( bucket => {
    	return {
      	key: bucket.key,
      	display: getDisplayName( bucket )
    };
  } );
}

function getDisplayName ( bucket ) {
  	let display = bucket.display;
  	if ( display && display.buckets && display.buckets[ 0 ] && display.buckets[ 0 ].key ) {
    	let key = bucket.display.buckets[ 0 ].key;
    	return key.replace( '&amp;', '&' );
  } else {
    	return capitalize( bucket.key );
  }
}


function capitalize ( string ) {
  	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

function fetchArray ( str ) {
    if ( typeof str === 'string' ) return str.split( ',' ).map( item => item.trim() );
    return str;
}

const fetchQry = ( qry, context, params ) => {
  	return ( context && context.filter === qry && context.filterValue )
    ? context.filterValue
    : params;
};

/**
 * Attaches an OR filter for each of the values for each of the keys onto the
 * provided bodybuilder. A minimum of 1 filter should match.
 * Keys can be objects with properties: key, lowercase.
 * The key property is the name of the field (string)
 * and the lowercase property is a boolean for whether or not
 * the search term should be lowercased.
 *
 * @param body
 * @param vals
 * @param keys
 */
const appendFilter = ( body, vals, keys ) => {
  const terms = fetchArray( vals );
  const fields = fetchArray( keys );
  body.filter( 'bool', b => {
    fields.forEach( ( field ) => {
      let fieldKey = field;
      let lowercase = false;
      if ( typeof field === 'object' ) {
        fieldKey = field.key;
        lowercase = field.lowercase;
      }
      terms.forEach( ( term ) => {
        b.orFilter( 'term', fieldKey, lowercase ? term.toLowerCase() : term );
      } );
    } );
    return b.filterMinimumShouldMatch(1);
  } );
};

// const appendQry = ( str, field ) => {
//   	let items = fetchArray( str );
//   	if ( typeof field === 'string' ) {
//       return items.map( item => `${field}: ${item}` );
//     }
//     return items.map( item => `(${field.reduce( ( accum, subField ) => {
//       accum.push(`${subField}:'${item}'`);
//       return accum;
//     }, [] ).join( ' OR ' )})` );
// };

// const reduceQry = ( qry ) => {
//   	let qryStr = qry.reduce( ( acc, value, index, arr ) => {
//     	if ( index === ( arr.length - 1 ) ) {
//       	acc += value;
//     } else {
//       	acc += `(${value}) AND `;
//     }
//     	return acc;
//   }, '' );

//   	return qryStr;
// };