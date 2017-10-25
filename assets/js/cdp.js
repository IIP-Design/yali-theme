import * as query from './query';

var cdpFilterFeedConfig = cdpFilterFeedConfig || {};

function initializeFilters() {
  let filters = document.querySelectorAll('.cb-cdp-filters select');
  forEach(filters, function(index, filter) {
    switch ( filter.name ) {
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

      case 'sort':
      break;
    }
  });

  // if filters then init list
  displayFilterFeed();
  enableFilterButton();
}

function displayFilterFeed() {
  let filteredFeed = document.querySelectorAll(
    "[data-content-type='cdp-filtered-list']"
  );
  
  forEach(filteredFeed, function(index, feed) {
    cdpFilterFeedConfig[feed.id] = {
      selector: `#${feed.id}`,
      sites: cdp.searchIndexes,  
      from: 0,
      size: 9,
      types: '',
      langs: '',
      tags: '',
      categories: '',
      ui: { openLinkInNewWin: 'no' }
    };

    try {
      CDP.widgets.ArticleFeed.new( cdpFilterFeedConfig[feed.id] ).render();
    } catch( err ) {
      console.log('Unable to article feed: ' + err.message)
    }
  });
}

function enableFilterButton() {
  let filteredFeed = document.querySelectorAll("[data-content-type='cdp-filtered-list']");
  forEach(filteredFeed, function(index, feed) {
    let btn = `btn-${feed.id}`;
    document.getElementById(btn).addEventListener('click', addToList, false);
  });
}

function addToList(e) {
  console.log(e.currentTarget)
  console.log('button clicked')
}

/**
 * Add <option> to select
 * 
 * @param {*} select DOM element to append option to
 * @param {*} options  options data
 */
function addOptions( select, options ) {
  if( options ) {
    var fragment = document.createDocumentFragment();
    options.forEach(function(option) {
        var el = document.createElement('option');
        el.value = option.key;
        el.textContent = option.display;
        fragment.appendChild(el);
    });
    
    select.appendChild(fragment);
  }
  select.parentNode.classList.remove('loading');
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

  shouldDisplayRelatedLinks( config );

  try {
    CDP.widgets.ArticleFeed.new({
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
    }).render();

  } catch (err) {
    console.log('Unable to article feed: ' + err.message)
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

export function init() {
  initializeFilters();
  initializeArticleFeed();
}
