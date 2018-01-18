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
    { key: 'podcast', display: 'Podcast' },
    { key: 'video', display: 'Video' }
  ] );
}

export function getCategories ( filter, cb ) {
  	axios.post( API, {
    	body: bodybuilder()
      .size( 0 )
      .query( 'terms', 'site', INDEXES )
      .agg( 'terms', 'categories.name.keyword', {
        	'size': 1000,
        	'order': { '_term': 'asc' }
      },
      'distinct_categories', ( a ) => {
        	return a.aggregation( 'terms', 'categories.name.keyword', { 'size': 1 }, 'display' );
      } )
      .build()
  } ).then( ( response ) => {
    	let data = formatResponse( response, 'distinct_categories', [ 'Uncategorized' ] );
    // work around has key value is not matching up
    	let d = data.map( ( item ) => {
      	return {
        	key: item.key,
        	display: item.key.replace( '&amp;', '&' )
      };
    } );
    	cb( filter, d );
  } );
}

export function getSeries ( filter, cb ) {
  	axios.post( API, {
    	body: bodybuilder()
      .size( 0 )
      .query( 'terms', 'site', INDEXES )
      .agg( 'terms', 'taxonomies.series.name.keyword', {
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
    	cb( filter, data, { key: 'en', value: 'English' } );
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
      	types: params.types,
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
  	let qry = [], str;

  	params.sites.forEach( ( item ) => {
    	body.orFilter( 'term', 'site', item );
  } );

  // Becomes a MUST if there is only 1 site
  	body.filterMinimumShouldMatch( 1 );

  // @todo FIX: unbranded courses are appearing in general queries
  	body.orQuery( 'bool', b => b
    .orFilter( 'term', 'branded', 'yes' )
    .orFilter( 'bool', b => b.notFilter( 'exists', 'field', 'branded' ) )
    .filterMinimumShouldMatch( 1 )
  );
  //body.orQuery('term', 'branded', 'yes').orFilter('bool', b => b.notFilter('exists', 'field', 'branded'));


  	if ( params.series ) {
    	body.filter( 'term', 'taxonomies.series.slug.keyword', params.series );
  }

  	if ( params.tags ) {
    	body.filter( 'term', 'tags.slug.keyword', params.tags );
  }

  	if ( params.langs ) {
    	qry.push( ...appendQry( params.langs, 'language.locale' ) );
  }

  	if ( params.categories ) {
    	str = `categories.name: ${params.categories} OR categories.slug: ${params.categories}`;
    	qry.push( str );
    // leave for use w/multiple categories, i.e 'environment, climate'
    // qry.push( ...appendQry(params.categories, 'categories.name') ); 
  }

  	if ( params.types ) {
    	switch ( params.types ) {
      case 'article':
        	str = 'type: post OR type: page';
        	qry.push( str );
        	break;

      case 'courses':
        	str = 'type: courses AND branded: yes';
        	qry.push( str );
        	break;

      case 'podcast':
      case 'video':
        	str = `taxonomies.content_type.slug:  ${params.types}`;
        	qry.push( str );
        	break;

      default:
        	qry.push( ...appendQry( params.types, 'type' ) );
    }
  }

  	let qryStr = reduceQry( qry );


  	if ( qryStr.trim() !== '' ) {
    	body.query( 'query_string', 'query', qryStr );
  }

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
  	if ( !response.data.aggregations[ type ] ) { return null; }

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
  //console.log(str.split(',').filter( item => item.trim()) );
  	return str.split( ',' ).map( item => item.trim() );
}

const fetchQry = ( qry, context, params ) => {
  	return ( context && context.filter === qry && context.filterValue )
    ? context.filterValue
    : params;
};

const appendQry = ( str, field ) => {
  	let items = fetchArray( str );
  	return items.map( item => `${field}: ${item}` );
};

const reduceQry = ( qry ) => {
  	let qryStr = qry.reduce( ( acc, value, index, arr ) => {
    	if ( index === ( arr.length - 1 ) ) {
      	acc += value;
    } else {
      	acc += `${value} AND `;
    }
    	return acc;
  }, '' );

  	return qryStr;
};