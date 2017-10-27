import * as query from './query';

var $;
var cdpFilterFeedConfig = cdpFilterFeedConfig || {};
var filterHash = {
  'type': 'types',
  'subject': 'categories',
  'language': 'langs',
  'series': 'series'
}

function initializeFilters() {
  // @todo need loop thru .cb-cdp-filters if mulitple filter menus are added to the page
  let filters = document.querySelectorAll('.cb-cdp-filters div.ui.dropdown'); 
  
  let config = {
    useLabels: false,
    onChange: function( value, text, selectedItem ) {
      updateFeed();
    }
  }
  
  forEach(filters, function(index, filter) {
    switch ( filter.id ) {
      case 'type':
        query.getTypes( filter, addOptions );
      break;

      case 'subject':
       query.getCategories( filter, addOptions );
      break;

      case 'series':
        query.getSeries( filter, addOptions );
      break;

      case 'language':
        query.getLanguages( filter, addOptions );
      break;
    }

    $( filter ).dropdown( config );
  });

  // if filters then init list
  addAllFeeds();
  enableFeedButton();
}

function updateFeed() {
  let dropdown = document.querySelector('.cb-cdp-filters');
  let target = dropdown.dataset.target;
  if( target ) {
    let config = cdpFilterFeedConfig[target];
    if( config ) {
      let filters = dropdown.querySelectorAll('div.ui.dropdown input');
      forEach(filters, function(index, filter) {
        if( filter.name !== 'sort' ) {
          config[filterHash[filter.name]] = filter.value;
        }
      });

      removeFeed( target );
      addFeed( config );
      // addFeed({
      //   selector: config.selector,
      //   ui: config.ui,
      //   query: query.builder(config)
      // });
    }
  }
}

function removeFeed( feed ) {
  $(`#${feed}`).empty();
}

function addFeed( config ) {
  try {
    CDP.widgets.ArticleFeed.new( config ).render();
  } catch( err ) {
    console.log('Unable to article feed: ' + err.message)
  }
}

function addAllFeeds() {
  let filteredFeed = document.querySelectorAll(
    "[data-content-type='cdp-filtered-list']"
  );
  
  forEach(filteredFeed, function(index, feed) {
    cdpFilterFeedConfig[feed.id] = {
      selector: `#${feed.id}`,
      sites: cdp.searchIndexes,  
      from: 0,
      size: 12,
      types: '',
      langs: '',
      tags: '',
      categories: '',
      meta: ['date'],
      ui: { openLinkInNewWin: 'no' }
    };

    addFeed( cdpFilterFeedConfig[feed.id] );
  });
}

function enableFeedButton() {
  let filteredFeed = document.querySelectorAll("[data-content-type='cdp-filtered-list']");
  forEach(filteredFeed, function(index, feed) {
    let btnId = `btn-${feed.id}`;
    let btn = document.getElementById(btnId);
    if( btn ) {
      btn.addEventListener('click', feedButtonOnClick, false);
    }
  });
}

function feedButtonOnClick(e) {
  let btn = e.currentTarget;
  if( btn.id ) {
    let id = btn.id.replace( 'btn-', '' );
    console.log(id)
    let div = document.getElementById( id );
    if( div ) {
      console.log(div)
    }
  }
}

/**
 * Add <option> to select
 * 
 * @param {*} select DOM element to append option to
 * @param {*} options  options data
 */
function addOptions( select, options ) {
  let menu = select.querySelector('.menu');
  if( menu && options ) {
    var fragment = document.createDocumentFragment();
    options.forEach(function(option) {
        var el = document.createElement('div');
        el.className = 'item';
        el.dataset.value = option.key;
        el.innerHTML = `<i class='checkmark icon'></i>${ option.display }`;
        fragment.appendChild(el);
    });
    menu.appendChild(fragment);
  }
  select.classList.remove('loading');
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
 * The post-list.twig file passess configuration props to the 
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
          var list = document.querySelector( e.detail );
          if(list) {
            var items = list.getElementsByClassName('article-item');
            if ( items.length ) { 
              forEach(items, function(index, item) {
                lookUpItem( item, config );
              });
            }
          }
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

export function init( jQuery ) {
  $ = jQuery;
  initializeFilters();
  initializeArticleFeed();
}
