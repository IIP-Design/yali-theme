function initializeFilters() {
  
}

/**
 * Render all article feeds to the page
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

  } catch (e) {
    console.log('Unable to article feed: ' + e.message)
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
