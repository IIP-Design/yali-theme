import * as query from './query';

var $;
var cdpFilterFeedConfig = cdpFilterFeedConfig || {};

/**
 * Hash is needed as the cdp article feed module is expecting
 * types, categories, etc for its search.  The hash maps the 
 * properties to the filter values
 */
var filterHash = {
  'type': 'types',
  'subject': 'categories',
  'language': 'langs',
  'series': 'series',
  'sort': 'sort'
}

/**
 * Adds 'onReadyFeed' listener to list. 'onReadyFeed' is fired from react module
 * to indicate that the articles have been added to the DOM.  Processing that 
 * needs the article DOM ready are handled within listener
 * @param {string} id id of feed list
 */
function addOnFeedReadyHandler( id ) {
  let el = $(`#${id}`);
  
  window.addEventListener('onReadyFeed', function(e) {
    let items = el.find('.article-item');
    forEach(items, function(index, item) {
     if ( item.dataset.type === 'courses') {
        addLinkToCoursePage( item );
     }
    });
    let itemLen = items.length;
    el.css( 'min-height', '200px' );
    if ( itemLen ) {
      items.addClass('animate-in').fadeIn().promise().done( () => {
        //window.removeEventListener('onReadyFeed');
      });
    } else {
      let noResults = el.find('.article-no-results');
      if( noResults ) {
        noResults.css('display', 'block');
      }
    }

    feedButtonSetState( id, itemLen );
  });
}


/**
 * Convert title of courses to a link (courses type is just data so we are using the naming 
 * convention for course pages of ''/course-[id of data course] to dynamically create links)
 * Pages that contain a course MUST adhere to this or the link will not work
 * @param {object} article article element
 */
function addLinkToCoursePage( article ) {
  if( article ) {
    let link = article.querySelector( '.article-title_link' );
    if( !link ) {
      let el = article.querySelector( '.article-title' );
      let text  = el.textContent;
      el.textContent = '';
      let a = document.createElement('a');
      let url = window.location.protocol + '//' + window.location.host + '/course-' + article.dataset.id;
      a.className = 'article-title_link'; //'item-link';
      a.setAttribute( 'href', url );
      a.textContent = text;
      el.append(a);
      // let el = article.querySelector( '.article-content' );
      // a.innerHTML = 'Take the Course';
      // el.appendChild(a);
    }
  }
}

/**
 * Initialisze dropdowns, feeds and "Show More" button.
 */
function initializeFilters() {
  let filterGroup = document.querySelectorAll( '.cb-cdp-filters' );
   forEach( filterGroup, function(index, group ) {
    let feed = document.querySelector( `#${group.dataset.target}` );
    let filters = group.querySelectorAll( 'div.ui.dropdown' ); 
       if ( filters.length ) {
         initializeDropDownSelects(filters);
         initializeFeed( feed ) ;
         initializeFeedButton(feed);
       }
   });
}

/**
 * Populate dropdown filter menus.  The type of filter is found
 * in the id attribute of the dropdown element
 */
function initializeDropDownSelects( filters ) {
  let config = {
    useLabels: false,
    onChange: function(value, text, selectedItem) {
      updateFeed(); // add debounce, or do check in article feed
    }
  };

  forEach(filters, function(index, filter) {
    switch (filter.id) {
      case 'type':
        query.getTypes(filter, addOptions);
        break;

      case 'subject':
        query.getCategories(filter, addOptions);
        break;

      case 'series':
        query.getSeries(filter, addOptions);
        break;

      case 'language':
        query.getLanguages(filter, addOptions);
        break;
    }

    $(filter).dropdown(config);
  });
}

/**
 * update the feed when a filter changes. The feed config is stored in
 * the cdpFilterFeedConfig object by feeds id for reference
 */
function updateFeed() {
  let dropdown = document.querySelector('.cb-cdp-filters');
  let target = dropdown.dataset.target;
  if( target ) {
    let config = cdpFilterFeedConfig[target];
    if( config ) {
      let filters = dropdown.querySelectorAll('div.ui.dropdown input');
      forEach(filters, function(index, filter) {
        config[filterHash[filter.name]] = filter.value;
      });
     
      removeFeed( target, config );
    }
  }
}

/**
 * Remove feed list from the DOM and reset 'from' and selector.  Reset
 * is needed as additional feeds may have been added by clicking 'Show More'
 * @param {string} feed DOM id of parant containing feed list
 */
function removeFeed( feed, config ) {
  let el = $(`#${feed}`);
  let items = el.find('.article-item');
  el.css('min-height', el.height() );
  items.addClass('animate-out').promise().done(function() {
    el.empty();
    config.selector = `#${feed}`;
    config.from = 0;
    addFeed( query.builder(config) );
  });
}

/**
 * Add a feed
 * @param {Object} config Configuration object that is sent to feed widget
 */
function addFeed( config ) {
  try {
    CDP.widgets.ArticleFeed.new( config ).render();
  } catch( err ) {
    console.log('Unable to article feed: ' + err.message)
  }
}

/**
 * Add all filtered feeds (may be more than 1 filtered list on the page) to
 * the DOM. Set an initial search config and store it in the cdpFilterFeedConfig 
 * object
 */
function initializeFeed( feed ) {
  // Types allows search to only search specific types (generally for cases where there
  // is not a fliter for a specifc type, i.e. featured courses page)
  let types = feed.dataset.types ? feed.dataset.types : '';

  cdpFilterFeedConfig[feed.id] = {
    selector: `#${feed.id}`,
    sites: cdp.searchIndexes,
    from: 0,
    size: 12,
    sort: 'recent',
    types: types,
    langs: 'en',
    series: '',
    meta: ['date'],
    categories: '',
    ui: { openLinkInNewWin: 'no' }
  };

  addOnFeedReadyHandler(feed.id);
  addFeed(cdpFilterFeedConfig[feed.id]);

}

/****** Button functions ********/

/**
 * Add 'click' listener to 'Show More' button if present
 */
function initializeFeedButton( feed ) {
  //let filteredFeed = document.querySelectorAll("[data-content-type='cdp-filtered-list']");
  // forEach(filteredFeed, function(index, feed) {
  let btnId = `btn-${feed.id}`;
  let btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', feedButtonOnClick, false);
  }
  // });
}

/**
 * Added additional search results to the DOM when 'Show More'
 * is clicked.  Update search config to reflect 'from' position
 * Create a div to attached next group of results.  New div is 
 * added to the current feed so that it will be removed upon
 * filter change
 * @param {event object} e 
 */
function feedButtonOnClick(e) {
  let btn = e.currentTarget;
  if( btn.id ) {
    let id = btn.id.replace( 'btn-', '' );
    let div = document.getElementById( id );
    if( div ) {
      let config = cdpFilterFeedConfig[id];
      let from = config.from + config.size;
      let cls = 'from-' + from;

      let el = document.createElement('div');
      el.className = cls;
      div.appendChild(el);
      config.selector = `.${cls}`;
      config.from = from;

      addFeed( query.builder(config) );
    }
  }
}

/**
 * Hide/show 'Show More' button based on search results
 * The button will be hidden if:
 * 1. Number of search results within intial return < number of results requested by size param
 * 2. Requested size param >= total elastic hit count (i.e. there may be 100 total results, by config only shows config.size)
 * 3. Exhausted all results by clicking 'Show More'
 * @param {*} id id of feed
 * @param {number} itemLen Number of search results within intial return
 */
function feedButtonSetState( id, itemLen ) {
  let el = document.getElementById( id ), grp;
  if( el ) {
    grp = el.querySelector( '.article-item-group' );
  }
 
  let btn = document.querySelector(`#btn-${id}`);
  let config = cdpFilterFeedConfig[id];
  let total = ( grp && grp.dataset.total ) ? grp.dataset.total : config.size;

  if( btn ) {
    if( itemLen < config.size || config.size >= total || (config.from + config.size) >= total ) {
      btn.style.visibility = 'hidden';  // should this be hidden for non filter content blocks?
    } else {
      btn.style.visibility = 'visible'; 
    }
  }
}

/**
 * Add <div> for each filter value to dropdown
 * 
 * @param {*} select DOM element to append div to
 * @param {*} options  filter value
 */
function addOptions( filter, options, selected ) {
  let menu = filter.querySelector('.menu');
  if( menu && options ) {
    var fragment = document.createDocumentFragment();
    options.forEach(function(option) {
        var el = document.createElement('div');
        el.className = 'item';
        el.dataset.value = option.key;
       // el.innerHTML = `<i class='checkmark icon'></i>${ option.display }`; (adds checkbox for mulit select)
        el.textContent = option.display; 
        fragment.appendChild(el);
    });
    menu.appendChild(fragment);
  }
 
  filter.classList.remove( 'loading' );
  filterSetSelected( filter, selected );
}


function filterSetSelected( filter, selected ) {
  if ( selected ) {
    let input = filter.querySelector( 'input[type=hidden]');
    let div = filter.querySelector( '.text' );
    if( input ) {
      input.value = selected.key;
    }
    if (div) {
      div.textContent = selected.value;
    }
  }
}

/**
 * Render all article feeds to the page if
 * a data-cdp-article-feed exists
 */
function initializeArticleFeed() {
  let feeds = document.querySelectorAll(
    "[data-content-type='cdp-article-feed']"
  );
  forEach(feeds, function(index, feed) {
    renderArticleFeed(feed);
  });
}

/**
 * Render a specific article feed to the page
 * The post-list.twig file passess php configuration props to the 
 * feed widget via the cdpFeedConfig object declared in that page
 * cdpFeedConfig is a hash which stores each article feed config by its feed id
 * 
 * @param {object} feed Configuration object
 */
function renderArticleFeed( feed ) {
  let config = cdpFeedConfig[feed.id];
  let configObj = {
    selector: `#${feed.id}`,
    sites: config.indexes,  // need to have a default
    size: config.numPosts,
    types: '',
    ids: config.ids,
    langs: '',
    tags: '',
    categories: config.categories,
    meta: config.postMeta,
    ui: {
      layout: config.uiLayout,
      direction: config.uiDirection,
      openLinkInNewWin: 'no',
      image: {
        shape: config.image['image-shape'],
        width:  config.image['image-height'],
        borderWidth: config.image['image-border-width'],
        borderColor: config.image['image-border-color'],
        borderStyle: config.image['image-border-style']
      }
    }
  }

  shouldDisplayRelatedLinks( config );
  addFeed( configObj );
}

/**
 * Attaches supplemental link under article content. detail prop of e
 * event object is added in article module and contains the id list
 * contiaining the items. 
 * @param {event object} e 
 * @param {*} config Configuration obj passed in via post-list.twig file
 */
function addRelatedLinksToArticle(e, config) {
  var list = document.querySelector( e.detail );
  if(list) {
    var items = list.getElementsByClassName('article-item');
    if ( items.length ) { 
      forEach(items, function(index, item) {
        lookUpItem( item, config );
      });
    }
  }
}

/**
 * Determines whether a related link should be added to each article
 * by checking to see if there are relatedPosts.  If there is
 * we wait for the 'onReadyFeed' event to be dispatched by the
 * React component to ensure the component is available before 
 * appending link
 * 
 * @param {object} config  Configuration object
 */
function shouldDisplayRelatedLinks( config ) {
  const { selectBy, ids, relatedPosts } = config;
  if ( selectBy === 'custom' ) {
    if ( Array.isArray(ids) && Array.isArray(relatedPosts) ) {
      if (ids.length && relatedPosts.length) {
        // react component dispatches custom 'onReadyFeed' after articles are added to the DOM
        window.addEventListener('onReadyFeed', function(e) {
          addRelatedLinksToArticle(e, config )
        });
      }
    }
  }
}

/**
 * Figure out what DOM element to append to by using the relatedPosts
 * array to look up item by index. The related posts array indexes correspond
 * to the main ids index
 * i.e. id of article to add is ids[index] 
 * and its correspinding related link is at same index in realtedPosts[index]
 * 
 * @param {*} item  li.article-item DOM element
 * @param {*} config  Configuration object
 */
function lookUpItem( item, config ) { 
  const { ids, relatedPosts, relatedDisplay } = config;

  if (item.dataset.id) {
    ids.map((id, index) => {
      if (id === item.dataset.id) {
        let related = relatedPosts[index];
        if (related) {
          appendItem(item, related, relatedDisplay );
        }
      }
    });
  }
}

/**
 * Append link 
 * @param {*} item  li.article-item DOM element
 * @param {object} related Link config
 * @param {string} relatedDisplay Display 'link' as link or 'button'
 */
function appendItem( item, related, relatedDisplay ) {
  if (item) {
    var contentDiv = item.getElementsByClassName('article-content');
    if (contentDiv && contentDiv.length) {
      var div = document.createElement('div');
      div.setAttribute('class', 'cb_button');

      var a = document.createElement('a');
      a.setAttribute('href', related.link);

      if ( relatedDisplay === 'button') {
        a.setAttribute('class', 'ui button item');
      } else {
        a.setAttribute('class', 'item-link');
      }

      a.innerText = related.label;
      div.appendChild(a);
      contentDiv[0].appendChild(div);
    }
  }
}

// Helper method that creates forEach method to loop over NodeList
const forEach = function(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};


/**
 * Entry point
 * @param {object} jQuery Reference to jquery
 */
export function init( jQuery ) {
  $ = jQuery;
  initializeFilters();
  initializeArticleFeed();
}