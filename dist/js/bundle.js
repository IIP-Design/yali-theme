(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('core-js/fn/promise');

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promise[key];
    }
  });
});

exports.default = function () {

  // Array.from - Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = function () {
      var toStr = Object.prototype.toString;
      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function toInteger(value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }();
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback /*, thisArg*/) {

      var T, k;

      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If isCallable(callback) is false, throw a TypeError exception. 
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.
      if (arguments.length > 1) {
        T = arguments[1];
      }

      // 6. Let k be 0.
      k = 0;

      // 7. Repeat while k < len.
      while (k < len) {

        var kValue;

        // a. Let Pk be ToString(k).
        //    This is implicit for LHS operands of the in operator.
        // b. Let kPresent be the result of calling the HasProperty
        //    internal method of O with argument Pk.
        //    This step can be combined with c.
        // c. If kPresent is true, then
        if (k in O) {

          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k];

          // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined.
    };
  }

  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {

        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        // 1. Let O be ? ToObject(this value).
        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          // c. Increase k by 1. 
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

  // NodeList.prototype.forEach
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // String.prototype.includes
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      'use strict';

      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }

  // Number.isInteger
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
  Number.isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };

  // CustomEvent
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
  (function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  })();

  // ParentNode.append()
  // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Polyfill
  // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
        return;
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();

          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });

          this.appendChild(docFrag);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
}();

},{"core-js/fn/promise":47}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
	// Language Toggle Buttons
	var lang_btns = [].concat(_toConsumableArray(document.querySelectorAll('.lang-btn')));

	// Toggle Vids on click
	lang_btns.forEach(function (btn) {

		btn.addEventListener('click', function () {
			var langBtnToDisplay = document.querySelector('.lang-btn.hide'),
			    alumniVidsToDisplay = document.querySelector('.alumni_vids.hide'),
			    currentAlumniVids = document.querySelector('.alumni_vids:not(.hide)');

			this.classList.add('hide');
			langBtnToDisplay.classList.remove('hide');

			currentAlumniVids.classList.add('hide');
			alumniVidsToDisplay.classList.remove('hide');

			// Set opacity to 0, then remove so user notices video change
			alumniVidsToDisplay.classList.add('transitioning');
			setTimeout(function () {
				alumniVidsToDisplay.classList.remove('transitioning');
			}, 250);
		});
	});
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = application_status;
function application_status() {
	var application_status_div = document.querySelector('.application_status');
	var application_open_date = document.querySelector('#countdatetime') ? new Date(document.querySelector('#countdatetime').value) : null;

	if (!application_status_div || !application_open_date) return;

	var today = new Date(),
	    app_year = application_open_date.getFullYear(),
	    today_year = today.getFullYear(),
	    app_month = application_open_date.getMonth(),
	    today_month = today.getMonth(),
	    app_date = application_open_date.getDate(),
	    today_date = today.getDate();

	if (app_year < today_year) {
		application_status_div.classList.add('app_closed');
	} else if (app_year == today_year && app_month < today_month) {
		application_status_div.classList.add('app_closed');
	} else if (app_month == today_month && app_date < today_date) {
		application_status_div.classList.add('app_closed');
	}
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;

var _query = require('./query');

var query = _interopRequireWildcard(_query);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $;
var cdpFilterFeedConfig = cdpFilterFeedConfig || {};

/**
 * Hash is needed as the cdp article feed module is expecting
 * types, categories, etc for its search.  The hash maps the
 * properties to the filter values
 */
var filterHash = {
	type: 'types',
	subject: 'categories',
	language: 'langs',
	series: 'series',
	sort: 'sort'
};

/**
 * Default filter config
 */
var defaultFilterConfig = {
	sites: cdp.searchIndexes,
	from: 0,
	size: 12,
	sort: 'recent',
	types: '',
	langs: 'en-us',
	series: '',
	meta: ['date'],
	categories: '',
	ui: { openLinkInNewWin: 'no' }
};

/**
 * Adds 'onReadyFeed' listener to list. 'onReadyFeed' is fired from react module
 * to indicate that the articles have been added to the DOM.  Processing that
 * needs the article DOM ready are handled within listener
 * @param {string} id id of feed list
 */
function addOnFeedReadyHandler(id) {
	var el = $('#' + id);
	window.addEventListener('onReadyFeed', function (e) {
		var items = el.find('.article-item');
		forEach(items, function (index, item) {
			if (item.dataset.type === 'courses') {
				addLinkToCoursePage(item);
			}
		});
		var itemLen = items.length;
		el.css('min-height', '200px');
		if (itemLen) {
			items.addClass('animate-in').fadeIn().promise().done(function () {
				//window.removeEventListener('onReadyFeed');
			});
		} else {
			var noResults = el.find('.article-no-results');
			if (noResults) {
				noResults.css('display', 'block');
			}
		}

		feedButtonSetState(id, itemLen);
	});
}

/**
 * Convert title of courses to a link (courses type is just data so we are using the naming
 * convention for course pages of ''/course-[id of data course] to dynamically create links)
 * Pages that contain a course MUST adhere to this or the link will not work
 * @param {object} article article element
 */
function addLinkToCoursePage(article) {
	if (article) {
		var _window$location = window.location,
		    protocol = _window$location.protocol,
		    host = _window$location.host;

		var url = protocol + '//' + host + '/course-' + article.dataset.id;

		// add link to course title
		var link = article.querySelector('.article-title_link');
		if (!link) {
			var el = article.querySelector('.article-title');
			var text = el.textContent;
			el.textContent = '';
			var a = document.createElement('a');
			a.className = 'article-title_link'; //'item-link';
			a.setAttribute('href', url);
			a.setAttribute('rel', 'noopener noreferrer');
			a.textContent = text;
			el.append(a);
			// let el = article.querySelector( '.article-content' );
			// a.innerHTML = 'Take the Course';
			// el.appendChild(a);
		}

		// add link to course thumbnail image
		var thumbLink = article.querySelector('[class^="article-image_"] > a');
		if (thumbLink && !thumbLink.href) {
			thumbLink.setAttribute('href', url);
		}
	}
}

/**
 * Initialisze dropdowns, feeds and "Show More" button.
 */
function initializeFilters() {
	var filterGroup = document.querySelectorAll('.cb-cdp-filters');
	forEach(filterGroup, function (index, group) {
		var feed = document.querySelector('#' + group.dataset.target);
		var filters = group.querySelectorAll('div.ui.dropdown');
		if (filters.length) {
			initializeDropDownSelects(filters, feed);
			initializeFeed(feed);
			initializeFeedButton(feed);
		}
	});
}

/**
 * Populate dropdown filter menus.  The type of filter is found
 * in the id attribute of the dropdown element
 */
function initializeDropDownSelects(filters, feed) {
	var config = {
		useLabels: false,
		onChange: function onChange(value, text, selectedItem) {
			updateFeed(selectedItem); // add debounce, or do check in article feed
		}
	};

	forEach(filters, function (index, filter) {
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
 * Update the feed when a filter changes. The feed config is stored in
 * the cdpFilterFeedConfig object by feeds id for reference
 */
function updateFeed(selectedItem) {
	var dropdown = $(selectedItem.context).closest('.cb-cdp-filters');
	var target = dropdown.data('target');
	if (target) {
		var config = cdpFilterFeedConfig[target];
		if (config) {
			var filters = dropdown.find('div.ui.dropdown input');
			forEach(filters, function (index, filter) {
				config[filterHash[filter.name]] = filter.value;
			});
			removeFeed(target, config);
		}
	}
}

/**
 * Remove feed list from the DOM and reset 'from' and selector.  Reset
 * is needed as additional feeds may have been added by clicking 'Show More'
 * @param {string} feed DOM id of parent containing feed list
 */
function removeFeed(feed, config) {
	var el = $('#' + feed);
	var items = el.find('.article-item');
	var context = getFilterContext(feed);
	el.css('min-height', el.height());
	items.addClass('animate-out').promise().done(function () {
		el.empty();
		config.selector = '#' + feed;
		config.from = 0;
		addFeed(query.builder(config, context));
	});
}

/**
 * Add a feed
 * @param {Object} config Configuration object that is sent to feed widget
 */
function addFeed(config) {
	try {
		CDP.widgets.ArticleFeed.new(config).render();
	} catch (err) {
		console.log('Unable to article feed: ' + err.message);
	}
}

/**
 * Add all filtered feeds (may be more than 1 filtered list on the page) to
 * the DOM. Set an initial search config and store it in the cdpFilterFeedConfig
 * object
 */
function initializeFeed(feed) {
	// Types allows search to only search specific types (generally for cases where there
	// is not a fliter for a specifc type, i.e. featured courses page)
	var types = feed.dataset.types ? feed.dataset.types : '',
	    id = feed.id;

	cdpFilterFeedConfig[id] = deepClone(defaultFilterConfig);
	cdpFilterFeedConfig[id].selector = '#' + id;

	/**
  * yaliCbLang_feed##### is declared in post-filtered-list.twig.
  * Allows campaign team to create post-filtered-list
  * content blocks with a preselected language.
  * @see IIPNET-131
  */
	var langObj = window['yaliCbLang_' + id];
	if (langObj) {
		cdpFilterFeedConfig[id].langs = langObj.key;
	}

	if (types) {
		cdpFilterFeedConfig[id].types = types;
	}

	// check to see if this feed sits on an archive page.
	var context = getFilterContext(feed);

	addOnFeedReadyHandler(id);
	addFeed(query.builder(cdpFilterFeedConfig[id], context));
}

/* ================== BUTTON FUNCTIONS ================== */

/**
 * Add 'click' listener to 'Show More' button if present
 */
function initializeFeedButton(feed) {
	// let filteredFeed = document.querySelectorAll("[data-content-type='cdp-filtered-list']");
	// forEach(filteredFeed, function(index, feed) {
	var btnId = 'btn-' + feed.id;
	var btn = document.getElementById(btnId);
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
	var btn = e.currentTarget;
	if (btn.id) {
		var id = btn.id.replace('btn-', '');
		var div = document.getElementById(id);
		if (div) {
			var config = cdpFilterFeedConfig[id];
			var from = config.from + config.size;
			var cls = 'from-' + from;

			var el = document.createElement('div');
			el.className = cls;
			div.appendChild(el);
			config.selector = '.' + cls;
			config.from = from;

			addFeed(query.builder(config));
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
function feedButtonSetState(id, itemLen) {
	var el = document.getElementById(id),
	    grp = void 0;
	if (el) {
		grp = el.querySelector('.article-item-group');
	}

	var btn = document.querySelector('#btn-' + id);
	var config = cdpFilterFeedConfig[id];
	if (config) {
		var total = grp && grp.dataset.total ? grp.dataset.total : config.size;

		if (btn) {
			if (itemLen < config.size || config.size >= total || config.from + config.size >= total) {
				btn.style.visibility = 'hidden'; // should this be hidden for non filter content blocks?
			} else {
				btn.style.visibility = 'visible';
			}
		}
	}
}

/**
 * Add <div> for each filter value to dropdown
 *
 * @param {*} select DOM element to append div to
 * @param {*} options  filter value
 */
function addOptions(filter, options, selected) {
	var menu = filter.querySelector('.menu');
	if (menu && options) {
		var fragment = document.createDocumentFragment();
		options.forEach(function (option) {
			if (option.key === 'pt-br') {
				var regex = /\s?\((B|b)ra(z|s)(i|í)l(|ia)\)/g;
				option.display = option.display.replace(regex, '');
			}
			var el = document.createElement('div');
			el.className = 'item';
			el.dataset.value = option.key;
			// el.innerHTML = `<i class='checkmark icon'></i>${ option.display }`; (adds checkbox for mulit select)
			el.textContent = option.display;
			fragment.appendChild(el);
		});
		menu.appendChild(fragment);
	}

	filter.classList.remove('loading');
	filterSetSelected(filter, selected);
}

function filterSetSelected(filter, selected) {
	if (selected) {
		var input = filter.querySelector('input[type=hidden]');
		var div = filter.querySelector('.text');
		var dropdown = $(input).closest('.cb_dropdown.cb-cdp-filters');
		var feedId = dropdown.data('target');
		var langObj = window['yaliCbLang_' + feedId];
		if (input) {
			input.value = langObj && langObj.key || selected.key;
		}
		if (div) {
			div.textContent = langObj && langObj.value || selected.value;
		}
	}
}

/**
 * Render all article feeds to the page if
 * a data-cdp-article-feed exists
 */
function initializeArticleFeed() {
	var feeds = document.querySelectorAll('[data-content-type=\'cdp-article-feed\']');
	forEach(feeds, function (index, feed) {
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
function renderArticleFeed(feed) {
	// check to see if this feed sits on an archive page.
	var context = getFilterContext(feed);

	// config that has contains all applicable params not neccessarily being sent to module
	var config = cdpFeedConfig[feed.id];
	var selectByTaxonomy = config.selectByTaxonomy;

	// config obj that houses ONLY params that get sent to cdp article feed module
	// need a clean config object to generate query outside of module if needed
	var configObj = {
		selector: '#' + feed.id,
		sites: config.indexes, // need to have a default
		size: config.numPosts,
		types: config.contentType === 'all' ? '' : config.contentType,
		ids: config.ids,
		langs: config.langs === 'all' ? '' : config.langs,
		tags: selectByTaxonomy === 'tag' ? config.tags : '',
		series: selectByTaxonomy === 'series' ? config.series : '',
		categories: selectByTaxonomy === 'category' ? config.categories : '',
		meta: config.postMeta,
		ui: {
			layout: config.uiLayout,
			direction: config.uiDirection,
			openLinkInNewWin: 'no',
			image: {
				shape: config.image['image-shape'],
				width: config.image['image-height'],
				borderWidth: config.image['image-border-width'],
				borderColor: config.image['image-border-color'],
				borderStyle: config.image['image-border-style']
			}
		}
	};

	shouldDisplayRelatedLinks(config);

	if (context || config.tags || config.series || config.categories) {
		// Build query outside of cdp module, since using some YALI specific params, i.e.series
		addFeed(query.builder(configObj, context));
	} else {
		// let module generate query since using standard params
		addFeed(configObj);
	}

	addOnFeedReadyHandler(feed.id);
}

/**
 * Attaches supplemental link under article content. detail prop of e
 * event object is added in article module and contains the id list
 * contiaining the items.
 * @param {event object} e
 * @param {*} config Configuration obj passed in via post-list.twig file
 */
function addRelatedLinksToArticle(e, config) {
	var list = document.querySelector(e.detail);
	if (list) {
		var items = list.getElementsByClassName('article-item');

		if (items.length) {
			forEach(items, function (index, item) {
				lookUpItem(item, config);
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
function shouldDisplayRelatedLinks(config) {
	var selectBy = config.selectBy,
	    ids = config.ids,
	    relatedPosts = config.relatedPosts;

	if (selectBy === 'custom') {
		if (Array.isArray(ids) && Array.isArray(relatedPosts)) {
			if (ids.length && relatedPosts.length) {
				// react component dispatches custom 'onReadyFeed' after articles are added to the DOM
				window.addEventListener('onReadyFeed', function (e) {
					addRelatedLinksToArticle(e, config);
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
function lookUpItem(item, config) {
	var ids = config.ids,
	    relatedPosts = config.relatedPosts,
	    relatedDisplay = config.relatedDisplay;

	var div = $(item).closest('[data-content-type]'),
	    contentType = void 0;

	if (div) {
		contentType = div.attr('data-content-type');
	}

	// only add related links if post list is a feed and not a filtered list
	if (contentType && contentType === 'cdp-article-feed') {
		if (item.dataset.id) {
			// Check if there is more than 2 posts (there is always an empty value in ids array)
			// If so, append appropriate button to each post
			if (ids.length > 2) {
				ids.map(function (id, index) {
					if (id === item.dataset.id) {
						var related = relatedPosts[index];
						if (related) {
							appendItem(item, related, relatedDisplay, false);
						}
					}
				});
			}
			// If only 1 post, append button(s) or dropdown
			else {
					ids.map(function (id, index) {
						if (id === item.dataset.id) {
							var useDropdown = void 0;
							relatedPosts.length > 2 ? useDropdown = true : useDropdown = false;

							relatedPosts.forEach(function (post) {
								appendItem(item, post, relatedDisplay, useDropdown);
							});

							// Init dropdown menu
							// Redirect on link selection
							$('.post_list_links_dropdown').dropdown({
								onChange: function onChange(value, text, selectedItem) {
									window.location.href = value;
								}
							});
						}
					});
				}
		}
	}
}

/**
 * Append link
 * @param {*} item  li.article-item DOM element
 * @param {object} related Link config
 * @param {string} relatedDisplay Display 'link' as link or 'button'
 */
function appendItem(item, related, relatedDisplay, useDropdown) {
	if (item) {
		var contentDiv = item.getElementsByClassName('article-content');
		if (contentDiv && contentDiv.length) {
			var a = document.createElement('a');
			// make link relative if on the same domain
			var host = '' + window.location.protocol;
			var link = related.link.replace(host, '');
			a.setAttribute('href', link);
			a.innerText = related.label;

			if (!useDropdown) {
				appendButtonOrLink(item, contentDiv, a, relatedDisplay);
			} else {
				appendDropdown(item, contentDiv, a, related);
			}
		}
	}
}

function appendButtonOrLink(item, contentDiv, a, relatedDisplay) {
	var div = document.createElement('div');
	div.setAttribute('class', 'cb_button');

	if (relatedDisplay === 'display_as_button') {
		a.setAttribute('class', 'ui button item');
	} else {
		a.setAttribute('class', 'item-link');
	}

	div.appendChild(a);
	contentDiv[0].appendChild(div);
}

function appendDropdown(item, contentDiv, a, related) {
	// Store links dropdown menu if it exists
	var linksDropdown = contentDiv[0].querySelector('.post_list_links_dropdown');

	// If links dropdown !exist, create wrapper div, select element & default option
	if (!linksDropdown) {
		var linksWrapper = document.createElement('div');
		linksWrapper.setAttribute('class', 'post_list_links_wrapper');

		linksDropdown = document.createElement('select');
		linksDropdown.setAttribute('class', 'ui dropdown button post_list_links_dropdown');

		var defaultOption = document.createElement('option');
		defaultOption.setAttribute('value', '');
		defaultOption.innerText = 'Select';

		// Append elements to 'article-content'
		linksDropdown.appendChild(defaultOption);
		linksWrapper.appendChild(linksDropdown);
		contentDiv[0].appendChild(linksWrapper);
	}

	// Create an option for each related link and append to select element
	var option = document.createElement('option');
	option.setAttribute('value', a);
	option.innerText = related.label;

	var itemSelectMenu = contentDiv[0].querySelector('.post_list_links_dropdown');
	itemSelectMenu.appendChild(option);
}

// Helper method that creates forEach method to loop over NodeList
var forEach = function forEach(array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
	}
};

/**
 * Checks to see if feed is stting on an archive page and return archive data
 *
 * @param {*} feed  Either a feed id string or the feed DOM element itself
 *
 * @returns DOM data attributes of parent element with '.archive_posts' class. Data elements
 * contain data-filter and data-filter-value, i.e. data-filter="series", data-filter-value="YALI Voices"
 */
var getFilterContext = function getFilterContext(feed) {
	var el = typeof feed == 'string' ? document.getElementById(feed) : feed;
	var archive = $(el).closest('div.archive_posts');
	return archive ? $(archive).data() : null;
};

/**
 * Recursively copy object.
 * Need to recursively copy (deep clone) as the UI prop is an object.
 * Cannot usesObject.assign() as it only copies property values.
 * If the source value is a reference to an object (i.e. ui prop), it only copies that reference value
 * @param {*} obj
 */
var deepClone = function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj));
};

/**
 * Entry point
 * @param {object} jQuery Reference to jquery
 */
function init(jQuery) {
	$ = jQuery;
	initializeFilters();
	initializeArticleFeed();
}

},{"./query":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;
var search_input_div = document.querySelector('.footer_list_item--search .search_input_wrapper'),
    search_input = document.querySelector('.footer_list_item--search .search_input_wrapper > input'),
    search_open = document.querySelector('.footer_list_item--search .search.icon'),
    search_close = document.querySelector('.footer_list_item--search .remove.icon'),
    search_submit = document.querySelector('#searchsubmit_footer'),
    footer_list_items = document.querySelectorAll('.footer_list .ui.item');

function footer_search_display() {
	try {
		search_open.addEventListener('click', function () {
			search_input_div.classList.remove('hide');

			search_submit.style.zIndex = '2';

			setTimeout(function () {
				search_input_div.style.opacity = 1;
				search_input.classList.remove('inactive');
				search_input.classList.add('active');
				search_open.classList.add('active');

				footer_phablet_display();
			}, 0);
		});
	} catch (e) {
		console.log('DOM element search_open is not defined');
	}
}

function footer_search_close() {
	try {
		search_close.addEventListener('click', function () {
			search_input.classList.remove('active');
			search_input.classList.add('inactive');

			search_submit.style.zIndex = '-1';

			setTimeout(function () {
				search_input_div.style.opacity = 0;
				search_input_div.classList.add('hide');
				search_open.classList.remove('active');
			}, 250);
		});
	} catch (e) {
		console.log('DOM element search_close is not defined');
	}
}

function footer_phablet_display() {
	if (window.innerWidth > 589 && window.innerWidth < 934) {
		var totalListWidth = 0;
		footer_list_items.forEach(function (item, index) {
			if (index !== footer_list_items.length - 1) totalListWidth += Math.ceil(Number(item.getBoundingClientRect().width));
		});

		search_input.style.width = totalListWidth + 'px';
	}
}

function init() {
	footer_search_display();
	footer_search_close();
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
	// Store imgs w/ preview data attr
	var imgs = [].concat(_toConsumableArray(document.querySelectorAll('[data-preview-image]')));
	if (imgs.length < 1) return; // return fn if no preview imgs

	imgs.forEach(function (img) {
		// Add click event for display
		img.addEventListener('click', function () {
			var
			// use fragment to add to DOM (faster, no repaint)
			fragment = document.createDocumentFragment(),

			// div to append to body, img, close elems
			img_preview_div = document.createElement('div'),
			    img_wrapper = document.createElement('div'),
			    img = document.createElement('img'),
			    close_wrapper = document.createElement('div'),
			    close = document.createElement('i');

			// add classes to each elem	
			img_preview_div.classList.add('image_preview');
			img_wrapper.classList.add('img_wrapper');
			close_wrapper.classList.add('close_preview');
			close.classList.add('remove', 'icon');

			// Set img src to clicked image
			img.src = this.dataset.previewImage;

			// add text to Close btn and add click event to close preview
			close_wrapper.innerHTML = 'CLOSE';
			close_wrapper.appendChild(close);
			close_preview(close_wrapper);

			// Append elems and add fragment to DOM
			img_wrapper.appendChild(img);
			img_wrapper.appendChild(close_wrapper);

			img_preview_div.appendChild(img_wrapper);

			fragment.appendChild(img_preview_div);
			document.body.appendChild(fragment);
		});
	});

	// Close Preview
	function close_preview(close_elem) {
		close_elem.addEventListener('click', function () {
			document.querySelector('.image_preview').remove();
		});
	}
}();

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Common vars
var form = document.querySelector('.join'),
    form_close = document.querySelector('.close--join_form'),
    formScrollPos = window.pageYOffset,
    formHiddenFields = document.querySelectorAll('.hide_on_init'),
    formPointer = document.querySelector('.upArrow--joinForm'),
    nav_join_desktop = document.querySelector('.nav_join--desktop'),
    nav_join_mobile = document.querySelector('.nav_join--mobile'),
    nav_items = document.querySelectorAll('.nav_menu_item:not(.nav_menu_item--social)'),
    site_title = document.querySelector('.nav_siteurl span');

function check_session_data() {
	var session = localStorage.session;

	if (session == null || session == 'new') {
		localStorage.session = 'new';
		form.style.display = 'block';

		site_title.textContent === 'Young African Leaders Initiative';
	}

	if (session == 'returning') {
		form.style.display = 'none';

		if (window.innerWidth > 933) {
			nav_join_desktop.style.display = 'inline-block';
		} else {
			nav_join_mobile.style.display = 'inline-block';
		}

		nav_items.forEach(function (item) {
			if (item.classList.contains('initial_wide')) item.classList.remove('initial_wide');
		});
	}
}

function close_form() {
	form_close.addEventListener('click', function () {
		localStorage.session = 'returning';
		form.style.display = 'none';

		nav_items.forEach(function (item) {
			if (item.classList.contains('initial_wide')) item.classList.remove('initial_wide');
		});

		if (window.innerWidth > 933) {
			nav_join_desktop.style.display = 'inline-block';
		} else {
			nav_join_mobile.style.display = 'inline-block';
			set_title();
		}
	});
}

function display_form() {
	// Display form and set formScrollPos
	[nav_join_desktop, nav_join_mobile].forEach(function (item) {
		item.addEventListener('click', function () {
			form.style.display = 'block';
			[].concat(_toConsumableArray(formHiddenFields)).forEach(function (field) {
				return field.classList.remove('hide_on_init');
			});

			formScrollPos = window.pageYOffset;
			formPointer.style.display = 'block';
		});
	});

	close_form();
}

function set_title() {
	if (site_title.textContent === 'Young African Leaders Initiative') site_title.textContent = 'YALI';
}

function on_resize() {
	var resized;
	window.addEventListener('resize', function () {
		clearTimeout(resized);
		resized = setTimeout(function () {
			if (window.innerWidth < 934) {
				if (localStorage.session == 'returning' || localStorage.scrolled == 'true') {
					nav_join_mobile.style.display = 'inline-block';
				}
			} else {
				if (localStorage.session == 'returning') nav_join_desktop.style.display = 'inline-block';
			}
		});
	});
}

function init() {
	check_session_data();
	display_form();
	on_resize();
}

},{}],8:[function(require,module,exports){
'use strict';

require('../../node_modules/semantic-ui-sass/js/accordion');

require('../../node_modules/semantic-ui-sass/js/api');

require('../../node_modules/semantic-ui-sass/js/checkbox');

require('../../node_modules/semantic-ui-sass/js/colorize');

require('../../node_modules/semantic-ui-sass/js/dropdown');

require('../../node_modules/semantic-ui-sass/js/form');

require('../../node_modules/semantic-ui-sass/js/search');

require('../../node_modules/semantic-ui-sass/js/site');

require('../../node_modules/semantic-ui-sass/js/state');

require('../../node_modules/semantic-ui-sass/js/transition');

require('../../node_modules/semantic-ui-sass/js/visibility');

require('../../node_modules/semantic-ui-sass/js/visit');

var _nav = require('./nav.js');

var nav = _interopRequireWildcard(_nav);

var _footer = require('./footer.js');

var footer = _interopRequireWildcard(_footer);

var _join_form = require('./join_form.js');

var join_form = _interopRequireWildcard(_join_form);

var _search = require('./search.js');

var search = _interopRequireWildcard(_search);

var _cdp = require('./cdp');

var cdp = _interopRequireWildcard(_cdp);

var _responsive_background_image = require('./responsive_background_image.js');

var responsiveImages = _interopRequireWildcard(_responsive_background_image);

var _scrollTo = require('./scrollTo');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _show_more = require('./show_more');

var _show_more2 = _interopRequireDefault(_show_more);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import * as polyfills from './_js_polyfills.js';
// import '../../node_modules/semantic-ui-sass/semantic-ui';
(function ($) {

  //polyfills.init();
  nav.init($);
  footer.init();
  join_form.init();
  search.init();
  cdp.init($);
  responsiveImages.init();

  // Init Accordions
  $('.ui.accordion').accordion({
    onOpen: function onOpen(item) {
      var content_script = this.querySelector('script') || null;
      if (content_script !== null) {
        content_script.removeAttribute('class');
        content_script.removeAttribute('style');
      }
    }
  });

  // MWF Links
  (0, _scrollTo2.default)('.scroll_link');

  // Search Results Page
  (0, _show_more2.default)('.results_list_row.hidden');
})(jQuery);

},{"../../node_modules/semantic-ui-sass/js/accordion":318,"../../node_modules/semantic-ui-sass/js/api":319,"../../node_modules/semantic-ui-sass/js/checkbox":320,"../../node_modules/semantic-ui-sass/js/colorize":321,"../../node_modules/semantic-ui-sass/js/dropdown":322,"../../node_modules/semantic-ui-sass/js/form":323,"../../node_modules/semantic-ui-sass/js/search":324,"../../node_modules/semantic-ui-sass/js/site":325,"../../node_modules/semantic-ui-sass/js/state":326,"../../node_modules/semantic-ui-sass/js/transition":327,"../../node_modules/semantic-ui-sass/js/visibility":328,"../../node_modules/semantic-ui-sass/js/visit":329,"./cdp":4,"./footer.js":5,"./join_form.js":7,"./nav.js":9,"./responsive_background_image.js":11,"./scrollTo":12,"./search.js":13,"./show_more":14}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// DOM Elems
var burger = document.querySelector('.burger'),
    nav_siteurl = document.querySelectorAll('.nav_siteurl'),
    nav_text = document.querySelector('.nav_siteurl span'),
    nav_menu = document.querySelectorAll('.nav_menu'),
    nav_item = document.querySelectorAll('.nav_menu_item:not(.nav_menu_item--search):not(.nav_menu_item--social)');

function highlightNavParent() {
	if (document.querySelector('.current_submenu_page')) {
		var currentSubmenuPage = document.querySelector('.current_submenu_page');
		var parentNavItem = currentSubmenuPage.parentElement.parentElement;
		parentNavItem.querySelector('.nav_menu_item_title-wrapper').classList.add('current_page');
	}
}

function burger_mobile_menu() {
	burger.addEventListener('click', function () {
		this.classList.toggle('active');

		[].concat(_toConsumableArray(nav_siteurl), _toConsumableArray(nav_menu)).forEach(function (item) {
			item.classList.toggle('mobile');
		});
	});
}

function set_title_text() {
	if (window.innerWidth > 767) {
		nav_text.innerHTML = 'Young African Leaders Initiative';
	} else {
		if (localStorage.session !== 'new' || localStorage.scrolled == 'true') nav_text.innerHTML = 'YALI';
	}
}

function up_arrow_display(item) {
	var menuDropdown = item.getElementsByClassName('menuDropdown')[0];
	menuDropdown.classList.remove('downArrow');
	menuDropdown.classList.add('upArrow');
}

function down_arrow_display(item) {
	var menuDropdown = item.getElementsByClassName('menuDropdown')[0];
	menuDropdown.classList.remove('upArrow');
	menuDropdown.classList.add('downArrow');
}

function submenu_display() {
	[].concat(_toConsumableArray(nav_item)).forEach(function (item) {
		item.addEventListener('mouseenter', function () {
			var submenu = this.querySelector('.nav_menu_submenu');
			submenu.style.display = 'block';
			// Toggle arrow display
			up_arrow_display(item);
		});

		item.addEventListener('mouseleave', function () {
			var submenu = this.querySelector('.nav_menu_submenu');
			submenu.style.display = 'none';
			// Toggle arrow display
			down_arrow_display(item);
		});

		if (window.innerWidth < 933) {
			item.addEventListener('click', function () {
				var menuDropdown = this.getElementsByClassName('menuDropdown')[0];
				var currentViewedMenutItem = document.querySelector('.menuDropdown.upArrow') ? document.querySelector('.menuDropdown.upArrow') : null;

				if (currentViewedMenutItem) {
					currentViewedMenutItem.classList.remove('upArrow');
					currentViewedMenutItem.classList.add('downArrow');
				}

				if (menuDropdown.classList.contains('upArrow')) {
					menuDropdown.classList.remove('upArrow');
					menuDropdown.classList.add('downArrow');
				} else {
					menuDropdown.classList.remove('downArrow');
					menuDropdown.classList.add('upArrow');
				}
			});
		}
	});
}

function mobile_submenu_display() {
	[].concat(_toConsumableArray(nav_item)).forEach(function (item) {
		item.addEventListener('touchstart', function (e) {

			// Prevent touch event from bubbling except for links
			if (e.target.tagName.toLowerCase() !== 'a') {
				e.preventDefault();
			}

			// Toggle active class
			if (document.querySelector('.nav_menu_item.active')) {
				document.querySelector('.nav_menu_item.active').classList.remove('active');
			}
			this.classList.add('active');

			// Hide any currently displayed submenus
			if (document.querySelector('.nav_menu_submenu.active')) {
				// Get parent element to toggle arrow
				var currentActiveParentElem = document.querySelector('.nav_menu_submenu.active').parentElement;
				down_arrow_display(currentActiveParentElem);
				document.querySelector('.nav_menu_submenu.active').classList.remove('active');
			}

			// Display submenu for touch event item
			var submenu = this.querySelector('.nav_menu_submenu');
			submenu.classList.add('active');
			up_arrow_display(item);
		});
	});
}

// Hide any displayed submenus on off touch for ipad landscape
function ipadHideMenuOffClick() {
	if (window.innerWidth === 1024) {
		document.addEventListener('touchstart', function (e) {
			if (!e.target.classList.contains('nav_menu_item') && !e.target.classList.contains('menuDropdown') && !e.target.classList.contains('nav_menu_item_title-wrapper')) {

				var menuDisplaying = document.querySelector('.nav_menu_item.active') || null;

				if (menuDisplaying) {
					var submenuDisplaying = menuDisplaying.querySelector('.nav_menu_submenu.active');
					down_arrow_display(menuDisplaying);
					menuDisplaying.classList.remove('active');
					submenuDisplaying.classList.remove('active');
				}
			}
		});
	}
}

function window_resize() {
	var resized;
	window.addEventListener('resize', function () {
		clearTimeout(resized);
		resized = setTimeout(function () {
			if (window.innerWidth > 933) {
				[].concat(_toConsumableArray(nav_siteurl), _toConsumableArray(nav_menu)).forEach(function (item) {
					if (item.classList.contains('mobile')) item.classList.remove('mobile');
				});

				if (burger.classList.contains('active')) burger.classList.remove('active');
			}

			ipadHideMenuOffClick();
			set_title_text();
		}, 250);
	});
}

function init($) {
	// Init Semantic dropdown menu
	$('.ui.dropdown').dropdown({
		on: 'hover',
		duration: 0
	});

	ipadHideMenuOffClick();
	highlightNavParent();
	set_title_text();
	burger_mobile_menu();
	submenu_display();
	mobile_submenu_display();
	window_resize();
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBodyQry = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getTypes = getTypes;
exports.getCategories = getCategories;
exports.getSeries = getSeries;
exports.getLanguages = getLanguages;
exports.builder = builder;

var _bodybuilder = require('bodybuilder');

var _bodybuilder2 = _interopRequireDefault(_bodybuilder);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: using ElasticSearch terms aggregations to find distinct values
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html

var API = cdp.publicAPI ? cdp.publicAPI : 'https://api.america.gov/v1/search';
var INDEXES = cdp.searchIndexes ? fetchArray(cdp.searchIndexes) : 'yali.dev.america.gov';

// Populate dropdown filters
function getTypes(filter, cb) {
  cb(filter, [{ key: 'article', display: 'Article' }, { key: 'courses', display: 'Course' }, { key: 'Podcast', display: 'Podcast' }, { key: 'Video', display: 'Video' }]);
}

function getCategories(filter, cb) {
  _axios2.default.post(API, {
    body: (0, _bodybuilder2.default)().size(0).query('terms', 'site', INDEXES).agg('terms', 'site_taxonomies.categories.name.keyword', {
      'size': 1000,
      'order': { '_term': 'asc' }
    }, 'distinct_categories', function (a) {
      return a.aggregation('terms', 'site_taxonomies.categories.name.keyword', { 'size': 1 }, 'display');
    }).build()
  }).then(function (response) {
    var data = formatResponse(response, 'distinct_categories', ['Uncategorized']);
    // work around has key value is not matching up
    data = data.map(function (item) {
      return {
        key: item.key,
        display: capitalize(item.key.replace('&amp;', '&'))
      };
    });
    cb(filter, data);
  });
}

function getSeries(filter, cb) {
  _axios2.default.post(API, {
    body: (0, _bodybuilder2.default)().size(0).query('terms', 'site', INDEXES).agg('terms', 'site_taxonomies.series.name.keyword', {
      'size': 1000,
      'order': { '_term': 'asc' }
    }, 'distinct_series').build()
  }).then(function (response) {
    var data = formatResponse(response, 'distinct_series');
    cb(filter, data);
  });
}

function getLanguages(filter, cb) {
  _axios2.default.post(API, {
    body: (0, _bodybuilder2.default)().size(0).query('terms', 'site', INDEXES).notFilter('term', 'language.locale', 'es').agg('terms', 'language.locale.keyword', {
      'size': 200,
      'order': { '_term': 'asc' }
    }, 'distinct_languages', function (a) {
      return a.aggregation('terms', 'language.display_name.keyword', { 'size': 1 }, 'display');
    }).build()
  }).then(function (response) {
    var data = formatResponse(response, 'distinct_languages');
    cb(filter, data, { key: 'en-us', value: 'English' });
  });
}

function builder(params, context) {
  var config = {
    meta: params.meta,
    selector: params.selector,
    ui: params.ui,
    query: generateBodyQry({
      sites: INDEXES,
      langs: params.langs,
      categories: fetchQry('category', context, params.categories),
      tags: fetchQry('tag', context, params.tags),
      types: fetchQry('content_type', context, params.types),
      series: fetchQry('series', context, params.series),
      from: params.from ? params.from : 0,
      size: params.size,
      sort: params.sort ? params.sort : 'recent'
    }, context)
  };

  return config;
}

var generateBodyQry = exports.generateBodyQry = function generateBodyQry(params, context) {
  var body = new _bodybuilder2.default();
  // let qry = [], str;

  appendFilter(body, params.sites, 'site');

  // This only applies to courses. When branded field exists, it must be true.
  // YALI wants only courses YALI branded which all that this field represents.
  body.filter('bool', function (b) {
    return b.orFilter('term', 'branded', 'true').orFilter('bool', function (f) {
      return f.notFilter('exists', 'branded');
    }).filterMinimumShouldMatch(1);
  });

  if (params.series) {
    appendFilter(body, params.series, 'site_taxonomies.series.name.keyword');
  }

  if (params.tags) {
    appendFilter(body, params.tags, 'site_taxonomies.tags.name.keyword');
  }

  if (params.langs) {
    // qry.push( ...appendQry( params.langs, 'language.locale' ) );
    appendFilter(body, params.langs, 'language.locale.keyword');
  }

  if (params.categories) {
    // leave for use w/multiple categories, i.e 'environment, climate'
    appendFilter(body, params.categories, [{
      key: 'categories.name.keyword',
      lowercase: true
    }, {
      key: 'site_taxonomies.categories.name.keyword',
      lowercase: false
    }]);
  }

  if (params.types) {
    var types = fetchArray(params.types);
    body.filter('bool', function (b) {
      types.forEach(function (type) {
        switch (type) {
          case 'article':
            b.orFilter('term', 'type.keyword', 'post').orFilter('term', 'type.keyword', 'page');
            break;

          case 'courses':
            b.orFilter('term', 'type.keyword', 'courses');
            break;

          case 'Podcast':
          case 'Video':
            b.orFilter('term', 'site_taxonomies.content_type.name.keyword', type);
            break;

          default:
            b.orFilter('term', 'type.keyword', type);
        }
      });
      return b.filterMinimumShouldMatch(1);
    });
  }

  // let qryStr = reduceQry( qry );
  // if ( qryStr.trim() !== '' ) {
  //   body.query( 'query_string', 'query', qryStr );
  // }

  body.from(params.from);
  body.size(params.size);

  if (params.sort === 'recent') {
    body.sort('published', 'desc');
  } else {
    body.sort('title.keyword', 'asc');
  }
  return body.build();
};

// Helpers
function formatResponse(response, type, itemsToRemove) {
  if (!response.data.aggregations || !response.data.aggregations[type]) {
    return null;
  }

  var buckets = response.data.aggregations[type].buckets;
  if (!buckets) {
    return null;
  }

  // only return buckets with valid key
  buckets = buckets.filter(function (bucket) {
    return bucket.key;
  });

  if (itemsToRemove) {
    if (Array.isArray(itemsToRemove)) {
      buckets = buckets.filter(function (bucket) {
        return !itemsToRemove.includes(bucket.key);
      });
    }
  }

  return buckets.map(function (bucket) {
    return {
      key: bucket.key,
      display: getDisplayName(bucket)
    };
  });
}

function getDisplayName(bucket) {
  var display = bucket.display;
  if (display && display.buckets && display.buckets[0] && display.buckets[0].key) {
    var key = bucket.display.buckets[0].key;
    return key.replace('&amp;', '&');
  } else {
    return capitalize(bucket.key);
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchArray(str) {
  if (typeof str === 'string') return str.split(',').map(function (item) {
    return item.trim();
  });
  return str;
}

var fetchQry = function fetchQry(qry, context, params) {
  return context && context.filter === qry && context.filterValue ? context.filterValue : params;
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
var appendFilter = function appendFilter(body, vals, keys) {
  var terms = fetchArray(vals);
  var fields = fetchArray(keys);
  body.filter('bool', function (b) {
    fields.forEach(function (field) {
      var fieldKey = field;
      var lowercase = false;
      if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
        fieldKey = field.key;
        lowercase = field.lowercase;
      }
      terms.forEach(function (term) {
        b.orFilter('term', fieldKey, lowercase ? term.toLowerCase() : term);
      });
    });
    return b.filterMinimumShouldMatch(1);
  });
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

},{"axios":17,"bodybuilder":44}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponsiveBackgroundImage = function () {
  function ResponsiveBackgroundImage(element) {
    var _this = this;

    _classCallCheck(this, ResponsiveBackgroundImage);

    this.element = element;
    this.img = element.querySelector("img");
    this.src = "";

    this.img.addEventListener("load", function () {
      _this.update();
    });

    if (this.img.complete) {
      this.update();
    }
  }

  _createClass(ResponsiveBackgroundImage, [{
    key: "update",
    value: function update() {
      var src = typeof this.img.currentSrc !== "undefined" ? this.img.currentSrc : this.img.src;
      if (this.src !== src) {
        this.src = src;
        this.element.style.backgroundImage = 'url("' + this.src + '")';
      }
    }
  }]);

  return ResponsiveBackgroundImage;
}();

function init() {
  // Initialize responsive background images
  var elements = document.querySelectorAll('[data-responsive-background-image]');
  for (var i = 0; i < elements.length; i++) {
    new ResponsiveBackgroundImage(elements[i]);
  }
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = scroll_to_elem;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function scroll_to_elem(elem_class) {
	var scroll_links = [].concat(_toConsumableArray(document.querySelectorAll(elem_class)));

	scroll_links.forEach(function (scroll_link) {
		scroll_link.addEventListener('click', function (e) {
			e.preventDefault();

			var nav_height = window.outerWidth > 933 ? 92 : 62,
			    offset = 50 + nav_height,
			    scrollToElemID = this.hash;

			if (scrollToElemID) {
				var scrollToElem = document.querySelector(scrollToElemID);

				if (scrollToElem) {
					window.scrollBy({
						top: scrollToElem.getBoundingClientRect().y - offset,
						left: 0,
						behavior: 'smooth'
					});
				}
			}
		});
	});
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;
var nav_search = document.querySelector('.search-icon_wrapper i'),
    search_input = document.querySelector('.search_wrapper input'),
    search_input_wrapper = document.querySelector('.search_input'),
    search_icon_wrapper = document.querySelector('.search-icon_wrapper'),
    search_submit = document.querySelector('#searchsubmit'),
    search_close = document.querySelector('.search_input_close');

function display_search_input() {
	var nav_menu_width = document.querySelector('.nav_menu').getBoundingClientRect().width;
	search_input.style.width = nav_menu_width - 39 + 'px';

	search_input_wrapper.classList.remove('hide');
	search_icon_wrapper.classList.add('search_displaying');

	search_submit.style.zIndex = '2';
}

function close_search_input() {
	search_close.addEventListener('click', function () {
		search_input_wrapper.classList.add('hide');
		search_icon_wrapper.classList.remove('search_displaying');
		search_input.style.width = 0;
		search_submit.style.zIndex = '-1';
	});
}

function on_resize() {
	var resized;
	window.addEventListener('resize', function () {
		clearTimeout(resized);
		resized = setTimeout(function () {
			if (window.innerWidth > 933) {
				nav_search.addEventListener('click', display_search_input);
			} else {
				nav_search.removeEventListener('click', display_search_input);

				if (nav_search.classList.contains('remove')) {
					search_input_wrapper.classList.remove('hide');
					search_icon_wrapper.classList.remove('search_displaying');
				}
			}
		});
	});
}

function init() {
	if (window.innerWidth > 933) {
		nav_search.addEventListener('click', display_search_input);
	}
	close_search_input();
	on_resize();
}

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = show_more_posts;
function show_more_posts(elem_list_class) {
	// Select all rows containing posts to be displayed
	var hiddenRows = document.querySelectorAll(elem_list_class);
	// If empty, return fn
	if (hiddenRows.length < 1) return;

	// Click Event for Show More Button
	var showMoreBtn = document.querySelector('.cta_link--showmore');
	showMoreBtn.addEventListener('click', function () {
		hiddenRows.forEach(function (currentVal, index) {
			// Show first 4 rows (12 posts) by removing hidden class
			if (index < 4) {
				currentVal.classList.remove('hidden');
			}
		});

		// Update the hiddenRows nodelist
		hiddenRows = document.querySelectorAll(elem_list_class);
		// If nodelist empty, no more rows/posts so hide showMore button
		if (hiddenRows.length < 1) {
			showMoreBtn.style.display = 'none';
		}
	});
}

},{}],15:[function(require,module,exports){
'use strict';

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
		window.addEventListener('hashchange', function () {
			var id = location.hash.substring(1),
			    element;

			if (!/^[A-z0-9_-]+$/.test(id)) {
				return;
			}

			element = document.getElementById(id);

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false);
	}
})();

},{}],16:[function(require,module,exports){
"use strict";

},{}],17:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":19}],18:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('./../helpers/btoa');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

}).call(this,require('_process'))
},{"../core/createError":25,"./../core/settle":28,"./../helpers/btoa":32,"./../helpers/buildURL":33,"./../helpers/cookies":35,"./../helpers/isURLSameOrigin":37,"./../helpers/parseHeaders":39,"./../utils":41,"_process":317}],19:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":20,"./cancel/CancelToken":21,"./cancel/isCancel":22,"./core/Axios":23,"./defaults":30,"./helpers/bind":31,"./helpers/spread":40,"./utils":41}],20:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],21:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":20}],22:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],23:[function(require,module,exports){
'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../defaults":30,"./../helpers/combineURLs":34,"./../helpers/isAbsoluteURL":36,"./../utils":41,"./InterceptorManager":24,"./dispatchRequest":26}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":41}],25:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":27}],26:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":22,"../defaults":30,"./../utils":41,"./transformData":29}],27:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

},{}],28:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":25}],29:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":41}],30:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))
},{"./adapters/http":18,"./adapters/xhr":18,"./helpers/normalizeHeaderName":38,"./utils":41,"_process":317}],31:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],32:[function(require,module,exports){
'use strict';

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

},{}],33:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":41}],34:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],35:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

},{"./../utils":41}],36:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],37:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

},{"./../utils":41}],38:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":41}],39:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

},{"./../utils":41}],40:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],41:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":31,"is-buffer":116}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

exports.default = aggregationBuilder;

var _utils = require('./utils');

var _filterBuilder = require('./filter-builder');

var _filterBuilder2 = _interopRequireDefault(_filterBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function aggregationBuilder() {
  var aggregations = {};

  function makeAggregation(type, field) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var aggName = (0, _find3.default)(args, _isString3.default) || 'agg_' + type + '_' + field;
    var opts = (0, _find3.default)(args, _isPlainObject3.default);
    var nested = (0, _find3.default)(args, _isFunction3.default);
    var nestedClause = {};

    if ((0, _isFunction3.default)(nested)) {
      var nestedResult = nested(Object.assign({}, aggregationBuilder(), (0, _filterBuilder2.default)()));
      if (nestedResult.hasFilter()) {
        nestedClause.filter = nestedResult.getFilter();
      }
      if (nestedResult.hasAggregations()) {
        nestedClause.aggs = nestedResult.getAggregations();
      }
    }

    var innerClause = Object.assign({}, _defineProperty({}, type, (0, _utils.buildClause)(field, null, opts)), nestedClause);

    Object.assign(aggregations, _defineProperty({}, aggName, innerClause));
  }

  return {
    /**
     * Add an aggregation clause to the query body.
     *
     * @param  {string|Object} type      Name of the aggregation type, such as
     *                                   `'sum'` or `'terms'`.
     * @param  {string}        field     Name of the field to aggregate over.
     * @param  {Object}        [options] (optional) Additional options to
     *                                   include in the aggregation.
     * @param  {string}        [name]    (optional) A custom name for the
     *                                   aggregation, defaults to
     *                                   `agg_<type>_<field>`.
     * @param  {Function}      [nest]    (optional) A function used to define
     *                                   sub-aggregations as children. This
     *                                   _must_ be the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .aggregation('max', 'price')
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('percentiles', 'load_time', {
     *     percents: [95, 99, 99.9]
     *   })
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('date_range', 'date', {
     *     format: 'MM-yyy',
     *     ranges: [{ to: 'now-10M/M' }, { from: 'now-10M/M' }]
     *   })
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('diversified_sampler', 'user.id', { shard_size: 200 }, (a) => {
     *     return a.aggregation('significant_terms', 'text', 'keywords')
     *   })
     *   .build()
     */
    aggregation: function aggregation() {
      makeAggregation.apply(undefined, arguments);
      return this;
    },


    /**
     * Alias for `aggregation`.
     *
     * @return {bodybuilder} Builder.
     */
    agg: function agg() {
      return this.aggregation.apply(this, arguments);
    },
    getAggregations: function getAggregations() {
      return aggregations;
    },
    hasAggregations: function hasAggregations() {
      return !!(0, _size3.default)(aggregations);
    }
  };
}
},{"./filter-builder":43,"./utils":46,"lodash/find":278,"lodash/isFunction":292,"lodash/isPlainObject":297,"lodash/isString":298,"lodash/size":308}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterBuilder;

var _utils = require('./utils');

function filterBuilder(options) {
  var filters = {
    and: [],
    or: [],
    not: []
  };

  var makeFilter = _utils.pushQuery.bind(Object.assign({ isInFilterContext: true }, options), filters);

  function addMinimumShouldMatch(str) {
    filters.minimum_should_match = str;
  }

  return {
    /**
     * Add a filter clause to the query body.
     *
     * @param  {string}        type    Filter type.
     * @param  {string|Object} field   Field to filter or complete filter
     *                                 clause.
     * @param  {string|Object} value   Filter term or inner clause.
     * @param  {Object}        options (optional) Additional options for the
     *                                 filter clause.
     * @param  {Function}      [nest]  (optional) A function used to define
     *                                 sub-filters as children. This _must_ be
     *                                 the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .filter('term', 'user', 'kimchy')
     *   .build()
     */
    filter: function filter() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      makeFilter.apply(undefined, ['and'].concat(args));
      return this;
    },


    /**
     * Alias for `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    andFilter: function andFilter() {
      return this.filter.apply(this, arguments);
    },


    /**
     * Alias for `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    addFilter: function addFilter() {
      return this.filter.apply(this, arguments);
    },


    /**
     * Add a "should" filter to the query body.
     *
     * Same arguments as `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    orFilter: function orFilter() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      makeFilter.apply(undefined, ['or'].concat(args));
      return this;
    },


    /**
     * Add a "must_not" filter to the query body.
     *
     * Same arguments as `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    notFilter: function notFilter() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      makeFilter.apply(undefined, ['not'].concat(args));
      return this;
    },


    /**
     * Set the `minimum_should_match` property on a bool filter with more than
     * one `should` clause.
     *
     * @param  {any} param  minimum_should_match parameter. For possible values
     *                      see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     * @return {bodybuilder} Builder.
     */
    filterMinimumShouldMatch: function filterMinimumShouldMatch(param) {
      addMinimumShouldMatch(param);
      return this;
    },
    getFilter: function getFilter() {
      return this.hasFilter() ? (0, _utils.toBool)(filters) : {};
    },
    hasFilter: function hasFilter() {
      return !!(filters.and.length || filters.or.length || filters.not.length);
    }
  };
}
},{"./utils":46}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

exports.default = bodybuilder;

var _queryBuilder = require('./query-builder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _filterBuilder = require('./filter-builder');

var _filterBuilder2 = _interopRequireDefault(_filterBuilder);

var _aggregationBuilder = require('./aggregation-builder');

var _aggregationBuilder2 = _interopRequireDefault(_aggregationBuilder);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **http://bodybuilder.js.org**
 *
 * **https://github.com/danpaz/bodybuilder**
 *
 * Bodybuilder is a small library that makes elasticsearch queries easier to
 * write, read, and maintain 💪. The whole public api is documented here, but
 * how about a simple example to get started:
 *
 * ```
 * bodybuilder()
 *   .query('match', 'message', 'this is a test')
 *   .build()
 *
 * // results in:
 * {
 *   query: {
 *     match: {
 *       message: 'this is a test'
 *     }
 *   }
 * }
 * ```
 *
 * You can chain multiple methods together to build up a more complex query.
 *
 * ```
 * bodybuilder()
 *   .query('match', 'message', 'this is a test')
 *   .filter('term', 'user', 'kimchy')
 *   .notFilter('term', 'user', 'cassie')
 *   .aggregation('terms', 'user')
 *   .build()
 * ```
 *
 * For nested sub-queries or sub-aggregations, pass a function as the last
 * argument and build the nested clause in the body of that function. For
 * example:
 *
 * ```
 * bodybuilder()
 *   .query('nested', 'path', 'obj1', (q) => {
 *     return q.query('match', 'obj1.color', 'blue')
 *   })
 *   .build()
 * ```
 *
 * The entire elasticsearch query DSL is available using the bodybuilder api.
 * There are many more examples in the docs as well as in the tests.
 *
 * @return {bodybuilder} Builder.
 */
function bodybuilder() {
  var body = {};

  return Object.assign({
    /**
     * Set a sort direction on a given field.
     *
     * ```
     * bodybuilder()
     *   .sort('timestamp', 'desc')
     *   .build()
     * ```
     * You can sort multiple fields at once
     *
     * ```
     * bodybuilder()
     *  .sort([
     *    {"categories": "desc"},
     *    {"content": "asc"}
     *  ])
     *   .build()
     * ```
     * Geo Distance sorting is also supported & it's the only sort type that allows for duplicates
     *
     * ```
     * bodyBuilder().sort([
     *     {
     *       _geo_distance: {
     *         'a.pin.location': [-70, 40],
     *         order: 'asc',
     *         unit: 'km',
     *         mode: 'min',
     *         distance_type: 'sloppy_arc'
     *       }
     *     },
     *     {
     *       _geo_distance: {
     *         'b.pin.location': [-140, 80],
     *         order: 'asc',
     *         unit: 'km',
     *         mode: 'min',
     *         distance_type: 'sloppy_arc'
     *       }
     *     }
     *   ])
     *   .sort([
     *     { timestamp: 'desc' },
     *     { content: 'desc' },
     *     { content: 'asc' },
     *    {"price" : {"order" : "asc", "mode" : "avg"}}
     *   ])
     * .build()
     * ```
     *
     * @param  {String} field             Field name.
     * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
     * @returns {bodybuilder} Builder.
     */
    sort: function sort(field) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';

      body.sort = body.sort || [];

      if ((0, _isArray3.default)(field)) {

        if ((0, _isPlainObject3.default)(body.sort)) {
          body.sort = [body.sort];
        }

        if ((0, _isArray3.default)(body.sort)) {
          (0, _each3.default)(field, function (sorts) {
            if ((0, _isString3.default)(sorts)) {
              return (0, _utils.sortMerge)(body.sort, sorts, direction);
            }
            (0, _each3.default)(sorts, function (value, key) {
              (0, _utils.sortMerge)(body.sort, key, value);
            });
          });
        }
      } else {
        (0, _utils.sortMerge)(body.sort, field, direction);
      }
      return this;
    },


    /**
     * Set a *from* offset value, for paginating a query.
     *
     * @param  {Number} quantity The offset from the first result you want to
     *                           fetch.
     * @returns {bodybuilder} Builder.
     */
    from: function from(quantity) {
      body.from = quantity;
      return this;
    },


    /**
     * Set a *size* value for maximum results to return.
     *
     * @param  {Number} quantity Maximum number of results to return.
     * @returns {bodybuilder} Builder.
     */
    size: function size(quantity) {
      body.size = quantity;
      return this;
    },


    /**
     * Set any key-value on the elasticsearch body.
     *
     * @param  {String} k Key.
     * @param  {any}    v Value.
     * @returns {bodybuilder} Builder.
     */
    rawOption: function rawOption(k, v) {
      body[k] = v;
      return this;
    },


    /**
     * Collect all queries, filters, and aggregations and build the entire
     * elasticsearch query.
     *
     * @param  {string} [version] (optional) Pass `'v1'` to build for the
     *                            elasticsearch 1.x query dsl.
     *
     * @return {Object} Elasticsearch query body.
     */
    build: function build(version) {
      var queries = this.getQuery();
      var filters = this.getFilter();
      var aggregations = this.getAggregations();

      if (version === 'v1') {
        return _buildV1(body, queries, filters, aggregations);
      }

      return _build(body, queries, filters, aggregations);
    }
  }, (0, _queryBuilder2.default)(), (0, _filterBuilder2.default)(), (0, _aggregationBuilder2.default)());
}

function _buildV1(body, queries, filters, aggregations) {
  var clonedBody = (0, _cloneDeep3.default)(body);

  if (!(0, _isEmpty3.default)(filters)) {
    (0, _set3.default)(clonedBody, 'query.filtered.filter', filters);

    if (!(0, _isEmpty3.default)(queries)) {
      (0, _set3.default)(clonedBody, 'query.filtered.query', queries);
    }
  } else if (!(0, _isEmpty3.default)(queries)) {
    (0, _set3.default)(clonedBody, 'query', queries);
  }

  if (!(0, _isEmpty3.default)(aggregations)) {
    (0, _set3.default)(clonedBody, 'aggregations', aggregations);
  }
  return clonedBody;
}

function _build(body, queries, filters, aggregations) {
  var clonedBody = (0, _cloneDeep3.default)(body);

  if (!(0, _isEmpty3.default)(filters)) {
    var filterBody = {};
    var queryBody = {};
    (0, _set3.default)(filterBody, 'query.bool.filter', filters);
    if (!(0, _isEmpty3.default)(queries.bool)) {
      (0, _set3.default)(queryBody, 'query.bool', queries.bool);
    } else if (!(0, _isEmpty3.default)(queries)) {
      (0, _set3.default)(queryBody, 'query.bool.must', queries);
    }
    (0, _merge3.default)(clonedBody, filterBody, queryBody);
  } else if (!(0, _isEmpty3.default)(queries)) {
    (0, _set3.default)(clonedBody, 'query', queries);
  }

  if (!(0, _isEmpty3.default)(aggregations)) {
    (0, _set3.default)(clonedBody, 'aggs', aggregations);
  }

  return clonedBody;
}

module.exports = bodybuilder;
},{"./aggregation-builder":42,"./filter-builder":43,"./query-builder":45,"./utils":46,"lodash/cloneDeep":273,"lodash/each":275,"lodash/isArray":287,"lodash/isEmpty":291,"lodash/isPlainObject":297,"lodash/isString":298,"lodash/merge":305,"lodash/set":307}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryBuilder;

var _utils = require('./utils');

function queryBuilder(options) {
  var query = {
    and: [],
    or: [],
    not: []
  };

  var makeQuery = _utils.pushQuery.bind(options || {}, query);

  function addMinimumShouldMatch(str) {
    query.minimum_should_match = str;
  }

  return {
    /**
     * Add a query clause to the query body.
     *
     * @param  {string}        type    Query type.
     * @param  {string|Object} field   Field to query or complete query clause.
     * @param  {string|Object} value   Query term or inner clause.
     * @param  {Object}        options (optional) Additional options for the
     *                                 query clause.
     * @param  {Function}      [nest]  (optional) A function used to define
     *                                 sub-filters as children. This _must_ be
     *                                 the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .query('match_all')
     *   .build()
     *
     * bodybuilder()
     *   .query('match_all', { boost: 1.2 })
     *   .build()
     *
     * bodybuilder()
     *   .query('match', 'message', 'this is a test')
     *   .build()
     *
     * bodybuilder()
     *   .query('terms', 'user', ['kimchy', 'elastic'])
     *   .build()
     *
     * bodybuilder()
     *   .query('nested', { path: 'obj1', score_mode: 'avg' }, (q) => {
     *     return q
     *       .query('match', 'obj1.name', 'blue')
     *       .query('range', 'obj1.count', {gt: 5})
     *   })
     *   .build()
     */
    query: function query() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      makeQuery.apply(undefined, ['and'].concat(args));
      return this;
    },


    /**
     * Alias for `query`.
     *
     * @return {bodybuilder} Builder.
     */
    andQuery: function andQuery() {
      return this.query.apply(this, arguments);
    },


    /**
     * Alias for `query`.
     *
     * @return {bodybuilder} Builder.
     */
    addQuery: function addQuery() {
      return this.query.apply(this, arguments);
    },


    /**
     * Add a "should" query to the query body.
     *
     * Same arguments as `query`.
     *
     * @return {bodybuilder} Builder.
     */
    orQuery: function orQuery() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      makeQuery.apply(undefined, ['or'].concat(args));
      return this;
    },


    /**
     * Add a "must_not" query to the query body.
     *
     * Same arguments as `query`.
     *
     * @return {bodybuilder} Builder.
     */
    notQuery: function notQuery() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      makeQuery.apply(undefined, ['not'].concat(args));
      return this;
    },


    /**
     * Set the `minimum_should_match` property on a bool query with more than
     * one `should` clause.
     *
     * @param  {any} param  minimum_should_match parameter. For possible values
     *                      see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     * @return {bodybuilder} Builder.
     */
    queryMinimumShouldMatch: function queryMinimumShouldMatch(param) {
      addMinimumShouldMatch(param);
      return this;
    },
    getQuery: function getQuery() {
      return this.hasQuery() ? (0, _utils.toBool)(query) : {};
    },
    hasQuery: function hasQuery() {
      return !!(query.and.length || query.or.length || query.not.length);
    }
  };
}
},{"./utils":46}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _last2 = require('lodash/last');

var _last3 = _interopRequireDefault(_last2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _extend2 = require('lodash/extend');

var _extend3 = _interopRequireDefault(_extend2);

var _findIndex2 = require('lodash/findIndex');

var _findIndex3 = _interopRequireDefault(_findIndex2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

exports.sortMerge = sortMerge;
exports.buildClause = buildClause;
exports.toBool = toBool;
exports.pushQuery = pushQuery;

var _queryBuilder = require('./query-builder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _filterBuilder = require('./filter-builder');

var _filterBuilder2 = _interopRequireDefault(_filterBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Compound sort function into the list of sorts
 *
 * @private
 *
 * @param  {Array} current Array of Elasticsearch sorts.
 * @param  {String} field Field to sort.
 * @param  {String|Object} value A valid direction ('asc', 'desc') or object with sort options
 * @returns {Array} Array of Elasticsearch sorts.
 */
function sortMerge(current, field, value) {
  var payload = void 0;

  if ((0, _isPlainObject3.default)(value)) {
    payload = _defineProperty({}, field, (0, _assign3.default)({}, value));
  } else {
    payload = _defineProperty({}, field, { order: value });
  }

  var idx = (0, _findIndex3.default)(current, function (o) {
    return o[field] != undefined;
  });

  if (field === '_geo_distance' || idx === -1) {
    current.push(payload);
  } else {
    (0, _extend3.default)(current[idx], payload);
  }

  return current;
}

/**
 * Generic builder for query, filter, or aggregation clauses.
 *
 * @private
 *
 * @param  {string|Object} field Field name or complete clause.
 * @param  {string|Object} value Field value or inner clause.
 * @param  {Object}        opts  Additional key-value pairs.
 *
 * @return {Object} Clause
 */
function buildClause(field, value, opts) {
  var hasField = !(0, _isNil3.default)(field);
  var hasValue = !(0, _isNil3.default)(value);
  var mainClause = {};

  if (hasValue) {
    mainClause = _defineProperty({}, field, value);
  } else if ((0, _isObject3.default)(field)) {
    mainClause = field;
  } else if (hasField) {
    mainClause = { field: field };
  }

  return Object.assign({}, mainClause, opts);
}

function toBool(filters) {
  var unwrapped = {
    must: unwrap(filters.and),
    should: unwrap(filters.or),
    must_not: unwrap(filters.not),
    minimum_should_match: filters.minimum_should_match
  };

  if (filters.and.length === 1 && !unwrapped.should && !unwrapped.must_not) {
    return unwrapped.must;
  }

  var cleaned = {};

  if (unwrapped.must) {
    cleaned.must = unwrapped.must;
  }
  if (unwrapped.should) {
    cleaned.should = filters.or;
  }
  if (unwrapped.must_not) {
    cleaned.must_not = filters.not;
  }
  if (unwrapped.minimum_should_match && filters.or.length > 1) {
    cleaned.minimum_should_match = unwrapped.minimum_should_match;
  }

  return {
    bool: cleaned
  };
}

function unwrap(arr) {
  return arr.length > 1 ? arr : (0, _last3.default)(arr);
}

function pushQuery(existing, boolKey, type) {
  var nested = {};

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if ((0, _isFunction3.default)((0, _last3.default)(args))) {
    var nestedCallback = args.pop();
    var nestedResult = nestedCallback(Object.assign({}, (0, _filterBuilder2.default)({ isInFilterContext: this.isInFilterContext }), this.isInFilterContext ? {} : (0, _queryBuilder2.default)({ isInFilterContext: this.isInFilterContext })));
    if (!this.isInFilterContext && nestedResult.hasQuery()) {
      nested.query = nestedResult.getQuery();
    }
    if (nestedResult.hasFilter()) {
      nested.filter = nestedResult.getFilter();
    }
  }

  if ((0, _includes3.default)(['bool', 'constant_score'], type) && this.isInFilterContext && (0, _has3.default)(nested, 'filter.bool')) {
    // nesting filters: We've introduced an unnecessary `filter.bool`
    existing[boolKey].push(_defineProperty({}, type, Object.assign(buildClause.apply(undefined, args), nested.filter.bool)));
  } else if (type === 'bool' && (0, _has3.default)(nested, 'query.bool')) {
    existing[boolKey].push(_defineProperty({}, type, Object.assign(buildClause.apply(undefined, args), nested.query.bool)));
  } else {
    // Usual case
    existing[boolKey].push(_defineProperty({}, type, Object.assign(buildClause.apply(undefined, args), nested)));
  }
}
},{"./filter-builder":43,"./query-builder":45,"lodash/assign":271,"lodash/extend":277,"lodash/findIndex":279,"lodash/has":282,"lodash/includes":285,"lodash/isFunction":292,"lodash/isNil":294,"lodash/isObject":295,"lodash/isPlainObject":297,"lodash/last":303}],47:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":55,"../modules/es6.object.to-string":110,"../modules/es6.promise":111,"../modules/es6.string.iterator":112,"../modules/es7.promise.finally":113,"../modules/es7.promise.try":114,"../modules/web.dom.iterable":115}],48:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],49:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":66,"./_wks":107}],50:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],51:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":72}],52:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":100,"./_to-iobject":102,"./_to-length":103}],53:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":54,"./_wks":107}],54:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],55:[function(require,module,exports){
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],56:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":48}],57:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],58:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":62}],59:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":64,"./_is-object":72}],60:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],61:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":55,"./_ctx":56,"./_global":64,"./_hide":66,"./_redefine":92}],62:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],63:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":51,"./_ctx":56,"./_is-array-iter":71,"./_iter-call":73,"./_to-length":103,"./core.get-iterator-method":108}],64:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],65:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],66:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":58,"./_object-dp":83,"./_property-desc":90}],67:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":64}],68:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":58,"./_dom-create":59,"./_fails":62}],69:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],70:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":54}],71:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":78,"./_wks":107}],72:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],73:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":51}],74:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":66,"./_object-create":82,"./_property-desc":90,"./_set-to-string-tag":94,"./_wks":107}],75:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":61,"./_hide":66,"./_iter-create":74,"./_iterators":78,"./_library":79,"./_object-gpo":85,"./_redefine":92,"./_set-to-string-tag":94,"./_wks":107}],76:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":107}],77:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],78:[function(require,module,exports){
module.exports = {};

},{}],79:[function(require,module,exports){
module.exports = false;

},{}],80:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":54,"./_global":64,"./_task":99}],81:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":48}],82:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":51,"./_dom-create":59,"./_enum-bug-keys":60,"./_html":67,"./_object-dps":84,"./_shared-key":95}],83:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":51,"./_descriptors":58,"./_ie8-dom-define":68,"./_to-primitive":105}],84:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":51,"./_descriptors":58,"./_object-dp":83,"./_object-keys":87}],85:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":65,"./_shared-key":95,"./_to-object":104}],86:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":52,"./_has":65,"./_shared-key":95,"./_to-iobject":102}],87:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":60,"./_object-keys-internal":86}],88:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],89:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":51,"./_is-object":72,"./_new-promise-capability":81}],90:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],91:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":92}],92:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":55,"./_global":64,"./_has":65,"./_hide":66,"./_uid":106}],93:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":58,"./_global":64,"./_object-dp":83,"./_wks":107}],94:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":65,"./_object-dp":83,"./_wks":107}],95:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":96,"./_uid":106}],96:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":64}],97:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":48,"./_an-object":51,"./_wks":107}],98:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":57,"./_to-integer":101}],99:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":54,"./_ctx":56,"./_dom-create":59,"./_global":64,"./_html":67,"./_invoke":69}],100:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":101}],101:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],102:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":57,"./_iobject":70}],103:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":101}],104:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":57}],105:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":72}],106:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],107:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":64,"./_shared":96,"./_uid":106}],108:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":53,"./_core":55,"./_iterators":78,"./_wks":107}],109:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":49,"./_iter-define":75,"./_iter-step":77,"./_iterators":78,"./_to-iobject":102}],110:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":53,"./_redefine":92,"./_wks":107}],111:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":48,"./_an-instance":50,"./_classof":53,"./_core":55,"./_ctx":56,"./_export":61,"./_for-of":63,"./_global":64,"./_is-object":72,"./_iter-detect":76,"./_library":79,"./_microtask":80,"./_new-promise-capability":81,"./_perform":88,"./_promise-resolve":89,"./_redefine-all":91,"./_set-species":93,"./_set-to-string-tag":94,"./_species-constructor":97,"./_task":99,"./_wks":107}],112:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":75,"./_string-at":98}],113:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":55,"./_export":61,"./_global":64,"./_promise-resolve":89,"./_species-constructor":97}],114:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":61,"./_new-promise-capability":81,"./_perform":88}],115:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":64,"./_hide":66,"./_iterators":78,"./_object-keys":87,"./_redefine":92,"./_wks":107,"./es6.array.iterator":109}],116:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],117:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":210,"./_root":254}],118:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":219,"./_hashDelete":220,"./_hashGet":221,"./_hashHas":222,"./_hashSet":223}],119:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":234,"./_listCacheDelete":235,"./_listCacheGet":236,"./_listCacheHas":237,"./_listCacheSet":238}],120:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":210,"./_root":254}],121:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":239,"./_mapCacheDelete":240,"./_mapCacheGet":241,"./_mapCacheHas":242,"./_mapCacheSet":243}],122:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":210,"./_root":254}],123:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":210,"./_root":254}],124:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":121,"./_setCacheAdd":255,"./_setCacheHas":256}],125:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":119,"./_stackClear":260,"./_stackDelete":261,"./_stackGet":262,"./_stackHas":263,"./_stackSet":264}],126:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":254}],127:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":254}],128:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":210,"./_root":254}],129:[function(require,module,exports){
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;

},{}],130:[function(require,module,exports){
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;

},{}],131:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],132:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],133:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],134:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":177,"./_isIndex":227,"./isArguments":286,"./isArray":287,"./isBuffer":290,"./isTypedArray":300}],135:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],136:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],137:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],138:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],139:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = baseProperty('length');

module.exports = asciiSize;

},{"./_baseProperty":172}],140:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

},{"./_baseAssignValue":145,"./eq":276}],141:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":145,"./eq":276}],142:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":276}],143:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":193,"./keys":301}],144:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

},{"./_copyObject":193,"./keysIn":302}],145:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":201}],146:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isObject = require('./isObject'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

},{"./_Stack":125,"./_arrayEach":132,"./_assignValue":141,"./_baseAssign":143,"./_baseAssignIn":144,"./_cloneBuffer":185,"./_copyArray":192,"./_copySymbols":194,"./_copySymbolsIn":195,"./_getAllKeys":206,"./_getAllKeysIn":207,"./_getTag":215,"./_initCloneArray":224,"./_initCloneByTag":225,"./_initCloneObject":226,"./isArray":287,"./isBuffer":290,"./isObject":295,"./keys":301}],147:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":295}],148:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":151,"./_createBaseEach":198}],149:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],150:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":199}],151:[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":150,"./keys":301}],152:[function(require,module,exports){
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":183,"./_toKey":268}],153:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":136,"./isArray":287}],154:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":126,"./_getRawTag":212,"./_objectToString":251}],155:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;

},{}],156:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

},{}],157:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":149,"./_baseIsNaN":162,"./_strictIndexOf":265}],158:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":154,"./isObjectLike":296}],159:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":160,"./isObjectLike":296}],160:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":125,"./_equalArrays":202,"./_equalByTag":203,"./_equalObjects":204,"./_getTag":215,"./isArray":287,"./isBuffer":290,"./isTypedArray":300}],161:[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":125,"./_baseIsEqual":159}],162:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],163:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":231,"./_toSource":269,"./isFunction":292,"./isObject":295}],164:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":154,"./isLength":293,"./isObjectLike":296}],165:[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":168,"./_baseMatchesProperty":169,"./identity":284,"./isArray":287,"./property":306}],166:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":232,"./_nativeKeys":248}],167:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":232,"./_nativeKeysIn":249,"./isObject":295}],168:[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":161,"./_getMatchData":209,"./_matchesStrictComparable":245}],169:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn'),
    isKey = require('./_isKey'),
    isStrictComparable = require('./_isStrictComparable'),
    matchesStrictComparable = require('./_matchesStrictComparable'),
    toKey = require('./_toKey');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":159,"./_isKey":229,"./_isStrictComparable":233,"./_matchesStrictComparable":245,"./_toKey":268,"./get":281,"./hasIn":283}],170:[function(require,module,exports){
var Stack = require('./_Stack'),
    assignMergeValue = require('./_assignMergeValue'),
    baseFor = require('./_baseFor'),
    baseMergeDeep = require('./_baseMergeDeep'),
    isObject = require('./isObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

},{"./_Stack":125,"./_assignMergeValue":140,"./_baseFor":150,"./_baseMergeDeep":171,"./isObject":295,"./keysIn":302}],171:[function(require,module,exports){
var assignMergeValue = require('./_assignMergeValue'),
    cloneBuffer = require('./_cloneBuffer'),
    cloneTypedArray = require('./_cloneTypedArray'),
    copyArray = require('./_copyArray'),
    initCloneObject = require('./_initCloneObject'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    isBuffer = require('./isBuffer'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isPlainObject = require('./isPlainObject'),
    isTypedArray = require('./isTypedArray'),
    toPlainObject = require('./toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

},{"./_assignMergeValue":140,"./_cloneBuffer":185,"./_cloneTypedArray":191,"./_copyArray":192,"./_initCloneObject":226,"./isArguments":286,"./isArray":287,"./isArrayLikeObject":289,"./isBuffer":290,"./isFunction":292,"./isObject":295,"./isPlainObject":297,"./isTypedArray":300,"./toPlainObject":314}],172:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],173:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":152}],174:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":253,"./_setToString":258,"./identity":284}],175:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;

},{"./_assignValue":141,"./_castPath":183,"./_isIndex":227,"./_toKey":268,"./isObject":295}],176:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":201,"./constant":274,"./identity":284}],177:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],178:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":126,"./_arrayMap":135,"./isArray":287,"./isSymbol":299}],179:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],180:[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;

},{"./_arrayMap":135}],181:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],182:[function(require,module,exports){
var identity = require('./identity');

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;

},{"./identity":284}],183:[function(require,module,exports){
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./_isKey":229,"./_stringToPath":267,"./isArray":287,"./toString":315}],184:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":127}],185:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":254}],186:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

},{"./_cloneArrayBuffer":184}],187:[function(require,module,exports){
var addMapEntry = require('./_addMapEntry'),
    arrayReduce = require('./_arrayReduce'),
    mapToArray = require('./_mapToArray');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;

},{"./_addMapEntry":129,"./_arrayReduce":137,"./_mapToArray":244}],188:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],189:[function(require,module,exports){
var addSetEntry = require('./_addSetEntry'),
    arrayReduce = require('./_arrayReduce'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;

},{"./_addSetEntry":130,"./_arrayReduce":137,"./_setToArray":257}],190:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":126}],191:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":184}],192:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],193:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":141,"./_baseAssignValue":145}],194:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":193,"./_getSymbols":213}],195:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbolsIn = require('./_getSymbolsIn');

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

},{"./_copyObject":193,"./_getSymbolsIn":214}],196:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":254}],197:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_baseRest":174,"./_isIterateeCall":228}],198:[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":288}],199:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],200:[function(require,module,exports){
var baseIteratee = require('./_baseIteratee'),
    isArrayLike = require('./isArrayLike'),
    keys = require('./keys');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;

},{"./_baseIteratee":165,"./isArrayLike":288,"./keys":301}],201:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":210}],202:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":124,"./_arraySome":138,"./_cacheHas":181}],203:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":126,"./_Uint8Array":127,"./_equalArrays":202,"./_mapToArray":244,"./_setToArray":257,"./eq":276}],204:[function(require,module,exports){
var getAllKeys = require('./_getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./_getAllKeys":206}],205:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],206:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":153,"./_getSymbols":213,"./keys":301}],207:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbolsIn = require('./_getSymbolsIn'),
    keysIn = require('./keysIn');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;

},{"./_baseGetAllKeys":153,"./_getSymbolsIn":214,"./keysIn":302}],208:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":230}],209:[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":233,"./keys":301}],210:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":163,"./_getValue":216}],211:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":252}],212:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":126}],213:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

},{"./_arrayFilter":133,"./stubArray":309}],214:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    getPrototype = require('./_getPrototype'),
    getSymbols = require('./_getSymbols'),
    stubArray = require('./stubArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

},{"./_arrayPush":136,"./_getPrototype":211,"./_getSymbols":213,"./stubArray":309}],215:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":117,"./_Map":120,"./_Promise":122,"./_Set":123,"./_WeakMap":128,"./_baseGetTag":154,"./_toSource":269}],216:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],217:[function(require,module,exports){
var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;

},{"./_castPath":183,"./_isIndex":227,"./_toKey":268,"./isArguments":286,"./isArray":287,"./isLength":293}],218:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

},{}],219:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":247}],220:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],221:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":247}],222:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":247}],223:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":247}],224:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],225:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneMap = require('./_cloneMap'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSet = require('./_cloneSet'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneArrayBuffer":184,"./_cloneDataView":186,"./_cloneMap":187,"./_cloneRegExp":188,"./_cloneSet":189,"./_cloneSymbol":190,"./_cloneTypedArray":191}],226:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":147,"./_getPrototype":211,"./_isPrototype":232}],227:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],228:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":227,"./eq":276,"./isArrayLike":288,"./isObject":295}],229:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":287,"./isSymbol":299}],230:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],231:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":196}],232:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],233:[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":295}],234:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],235:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":142}],236:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":142}],237:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":142}],238:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":142}],239:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":118,"./_ListCache":119,"./_Map":120}],240:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":208}],241:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":208}],242:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":208}],243:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":208}],244:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],245:[function(require,module,exports){
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;

},{}],246:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":304}],247:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":210}],248:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":252}],249:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],250:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":205}],251:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],252:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],253:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":131}],254:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":205}],255:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],256:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],257:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],258:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":176,"./_shortOut":259}],259:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],260:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":119}],261:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],262:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],263:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],264:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":119,"./_Map":120,"./_MapCache":121}],265:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],266:[function(require,module,exports){
var asciiSize = require('./_asciiSize'),
    hasUnicode = require('./_hasUnicode'),
    unicodeSize = require('./_unicodeSize');

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

module.exports = stringSize;

},{"./_asciiSize":139,"./_hasUnicode":218,"./_unicodeSize":270}],267:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":246}],268:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":299}],269:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],270:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

module.exports = unicodeSize;

},{}],271:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    isArrayLike = require('./isArrayLike'),
    isPrototype = require('./_isPrototype'),
    keys = require('./keys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

},{"./_assignValue":141,"./_copyObject":193,"./_createAssigner":197,"./_isPrototype":232,"./isArrayLike":288,"./keys":301}],272:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    keysIn = require('./keysIn');

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;

},{"./_copyObject":193,"./_createAssigner":197,"./keysIn":302}],273:[function(require,module,exports){
var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

},{"./_baseClone":146}],274:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],275:[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":280}],276:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],277:[function(require,module,exports){
module.exports = require('./assignIn');

},{"./assignIn":272}],278:[function(require,module,exports){
var createFind = require('./_createFind'),
    findIndex = require('./findIndex');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;

},{"./_createFind":200,"./findIndex":279}],279:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIteratee = require('./_baseIteratee'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;

},{"./_baseFindIndex":149,"./_baseIteratee":165,"./toInteger":312}],280:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseEach = require('./_baseEach'),
    castFunction = require('./_castFunction'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":132,"./_baseEach":148,"./_castFunction":182,"./isArray":287}],281:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":152}],282:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;

},{"./_baseHas":155,"./_hasPath":217}],283:[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":156,"./_hasPath":217}],284:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],285:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    toInteger = require('./toInteger'),
    values = require('./values');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;

},{"./_baseIndexOf":157,"./isArrayLike":288,"./isString":298,"./toInteger":312,"./values":316}],286:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":158,"./isObjectLike":296}],287:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],288:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":292,"./isLength":293}],289:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":288,"./isObjectLike":296}],290:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":254,"./stubFalse":310}],291:[function(require,module,exports){
var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isBuffer = require('./isBuffer'),
    isPrototype = require('./_isPrototype'),
    isTypedArray = require('./isTypedArray');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

},{"./_baseKeys":166,"./_getTag":215,"./_isPrototype":232,"./isArguments":286,"./isArray":287,"./isArrayLike":288,"./isBuffer":290,"./isTypedArray":300}],292:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":154,"./isObject":295}],293:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],294:[function(require,module,exports){
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

module.exports = isNil;

},{}],295:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],296:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],297:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":154,"./_getPrototype":211,"./isObjectLike":296}],298:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;

},{"./_baseGetTag":154,"./isArray":287,"./isObjectLike":296}],299:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":154,"./isObjectLike":296}],300:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":164,"./_baseUnary":179,"./_nodeUtil":250}],301:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":134,"./_baseKeys":166,"./isArrayLike":288}],302:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":134,"./_baseKeysIn":167,"./isArrayLike":288}],303:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],304:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":121}],305:[function(require,module,exports){
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;

},{"./_baseMerge":170,"./_createAssigner":197}],306:[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":172,"./_basePropertyDeep":173,"./_isKey":229,"./_toKey":268}],307:[function(require,module,exports){
var baseSet = require('./_baseSet');

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;

},{"./_baseSet":175}],308:[function(require,module,exports){
var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    stringSize = require('./_stringSize');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }
  var tag = getTag(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return baseKeys(collection).length;
}

module.exports = size;

},{"./_baseKeys":166,"./_getTag":215,"./_stringSize":266,"./isArrayLike":288,"./isString":298}],309:[function(require,module,exports){
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

},{}],310:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],311:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

},{"./toNumber":313}],312:[function(require,module,exports){
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

},{"./toFinite":311}],313:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":295,"./isSymbol":299}],314:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

},{"./_copyObject":193,"./keysIn":302}],315:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":178}],316:[function(require,module,exports){
var baseValues = require('./_baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;

},{"./_baseValues":180,"./keys":301}],317:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],318:[function(require,module,exports){
/*!
 * # Semantic UI - Accordion
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.accordion = function(parameters) {
  var
    $allModules     = $(this),

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },

    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.accordion.settings, parameters)
          : $.extend({}, $.fn.accordion.settings),

        className       = settings.className,
        namespace       = settings.namespace,
        selector        = settings.selector,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,
        moduleSelector  = $allModules.selector || '',

        $module  = $(this),
        $title   = $module.find(selector.title),
        $content = $module.find(selector.content),

        element  = this,
        instance = $module.data(moduleNamespace),
        observer,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing', $module);
          module.bind.events();
          if(settings.observeChanges) {
            module.observeChanges();
          }
          module.instantiate();
        },

        instantiate: function() {
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.debug('Destroying previous instance', $module);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
        },

        refresh: function() {
          $title   = $module.find(selector.title);
          $content = $module.find(selector.content);
        },

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList : true,
              subtree   : true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },

        bind: {
          events: function() {
            module.debug('Binding delegated events');
            $module
              .on(settings.on + eventNamespace, selector.trigger, module.event.click)
            ;
          }
        },

        event: {
          click: function() {
            module.toggle.call(this);
          }
        },

        toggle: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating = $activeContent.hasClass(className.animating),
            isActive    = $activeContent.hasClass(className.active),
            isOpen      = (isActive && !isAnimating),
            isOpening   = (!isActive && isAnimating)
          ;
          module.debug('Toggling visibility of content', $activeTitle);
          if(isOpen || isOpening) {
            if(settings.collapsible) {
              module.close.call($activeTitle);
            }
            else {
              module.debug('Cannot close accordion content collapsing is disabled');
            }
          }
          else {
            module.open.call($activeTitle);
          }
        },

        open: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating = $activeContent.hasClass(className.animating),
            isActive    = $activeContent.hasClass(className.active),
            isOpen      = (isActive || isAnimating)
          ;
          if(isOpen) {
            module.debug('Accordion already open, skipping', $activeContent);
            return;
          }
          module.debug('Opening accordion content', $activeTitle);
          settings.onOpening.call($activeContent);
          if(settings.exclusive) {
            module.closeOthers.call($activeTitle);
          }
          $activeTitle
            .addClass(className.active)
          ;
          $activeContent
            .stop(true, true)
            .addClass(className.animating)
          ;
          if(settings.animateChildren) {
            if($.fn.transition !== undefined && $module.transition('is supported')) {
              $activeContent
                .children()
                  .transition({
                    animation   : 'fade in',
                    queue       : false,
                    useFailSafe : true,
                    debug       : settings.debug,
                    verbose     : settings.verbose,
                    duration    : settings.duration
                  })
              ;
            }
            else {
              $activeContent
                .children()
                  .stop(true, true)
                  .animate({
                    opacity: 1
                  }, settings.duration, module.resetOpacity)
              ;
            }
          }
          $activeContent
            .slideDown(settings.duration, settings.easing, function() {
              $activeContent
                .removeClass(className.animating)
                .addClass(className.active)
              ;
              module.reset.display.call(this);
              settings.onOpen.call(this);
              settings.onChange.call(this);
            })
          ;
        },

        close: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating    = $activeContent.hasClass(className.animating),
            isActive       = $activeContent.hasClass(className.active),
            isOpening      = (!isActive && isAnimating),
            isClosing      = (isActive && isAnimating)
          ;
          if((isActive || isOpening) && !isClosing) {
            module.debug('Closing accordion content', $activeContent);
            settings.onClosing.call($activeContent);
            $activeTitle
              .removeClass(className.active)
            ;
            $activeContent
              .stop(true, true)
              .addClass(className.animating)
            ;
            if(settings.animateChildren) {
              if($.fn.transition !== undefined && $module.transition('is supported')) {
                $activeContent
                  .children()
                    .transition({
                      animation   : 'fade out',
                      queue       : false,
                      useFailSafe : true,
                      debug       : settings.debug,
                      verbose     : settings.verbose,
                      duration    : settings.duration
                    })
                ;
              }
              else {
                $activeContent
                  .children()
                    .stop(true, true)
                    .animate({
                      opacity: 0
                    }, settings.duration, module.resetOpacity)
                ;
              }
            }
            $activeContent
              .slideUp(settings.duration, settings.easing, function() {
                $activeContent
                  .removeClass(className.animating)
                  .removeClass(className.active)
                ;
                module.reset.display.call(this);
                settings.onClose.call(this);
                settings.onChange.call(this);
              })
            ;
          }
        },

        closeOthers: function(index) {
          var
            $activeTitle = (index !== undefined)
              ? $title.eq(index)
              : $(this).closest(selector.title),
            $parentTitles    = $activeTitle.parents(selector.content).prev(selector.title),
            $activeAccordion = $activeTitle.closest(selector.accordion),
            activeSelector   = selector.title + '.' + className.active + ':visible',
            activeContent    = selector.content + '.' + className.active + ':visible',
            $openTitles,
            $nestedTitles,
            $openContents
          ;
          if(settings.closeNested) {
            $openTitles   = $activeAccordion.find(activeSelector).not($parentTitles);
            $openContents = $openTitles.next($content);
          }
          else {
            $openTitles   = $activeAccordion.find(activeSelector).not($parentTitles);
            $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
            $openTitles   = $openTitles.not($nestedTitles);
            $openContents = $openTitles.next($content);
          }
          if( ($openTitles.length > 0) ) {
            module.debug('Exclusive enabled, closing other content', $openTitles);
            $openTitles
              .removeClass(className.active)
            ;
            $openContents
              .removeClass(className.animating)
              .stop(true, true)
            ;
            if(settings.animateChildren) {
              if($.fn.transition !== undefined && $module.transition('is supported')) {
                $openContents
                  .children()
                    .transition({
                      animation   : 'fade out',
                      useFailSafe : true,
                      debug       : settings.debug,
                      verbose     : settings.verbose,
                      duration    : settings.duration
                    })
                ;
              }
              else {
                $openContents
                  .children()
                    .stop(true, true)
                    .animate({
                      opacity: 0
                    }, settings.duration, module.resetOpacity)
                ;
              }
            }
            $openContents
              .slideUp(settings.duration , settings.easing, function() {
                $(this).removeClass(className.active);
                module.reset.display.call(this);
              })
            ;
          }
        },

        reset: {

          display: function() {
            module.verbose('Removing inline display from element', this);
            $(this).css('display', '');
            if( $(this).attr('style') === '') {
              $(this)
                .attr('style', '')
                .removeAttr('style')
              ;
            }
          },

          opacity: function() {
            module.verbose('Removing inline opacity from element', this);
            $(this).css('opacity', '');
            if( $(this).attr('style') === '') {
              $(this)
                .attr('style', '')
                .removeAttr('style')
              ;
            }
          },

        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          module.debug('Changing internal', name, value);
          if(value !== undefined) {
            if( $.isPlainObject(name) ) {
              $.extend(true, module, name);
            }
            else {
              module[name] = value;
            }
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };
      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.accordion.settings = {

  name            : 'Accordion',
  namespace       : 'accordion',

  silent          : false,
  debug           : false,
  verbose         : false,
  performance     : true,

  on              : 'click', // event on title that opens accordion

  observeChanges  : true,  // whether accordion should automatically refresh on DOM insertion

  exclusive       : true,  // whether a single accordion content panel should be open at once
  collapsible     : true,  // whether accordion content can be closed
  closeNested     : false, // whether nested content should be closed when a panel is closed
  animateChildren : true,  // whether children opacity should be animated

  duration        : 350, // duration of animation
  easing          : 'easeOutQuad', // easing equation for animation


  onOpening       : function(){}, // callback before open animation
  onOpen          : function(){}, // callback after open animation
  onClosing       : function(){}, // callback before closing animation
  onClose         : function(){}, // callback after closing animation
  onChange        : function(){}, // callback after closing or opening animation

  error: {
    method : 'The method you called is not defined'
  },

  className   : {
    active    : 'active',
    animating : 'animating'
  },

  selector    : {
    accordion : '.accordion',
    title     : '.title',
    trigger   : '.title',
    content   : '.content'
  }

};

// Adds easing
$.extend( $.easing, {
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  }
});

})( jQuery, window, document );


},{}],319:[function(require,module,exports){
/*!
 * # Semantic UI - API
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

var
  window = (typeof window != 'undefined' && window.Math == Math)
    ? window
    : (typeof self != 'undefined' && self.Math == Math)
      ? self
      : Function('return this')()
;

$.api = $.fn.api = function(parameters) {

  var
    // use window context if none specified
    $allModules     = $.isFunction(this)
        ? $(window)
        : $(this),
    moduleSelector = $allModules.selector || '',
    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

    returnedValue
  ;

  $allModules
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.api.settings, parameters)
          : $.extend({}, $.fn.api.settings),

        // internal aliases
        namespace       = settings.namespace,
        metadata        = settings.metadata,
        selector        = settings.selector,
        error           = settings.error,
        className       = settings.className,

        // define namespaces for modules
        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        // element that creates request
        $module         = $(this),
        $form           = $module.closest(selector.form),

        // context used for state
        $context        = (settings.stateContext)
          ? $(settings.stateContext)
          : $module,

        // request details
        ajaxSettings,
        requestSettings,
        url,
        data,
        requestStartTime,

        // standard module
        element         = this,
        context         = $context[0],
        instance        = $module.data(moduleNamespace),
        module
      ;

      module = {

        initialize: function() {
          if(!methodInvoked) {
            module.bind.events();
          }
          module.instantiate();
        },

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
        },

        destroy: function() {
          module.verbose('Destroying previous module for', element);
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
        },

        bind: {
          events: function() {
            var
              triggerEvent = module.get.event()
            ;
            if( triggerEvent ) {
              module.verbose('Attaching API events to element', triggerEvent);
              $module
                .on(triggerEvent + eventNamespace, module.event.trigger)
              ;
            }
            else if(settings.on == 'now') {
              module.debug('Querying API endpoint immediately');
              module.query();
            }
          }
        },

        decode: {
          json: function(response) {
            if(response !== undefined && typeof response == 'string') {
              try {
               response = JSON.parse(response);
              }
              catch(e) {
                // isnt json string
              }
            }
            return response;
          }
        },

        read: {
          cachedResponse: function(url) {
            var
              response
            ;
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            response = sessionStorage.getItem(url);
            module.debug('Using cached response', url, response);
            response = module.decode.json(response);
            return response;
          }
        },
        write: {
          cachedResponse: function(url, response) {
            if(response && response === '') {
              module.debug('Response empty, not caching', response);
              return;
            }
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            if( $.isPlainObject(response) ) {
              response = JSON.stringify(response);
            }
            sessionStorage.setItem(url, response);
            module.verbose('Storing cached response for url', url, response);
          }
        },

        query: function() {

          if(module.is.disabled()) {
            module.debug('Element is disabled API request aborted');
            return;
          }

          if(module.is.loading()) {
            if(settings.interruptRequests) {
              module.debug('Interrupting previous request');
              module.abort();
            }
            else {
              module.debug('Cancelling request, previous request is still pending');
              return;
            }
          }

          // pass element metadata to url (value, text)
          if(settings.defaultData) {
            $.extend(true, settings.urlData, module.get.defaultData());
          }

          // Add form content
          if(settings.serializeForm) {
            settings.data = module.add.formData(settings.data);
          }

          // call beforesend and get any settings changes
          requestSettings = module.get.settings();

          // check if before send cancelled request
          if(requestSettings === false) {
            module.cancelled = true;
            module.error(error.beforeSend);
            return;
          }
          else {
            module.cancelled = false;
          }

          // get url
          url = module.get.templatedURL();

          if(!url && !module.is.mocked()) {
            module.error(error.missingURL);
            return;
          }

          // replace variables
          url = module.add.urlData( url );
          // missing url parameters
          if( !url && !module.is.mocked()) {
            return;
          }

          requestSettings.url = settings.base + url;

          // look for jQuery ajax parameters in settings
          ajaxSettings = $.extend(true, {}, settings, {
            type       : settings.method || settings.type,
            data       : data,
            url        : settings.base + url,
            beforeSend : settings.beforeXHR,
            success    : function() {},
            failure    : function() {},
            complete   : function() {}
          });

          module.debug('Querying URL', ajaxSettings.url);
          module.verbose('Using AJAX settings', ajaxSettings);
          if(settings.cache === 'local' && module.read.cachedResponse(url)) {
            module.debug('Response returned from local cache');
            module.request = module.create.request();
            module.request.resolveWith(context, [ module.read.cachedResponse(url) ]);
            return;
          }

          if( !settings.throttle ) {
            module.debug('Sending request', data, ajaxSettings.method);
            module.send.request();
          }
          else {
            if(!settings.throttleFirstRequest && !module.timer) {
              module.debug('Sending request', data, ajaxSettings.method);
              module.send.request();
              module.timer = setTimeout(function(){}, settings.throttle);
            }
            else {
              module.debug('Throttling request', settings.throttle);
              clearTimeout(module.timer);
              module.timer = setTimeout(function() {
                if(module.timer) {
                  delete module.timer;
                }
                module.debug('Sending throttled request', data, ajaxSettings.method);
                module.send.request();
              }, settings.throttle);
            }
          }

        },

        should: {
          removeError: function() {
            return ( settings.hideError === true || (settings.hideError === 'auto' && !module.is.form()) );
          }
        },

        is: {
          disabled: function() {
            return ($module.filter(selector.disabled).length > 0);
          },
          expectingJSON: function() {
            return settings.dataType === 'json' || settings.dataType === 'jsonp';
          },
          form: function() {
            return $module.is('form') || $context.is('form');
          },
          mocked: function() {
            return (settings.mockResponse || settings.mockResponseAsync || settings.response || settings.responseAsync);
          },
          input: function() {
            return $module.is('input');
          },
          loading: function() {
            return (module.request)
              ? (module.request.state() == 'pending')
              : false
            ;
          },
          abortedRequest: function(xhr) {
            if(xhr && xhr.readyState !== undefined && xhr.readyState === 0) {
              module.verbose('XHR request determined to be aborted');
              return true;
            }
            else {
              module.verbose('XHR request was not aborted');
              return false;
            }
          },
          validResponse: function(response) {
            if( (!module.is.expectingJSON()) || !$.isFunction(settings.successTest) ) {
              module.verbose('Response is not JSON, skipping validation', settings.successTest, response);
              return true;
            }
            module.debug('Checking JSON returned success', settings.successTest, response);
            if( settings.successTest(response) ) {
              module.debug('Response passed success test', response);
              return true;
            }
            else {
              module.debug('Response failed success test', response);
              return false;
            }
          }
        },

        was: {
          cancelled: function() {
            return (module.cancelled || false);
          },
          succesful: function() {
            return (module.request && module.request.state() == 'resolved');
          },
          failure: function() {
            return (module.request && module.request.state() == 'rejected');
          },
          complete: function() {
            return (module.request && (module.request.state() == 'resolved' || module.request.state() == 'rejected') );
          }
        },

        add: {
          urlData: function(url, urlData) {
            var
              requiredVariables,
              optionalVariables
            ;
            if(url) {
              requiredVariables = url.match(settings.regExp.required);
              optionalVariables = url.match(settings.regExp.optional);
              urlData           = urlData || settings.urlData;
              if(requiredVariables) {
                module.debug('Looking for required URL variables', requiredVariables);
                $.each(requiredVariables, function(index, templatedString) {
                  var
                    // allow legacy {$var} style
                    variable = (templatedString.indexOf('$') !== -1)
                      ? templatedString.substr(2, templatedString.length - 3)
                      : templatedString.substr(1, templatedString.length - 2),
                    value   = ($.isPlainObject(urlData) && urlData[variable] !== undefined)
                      ? urlData[variable]
                      : ($module.data(variable) !== undefined)
                        ? $module.data(variable)
                        : ($context.data(variable) !== undefined)
                          ? $context.data(variable)
                          : urlData[variable]
                  ;
                  // remove value
                  if(value === undefined) {
                    module.error(error.requiredParameter, variable, url);
                    url = false;
                    return false;
                  }
                  else {
                    module.verbose('Found required variable', variable, value);
                    value = (settings.encodeParameters)
                      ? module.get.urlEncodedValue(value)
                      : value
                    ;
                    url = url.replace(templatedString, value);
                  }
                });
              }
              if(optionalVariables) {
                module.debug('Looking for optional URL variables', requiredVariables);
                $.each(optionalVariables, function(index, templatedString) {
                  var
                    // allow legacy {/$var} style
                    variable = (templatedString.indexOf('$') !== -1)
                      ? templatedString.substr(3, templatedString.length - 4)
                      : templatedString.substr(2, templatedString.length - 3),
                    value   = ($.isPlainObject(urlData) && urlData[variable] !== undefined)
                      ? urlData[variable]
                      : ($module.data(variable) !== undefined)
                        ? $module.data(variable)
                        : ($context.data(variable) !== undefined)
                          ? $context.data(variable)
                          : urlData[variable]
                  ;
                  // optional replacement
                  if(value !== undefined) {
                    module.verbose('Optional variable Found', variable, value);
                    url = url.replace(templatedString, value);
                  }
                  else {
                    module.verbose('Optional variable not found', variable);
                    // remove preceding slash if set
                    if(url.indexOf('/' + templatedString) !== -1) {
                      url = url.replace('/' + templatedString, '');
                    }
                    else {
                      url = url.replace(templatedString, '');
                    }
                  }
                });
              }
            }
            return url;
          },
          formData: function(data) {
            var
              canSerialize = ($.fn.serializeObject !== undefined),
              formData     = (canSerialize)
                ? $form.serializeObject()
                : $form.serialize(),
              hasOtherData
            ;
            data         = data || settings.data;
            hasOtherData = $.isPlainObject(data);

            if(hasOtherData) {
              if(canSerialize) {
                module.debug('Extending existing data with form data', data, formData);
                data = $.extend(true, {}, data, formData);
              }
              else {
                module.error(error.missingSerialize);
                module.debug('Cant extend data. Replacing data with form data', data, formData);
                data = formData;
              }
            }
            else {
              module.debug('Adding form data', formData);
              data = formData;
            }
            return data;
          }
        },

        send: {
          request: function() {
            module.set.loading();
            module.request = module.create.request();
            if( module.is.mocked() ) {
              module.mockedXHR = module.create.mockedXHR();
            }
            else {
              module.xhr = module.create.xhr();
            }
            settings.onRequest.call(context, module.request, module.xhr);
          }
        },

        event: {
          trigger: function(event) {
            module.query();
            if(event.type == 'submit' || event.type == 'click') {
              event.preventDefault();
            }
          },
          xhr: {
            always: function() {
              // nothing special
            },
            done: function(response, textStatus, xhr) {
              var
                context            = this,
                elapsedTime        = (new Date().getTime() - requestStartTime),
                timeLeft           = (settings.loadingDuration - elapsedTime),
                translatedResponse = ( $.isFunction(settings.onResponse) )
                  ? module.is.expectingJSON()
                    ? settings.onResponse.call(context, $.extend(true, {}, response))
                    : settings.onResponse.call(context, response)
                  : false
              ;
              timeLeft = (timeLeft > 0)
                ? timeLeft
                : 0
              ;
              if(translatedResponse) {
                module.debug('Modified API response in onResponse callback', settings.onResponse, translatedResponse, response);
                response = translatedResponse;
              }
              if(timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
              }
              setTimeout(function() {
                if( module.is.validResponse(response) ) {
                  module.request.resolveWith(context, [response, xhr]);
                }
                else {
                  module.request.rejectWith(context, [xhr, 'invalid']);
                }
              }, timeLeft);
            },
            fail: function(xhr, status, httpMessage) {
              var
                context     = this,
                elapsedTime = (new Date().getTime() - requestStartTime),
                timeLeft    = (settings.loadingDuration - elapsedTime)
              ;
              timeLeft = (timeLeft > 0)
                ? timeLeft
                : 0
              ;
              if(timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
              }
              setTimeout(function() {
                if( module.is.abortedRequest(xhr) ) {
                  module.request.rejectWith(context, [xhr, 'aborted', httpMessage]);
                }
                else {
                  module.request.rejectWith(context, [xhr, 'error', status, httpMessage]);
                }
              }, timeLeft);
            }
          },
          request: {
            done: function(response, xhr) {
              module.debug('Successful API Response', response);
              if(settings.cache === 'local' && url) {
                module.write.cachedResponse(url, response);
                module.debug('Saving server response locally', module.cache);
              }
              settings.onSuccess.call(context, response, $module, xhr);
            },
            complete: function(firstParameter, secondParameter) {
              var
                xhr,
                response
              ;
              // have to guess callback parameters based on request success
              if( module.was.succesful() ) {
                response = firstParameter;
                xhr      = secondParameter;
              }
              else {
                xhr      = firstParameter;
                response = module.get.responseFromXHR(xhr);
              }
              module.remove.loading();
              settings.onComplete.call(context, response, $module, xhr);
            },
            fail: function(xhr, status, httpMessage) {
              var
                // pull response from xhr if available
                response     = module.get.responseFromXHR(xhr),
                errorMessage = module.get.errorFromRequest(response, status, httpMessage)
              ;
              if(status == 'aborted') {
                module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)', status, httpMessage);
                settings.onAbort.call(context, status, $module, xhr);
                return true;
              }
              else if(status == 'invalid') {
                module.debug('JSON did not pass success test. A server-side error has most likely occurred', response);
              }
              else if(status == 'error') {
                if(xhr !== undefined) {
                  module.debug('XHR produced a server error', status, httpMessage);
                  // make sure we have an error to display to console
                  if( xhr.status != 200 && httpMessage !== undefined && httpMessage !== '') {
                    module.error(error.statusMessage + httpMessage, ajaxSettings.url);
                  }
                  settings.onError.call(context, errorMessage, $module, xhr);
                }
              }

              if(settings.errorDuration && status !== 'aborted') {
                module.debug('Adding error state');
                module.set.error();
                if( module.should.removeError() ) {
                  setTimeout(module.remove.error, settings.errorDuration);
                }
              }
              module.debug('API Request failed', errorMessage, xhr);
              settings.onFailure.call(context, response, $module, xhr);
            }
          }
        },

        create: {

          request: function() {
            // api request promise
            return $.Deferred()
              .always(module.event.request.complete)
              .done(module.event.request.done)
              .fail(module.event.request.fail)
            ;
          },

          mockedXHR: function () {
            var
              // xhr does not simulate these properties of xhr but must return them
              textStatus     = false,
              status         = false,
              httpMessage    = false,
              responder      = settings.mockResponse      || settings.response,
              asyncResponder = settings.mockResponseAsync || settings.responseAsync,
              asyncCallback,
              response,
              mockedXHR
            ;

            mockedXHR = $.Deferred()
              .always(module.event.xhr.complete)
              .done(module.event.xhr.done)
              .fail(module.event.xhr.fail)
            ;

            if(responder) {
              if( $.isFunction(responder) ) {
                module.debug('Using specified synchronous callback', responder);
                response = responder.call(context, requestSettings);
              }
              else {
                module.debug('Using settings specified response', responder);
                response = responder;
              }
              // simulating response
              mockedXHR.resolveWith(context, [ response, textStatus, { responseText: response }]);
            }
            else if( $.isFunction(asyncResponder) ) {
              asyncCallback = function(response) {
                module.debug('Async callback returned response', response);

                if(response) {
                  mockedXHR.resolveWith(context, [ response, textStatus, { responseText: response }]);
                }
                else {
                  mockedXHR.rejectWith(context, [{ responseText: response }, status, httpMessage]);
                }
              };
              module.debug('Using specified async response callback', asyncResponder);
              asyncResponder.call(context, requestSettings, asyncCallback);
            }
            return mockedXHR;
          },

          xhr: function() {
            var
              xhr
            ;
            // ajax request promise
            xhr = $.ajax(ajaxSettings)
              .always(module.event.xhr.always)
              .done(module.event.xhr.done)
              .fail(module.event.xhr.fail)
            ;
            module.verbose('Created server request', xhr, ajaxSettings);
            return xhr;
          }
        },

        set: {
          error: function() {
            module.verbose('Adding error state to element', $context);
            $context.addClass(className.error);
          },
          loading: function() {
            module.verbose('Adding loading state to element', $context);
            $context.addClass(className.loading);
            requestStartTime = new Date().getTime();
          }
        },

        remove: {
          error: function() {
            module.verbose('Removing error state from element', $context);
            $context.removeClass(className.error);
          },
          loading: function() {
            module.verbose('Removing loading state from element', $context);
            $context.removeClass(className.loading);
          }
        },

        get: {
          responseFromXHR: function(xhr) {
            return $.isPlainObject(xhr)
              ? (module.is.expectingJSON())
                ? module.decode.json(xhr.responseText)
                : xhr.responseText
              : false
            ;
          },
          errorFromRequest: function(response, status, httpMessage) {
            return ($.isPlainObject(response) && response.error !== undefined)
              ? response.error // use json error message
              : (settings.error[status] !== undefined) // use server error message
                ? settings.error[status]
                : httpMessage
            ;
          },
          request: function() {
            return module.request || false;
          },
          xhr: function() {
            return module.xhr || false;
          },
          settings: function() {
            var
              runSettings
            ;
            runSettings = settings.beforeSend.call(context, settings);
            if(runSettings) {
              if(runSettings.success !== undefined) {
                module.debug('Legacy success callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.success);
                runSettings.onSuccess = runSettings.success;
              }
              if(runSettings.failure !== undefined) {
                module.debug('Legacy failure callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.failure);
                runSettings.onFailure = runSettings.failure;
              }
              if(runSettings.complete !== undefined) {
                module.debug('Legacy complete callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.complete);
                runSettings.onComplete = runSettings.complete;
              }
            }
            if(runSettings === undefined) {
              module.error(error.noReturnedValue);
            }
            if(runSettings === false) {
              return runSettings;
            }
            return (runSettings !== undefined)
              ? $.extend(true, {}, runSettings)
              : $.extend(true, {}, settings)
            ;
          },
          urlEncodedValue: function(value) {
            var
              decodedValue   = window.decodeURIComponent(value),
              encodedValue   = window.encodeURIComponent(value),
              alreadyEncoded = (decodedValue !== value)
            ;
            if(alreadyEncoded) {
              module.debug('URL value is already encoded, avoiding double encoding', value);
              return value;
            }
            module.verbose('Encoding value using encodeURIComponent', value, encodedValue);
            return encodedValue;
          },
          defaultData: function() {
            var
              data = {}
            ;
            if( !$.isWindow(element) ) {
              if( module.is.input() ) {
                data.value = $module.val();
              }
              else if( module.is.form() ) {

              }
              else {
                data.text = $module.text();
              }
            }
            return data;
          },
          event: function() {
            if( $.isWindow(element) || settings.on == 'now' ) {
              module.debug('API called without element, no events attached');
              return false;
            }
            else if(settings.on == 'auto') {
              if( $module.is('input') ) {
                return (element.oninput !== undefined)
                  ? 'input'
                  : (element.onpropertychange !== undefined)
                    ? 'propertychange'
                    : 'keyup'
                ;
              }
              else if( $module.is('form') ) {
                return 'submit';
              }
              else {
                return 'click';
              }
            }
            else {
              return settings.on;
            }
          },
          templatedURL: function(action) {
            action = action || $module.data(metadata.action) || settings.action || false;
            url    = $module.data(metadata.url) || settings.url || false;
            if(url) {
              module.debug('Using specified url', url);
              return url;
            }
            if(action) {
              module.debug('Looking up url for action', action, settings.api);
              if(settings.api[action] === undefined && !module.is.mocked()) {
                module.error(error.missingAction, settings.action, settings.api);
                return;
              }
              url = settings.api[action];
            }
            else if( module.is.form() ) {
              url = $module.attr('action') || $context.attr('action') || false;
              module.debug('No url or action specified, defaulting to form action', url);
            }
            return url;
          }
        },

        abort: function() {
          var
            xhr = module.get.xhr()
          ;
          if( xhr && xhr.state() !== 'resolved') {
            module.debug('Cancelling API request');
            xhr.abort();
          }
        },

        // reset state
        reset: function() {
          module.remove.error();
          module.remove.loading();
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                //'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.api.settings = {

  name              : 'API',
  namespace         : 'api',

  debug             : false,
  verbose           : false,
  performance       : true,

  // object containing all templates endpoints
  api               : {},

  // whether to cache responses
  cache             : true,

  // whether new requests should abort previous requests
  interruptRequests : true,

  // event binding
  on                : 'auto',

  // context for applying state classes
  stateContext      : false,

  // duration for loading state
  loadingDuration   : 0,

  // whether to hide errors after a period of time
  hideError         : 'auto',

  // duration for error state
  errorDuration     : 2000,

  // whether parameters should be encoded with encodeURIComponent
  encodeParameters  : true,

  // API action to use
  action            : false,

  // templated URL to use
  url               : false,

  // base URL to apply to all endpoints
  base              : '',

  // data that will
  urlData           : {},

  // whether to add default data to url data
  defaultData          : true,

  // whether to serialize closest form
  serializeForm        : false,

  // how long to wait before request should occur
  throttle             : 0,

  // whether to throttle first request or only repeated
  throttleFirstRequest : true,

  // standard ajax settings
  method            : 'get',
  data              : {},
  dataType          : 'json',

  // mock response
  mockResponse      : false,
  mockResponseAsync : false,

  // aliases for mock
  response          : false,
  responseAsync     : false,

  // callbacks before request
  beforeSend  : function(settings) { return settings; },
  beforeXHR   : function(xhr) {},
  onRequest   : function(promise, xhr) {},

  // after request
  onResponse  : false, // function(response) { },

  // response was successful, if JSON passed validation
  onSuccess   : function(response, $module) {},

  // request finished without aborting
  onComplete  : function(response, $module) {},

  // failed JSON success test
  onFailure   : function(response, $module) {},

  // server error
  onError     : function(errorMessage, $module) {},

  // request aborted
  onAbort     : function(errorMessage, $module) {},

  successTest : false,

  // errors
  error : {
    beforeSend        : 'The before send function has aborted the request',
    error             : 'There was an error with your request',
    exitConditions    : 'API Request Aborted. Exit conditions met',
    JSONParse         : 'JSON could not be parsed during error handling',
    legacyParameters  : 'You are using legacy API success callback names',
    method            : 'The method you called is not defined',
    missingAction     : 'API action used but no url was defined',
    missingSerialize  : 'jquery-serialize-object is required to add form data to an existing data object',
    missingURL        : 'No URL specified for api event',
    noReturnedValue   : 'The beforeSend callback must return a settings object, beforeSend ignored.',
    noStorage         : 'Caching responses locally requires session storage',
    parseError        : 'There was an error parsing your request',
    requiredParameter : 'Missing a required URL parameter: ',
    statusMessage     : 'Server gave an error: ',
    timeout           : 'Your request timed out'
  },

  regExp  : {
    required : /\{\$*[A-z0-9]+\}/g,
    optional : /\{\/\$*[A-z0-9]+\}/g,
  },

  className: {
    loading : 'loading',
    error   : 'error'
  },

  selector: {
    disabled : '.disabled',
    form      : 'form'
  },

  metadata: {
    action  : 'action',
    url     : 'url'
  }
};



})( jQuery, window, document );

},{}],320:[function(require,module,exports){
/*!
 * # Semantic UI - Checkbox
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.checkbox = function(parameters) {
  var
    $allModules    = $(this),
    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue
  ;

  $allModules
    .each(function() {
      var
        settings        = $.extend(true, {}, $.fn.checkbox.settings, parameters),

        className       = settings.className,
        namespace       = settings.namespace,
        selector        = settings.selector,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $label          = $(this).children(selector.label),
        $input          = $(this).children(selector.input),
        input           = $input[0],

        initialLoad     = false,
        shortcutPressed = false,
        instance        = $module.data(moduleNamespace),

        observer,
        element         = this,
        module
      ;

      module      = {

        initialize: function() {
          module.verbose('Initializing checkbox', settings);

          module.create.label();
          module.bind.events();

          module.set.tabbable();
          module.hide.input();

          module.observeChanges();
          module.instantiate();
          module.setup();
        },

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.verbose('Destroying module');
          module.unbind.events();
          module.show.input();
          $module.removeData(moduleNamespace);
        },

        fix: {
          reference: function() {
            if( $module.is(selector.input) ) {
              module.debug('Behavior called on <input> adjusting invoked element');
              $module = $module.closest(selector.checkbox);
              module.refresh();
            }
          }
        },

        setup: function() {
          module.set.initialLoad();
          if( module.is.indeterminate() ) {
            module.debug('Initial value is indeterminate');
            module.indeterminate();
          }
          else if( module.is.checked() ) {
            module.debug('Initial value is checked');
            module.check();
          }
          else {
            module.debug('Initial value is unchecked');
            module.uncheck();
          }
          module.remove.initialLoad();
        },

        refresh: function() {
          $label = $module.children(selector.label);
          $input = $module.children(selector.input);
          input  = $input[0];
        },

        hide: {
          input: function() {
            module.verbose('Modifying <input> z-index to be unselectable');
            $input.addClass(className.hidden);
          }
        },
        show: {
          input: function() {
            module.verbose('Modifying <input> z-index to be selectable');
            $input.removeClass(className.hidden);
          }
        },

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList : true,
              subtree   : true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },

        attachEvents: function(selector, event) {
          var
            $element = $(selector)
          ;
          event = $.isFunction(module[event])
            ? module[event]
            : module.toggle
          ;
          if($element.length > 0) {
            module.debug('Attaching checkbox events to element', selector, event);
            $element
              .on('click' + eventNamespace, event)
            ;
          }
          else {
            module.error(error.notFound);
          }
        },

        event: {
          click: function(event) {
            var
              $target = $(event.target)
            ;
            if( $target.is(selector.input) ) {
              module.verbose('Using default check action on initialized checkbox');
              return;
            }
            if( $target.is(selector.link) ) {
              module.debug('Clicking link inside checkbox, skipping toggle');
              return;
            }
            module.toggle();
            $input.focus();
            event.preventDefault();
          },
          keydown: function(event) {
            var
              key     = event.which,
              keyCode = {
                enter  : 13,
                space  : 32,
                escape : 27
              }
            ;
            if(key == keyCode.escape) {
              module.verbose('Escape key pressed blurring field');
              $input.blur();
              shortcutPressed = true;
            }
            else if(!event.ctrlKey && ( key == keyCode.space || key == keyCode.enter) ) {
              module.verbose('Enter/space key pressed, toggling checkbox');
              module.toggle();
              shortcutPressed = true;
            }
            else {
              shortcutPressed = false;
            }
          },
          keyup: function(event) {
            if(shortcutPressed) {
              event.preventDefault();
            }
          }
        },

        check: function() {
          if( !module.should.allowCheck() ) {
            return;
          }
          module.debug('Checking checkbox', $input);
          module.set.checked();
          if( !module.should.ignoreCallbacks() ) {
            settings.onChecked.call(input);
            settings.onChange.call(input);
          }
        },

        uncheck: function() {
          if( !module.should.allowUncheck() ) {
            return;
          }
          module.debug('Unchecking checkbox');
          module.set.unchecked();
          if( !module.should.ignoreCallbacks() ) {
            settings.onUnchecked.call(input);
            settings.onChange.call(input);
          }
        },

        indeterminate: function() {
          if( module.should.allowIndeterminate() ) {
            module.debug('Checkbox is already indeterminate');
            return;
          }
          module.debug('Making checkbox indeterminate');
          module.set.indeterminate();
          if( !module.should.ignoreCallbacks() ) {
            settings.onIndeterminate.call(input);
            settings.onChange.call(input);
          }
        },

        determinate: function() {
          if( module.should.allowDeterminate() ) {
            module.debug('Checkbox is already determinate');
            return;
          }
          module.debug('Making checkbox determinate');
          module.set.determinate();
          if( !module.should.ignoreCallbacks() ) {
            settings.onDeterminate.call(input);
            settings.onChange.call(input);
          }
        },

        enable: function() {
          if( module.is.enabled() ) {
            module.debug('Checkbox is already enabled');
            return;
          }
          module.debug('Enabling checkbox');
          module.set.enabled();
          settings.onEnable.call(input);
          // preserve legacy callbacks
          settings.onEnabled.call(input);
        },

        disable: function() {
          if( module.is.disabled() ) {
            module.debug('Checkbox is already disabled');
            return;
          }
          module.debug('Disabling checkbox');
          module.set.disabled();
          settings.onDisable.call(input);
          // preserve legacy callbacks
          settings.onDisabled.call(input);
        },

        get: {
          radios: function() {
            var
              name = module.get.name()
            ;
            return $('input[name="' + name + '"]').closest(selector.checkbox);
          },
          otherRadios: function() {
            return module.get.radios().not($module);
          },
          name: function() {
            return $input.attr('name');
          }
        },

        is: {
          initialLoad: function() {
            return initialLoad;
          },
          radio: function() {
            return ($input.hasClass(className.radio) || $input.attr('type') == 'radio');
          },
          indeterminate: function() {
            return $input.prop('indeterminate') !== undefined && $input.prop('indeterminate');
          },
          checked: function() {
            return $input.prop('checked') !== undefined && $input.prop('checked');
          },
          disabled: function() {
            return $input.prop('disabled') !== undefined && $input.prop('disabled');
          },
          enabled: function() {
            return !module.is.disabled();
          },
          determinate: function() {
            return !module.is.indeterminate();
          },
          unchecked: function() {
            return !module.is.checked();
          }
        },

        should: {
          allowCheck: function() {
            if(module.is.determinate() && module.is.checked() && !module.should.forceCallbacks() ) {
              module.debug('Should not allow check, checkbox is already checked');
              return false;
            }
            if(settings.beforeChecked.apply(input) === false) {
              module.debug('Should not allow check, beforeChecked cancelled');
              return false;
            }
            return true;
          },
          allowUncheck: function() {
            if(module.is.determinate() && module.is.unchecked() && !module.should.forceCallbacks() ) {
              module.debug('Should not allow uncheck, checkbox is already unchecked');
              return false;
            }
            if(settings.beforeUnchecked.apply(input) === false) {
              module.debug('Should not allow uncheck, beforeUnchecked cancelled');
              return false;
            }
            return true;
          },
          allowIndeterminate: function() {
            if(module.is.indeterminate() && !module.should.forceCallbacks() ) {
              module.debug('Should not allow indeterminate, checkbox is already indeterminate');
              return false;
            }
            if(settings.beforeIndeterminate.apply(input) === false) {
              module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');
              return false;
            }
            return true;
          },
          allowDeterminate: function() {
            if(module.is.determinate() && !module.should.forceCallbacks() ) {
              module.debug('Should not allow determinate, checkbox is already determinate');
              return false;
            }
            if(settings.beforeDeterminate.apply(input) === false) {
              module.debug('Should not allow determinate, beforeDeterminate cancelled');
              return false;
            }
            return true;
          },
          forceCallbacks: function() {
            return (module.is.initialLoad() && settings.fireOnInit);
          },
          ignoreCallbacks: function() {
            return (initialLoad && !settings.fireOnInit);
          }
        },

        can: {
          change: function() {
            return !( $module.hasClass(className.disabled) || $module.hasClass(className.readOnly) || $input.prop('disabled') || $input.prop('readonly') );
          },
          uncheck: function() {
            return (typeof settings.uncheckable === 'boolean')
              ? settings.uncheckable
              : !module.is.radio()
            ;
          }
        },

        set: {
          initialLoad: function() {
            initialLoad = true;
          },
          checked: function() {
            module.verbose('Setting class to checked');
            $module
              .removeClass(className.indeterminate)
              .addClass(className.checked)
            ;
            if( module.is.radio() ) {
              module.uncheckOthers();
            }
            if(!module.is.indeterminate() && module.is.checked()) {
              module.debug('Input is already checked, skipping input property change');
              return;
            }
            module.verbose('Setting state to checked', input);
            $input
              .prop('indeterminate', false)
              .prop('checked', true)
            ;
            module.trigger.change();
          },
          unchecked: function() {
            module.verbose('Removing checked class');
            $module
              .removeClass(className.indeterminate)
              .removeClass(className.checked)
            ;
            if(!module.is.indeterminate() &&  module.is.unchecked() ) {
              module.debug('Input is already unchecked');
              return;
            }
            module.debug('Setting state to unchecked');
            $input
              .prop('indeterminate', false)
              .prop('checked', false)
            ;
            module.trigger.change();
          },
          indeterminate: function() {
            module.verbose('Setting class to indeterminate');
            $module
              .addClass(className.indeterminate)
            ;
            if( module.is.indeterminate() ) {
              module.debug('Input is already indeterminate, skipping input property change');
              return;
            }
            module.debug('Setting state to indeterminate');
            $input
              .prop('indeterminate', true)
            ;
            module.trigger.change();
          },
          determinate: function() {
            module.verbose('Removing indeterminate class');
            $module
              .removeClass(className.indeterminate)
            ;
            if( module.is.determinate() ) {
              module.debug('Input is already determinate, skipping input property change');
              return;
            }
            module.debug('Setting state to determinate');
            $input
              .prop('indeterminate', false)
            ;
          },
          disabled: function() {
            module.verbose('Setting class to disabled');
            $module
              .addClass(className.disabled)
            ;
            if( module.is.disabled() ) {
              module.debug('Input is already disabled, skipping input property change');
              return;
            }
            module.debug('Setting state to disabled');
            $input
              .prop('disabled', 'disabled')
            ;
            module.trigger.change();
          },
          enabled: function() {
            module.verbose('Removing disabled class');
            $module.removeClass(className.disabled);
            if( module.is.enabled() ) {
              module.debug('Input is already enabled, skipping input property change');
              return;
            }
            module.debug('Setting state to enabled');
            $input
              .prop('disabled', false)
            ;
            module.trigger.change();
          },
          tabbable: function() {
            module.verbose('Adding tabindex to checkbox');
            if( $input.attr('tabindex') === undefined) {
              $input.attr('tabindex', 0);
            }
          }
        },

        remove: {
          initialLoad: function() {
            initialLoad = false;
          }
        },

        trigger: {
          change: function() {
            var
              events       = document.createEvent('HTMLEvents'),
              inputElement = $input[0]
            ;
            if(inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },


        create: {
          label: function() {
            if($input.prevAll(selector.label).length > 0) {
              $input.prev(selector.label).detach().insertAfter($input);
              module.debug('Moving existing label', $label);
            }
            else if( !module.has.label() ) {
              $label = $('<label>').insertAfter($input);
              module.debug('Creating label', $label);
            }
          }
        },

        has: {
          label: function() {
            return ($label.length > 0);
          }
        },

        bind: {
          events: function() {
            module.verbose('Attaching checkbox events');
            $module
              .on('click'   + eventNamespace, module.event.click)
              .on('keydown' + eventNamespace, selector.input, module.event.keydown)
              .on('keyup'   + eventNamespace, selector.input, module.event.keyup)
            ;
          }
        },

        unbind: {
          events: function() {
            module.debug('Removing events');
            $module
              .off(eventNamespace)
            ;
          }
        },

        uncheckOthers: function() {
          var
            $radios = module.get.otherRadios()
          ;
          module.debug('Unchecking other radios', $radios);
          $radios.removeClass(className.checked);
        },

        toggle: function() {
          if( !module.can.change() ) {
            if(!module.is.radio()) {
              module.debug('Checkbox is read-only or disabled, ignoring toggle');
            }
            return;
          }
          if( module.is.indeterminate() || module.is.unchecked() ) {
            module.debug('Currently unchecked');
            module.check();
          }
          else if( module.is.checked() && module.can.uncheck() ) {
            module.debug('Currently checked');
            module.uncheck();
          }
        },
        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.checkbox.settings = {

  name                : 'Checkbox',
  namespace           : 'checkbox',

  silent              : false,
  debug               : false,
  verbose             : true,
  performance         : true,

  // delegated event context
  uncheckable         : 'auto',
  fireOnInit          : false,

  onChange            : function(){},

  beforeChecked       : function(){},
  beforeUnchecked     : function(){},
  beforeDeterminate   : function(){},
  beforeIndeterminate : function(){},

  onChecked           : function(){},
  onUnchecked         : function(){},

  onDeterminate       : function() {},
  onIndeterminate     : function() {},

  onEnable            : function(){},
  onDisable           : function(){},

  // preserve misspelled callbacks (will be removed in 3.0)
  onEnabled           : function(){},
  onDisabled          : function(){},

  className       : {
    checked       : 'checked',
    indeterminate : 'indeterminate',
    disabled      : 'disabled',
    hidden        : 'hidden',
    radio         : 'radio',
    readOnly      : 'read-only'
  },

  error     : {
    method       : 'The method you called is not defined'
  },

  selector : {
    checkbox : '.ui.checkbox',
    label    : 'label, .box',
    input    : 'input[type="checkbox"], input[type="radio"]',
    link     : 'a[href]'
  }

};

})( jQuery, window, document );

},{}],321:[function(require,module,exports){
/*!
 * # Semantic UI - Colorize
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.colorize = function(parameters) {
  var
    settings          = ( $.isPlainObject(parameters) )
      ? $.extend(true, {}, $.fn.colorize.settings, parameters)
      : $.extend({}, $.fn.colorize.settings),
    // hoist arguments
    moduleArguments = arguments || false
  ;
  $(this)
    .each(function(instanceIndex) {

      var
        $module         = $(this),

        mainCanvas      = $('<canvas />')[0],
        imageCanvas     = $('<canvas />')[0],
        overlayCanvas   = $('<canvas />')[0],

        backgroundImage = new Image(),

        // defs
        mainContext,
        imageContext,
        overlayContext,

        image,
        imageName,

        width,
        height,

        // shortcuts
        colors    = settings.colors,
        paths     = settings.paths,
        namespace = settings.namespace,
        error     = settings.error,

        // boilerplate
        instance   = $module.data('module-' + namespace),
        module
      ;

      module = {

        checkPreconditions: function() {
          module.debug('Checking pre-conditions');

          if( !$.isPlainObject(colors) || $.isEmptyObject(colors) ) {
            module.error(error.undefinedColors);
            return false;
          }
          return true;
        },

        async: function(callback) {
          if(settings.async) {
            setTimeout(callback, 0);
          }
          else {
            callback();
          }
        },

        getMetadata: function() {
          module.debug('Grabbing metadata');
          image     = $module.data('image') || settings.image || undefined;
          imageName = $module.data('name')  || settings.name  || instanceIndex;
          width     = settings.width        || $module.width();
          height    = settings.height       || $module.height();
          if(width === 0 || height === 0) {
            module.error(error.undefinedSize);
          }
        },

        initialize: function() {
          module.debug('Initializing with colors', colors);
          if( module.checkPreconditions() ) {

            module.async(function() {
              module.getMetadata();
              module.canvas.create();

              module.draw.image(function() {
                module.draw.colors();
                module.canvas.merge();
              });
              $module
                .data('module-' + namespace, module)
              ;
            });
          }
        },

        redraw: function() {
          module.debug('Redrawing image');
          module.async(function() {
            module.canvas.clear();
            module.draw.colors();
            module.canvas.merge();
          });
        },

        change: {
          color: function(colorName, color) {
            module.debug('Changing color', colorName);
            if(colors[colorName] === undefined) {
              module.error(error.missingColor);
              return false;
            }
            colors[colorName] = color;
            module.redraw();
          }
        },

        canvas: {
          create: function() {
            module.debug('Creating canvases');

            mainCanvas.width     = width;
            mainCanvas.height    = height;
            imageCanvas.width    = width;
            imageCanvas.height   = height;
            overlayCanvas.width  = width;
            overlayCanvas.height = height;

            mainContext    = mainCanvas.getContext('2d');
            imageContext   = imageCanvas.getContext('2d');
            overlayContext = overlayCanvas.getContext('2d');

            $module
              .append( mainCanvas )
            ;
            mainContext    = $module.children('canvas')[0].getContext('2d');
          },
          clear: function(context) {
            module.debug('Clearing canvas');
            overlayContext.fillStyle = '#FFFFFF';
            overlayContext.fillRect(0, 0, width, height);
          },
          merge: function() {
            if( !$.isFunction(mainContext.blendOnto) ) {
              module.error(error.missingPlugin);
              return;
            }
            mainContext.putImageData( imageContext.getImageData(0, 0, width, height), 0, 0);
            overlayContext.blendOnto(mainContext, 'multiply');
          }
        },

        draw: {

          image: function(callback) {
            module.debug('Drawing image');
            callback = callback || function(){};
            if(image) {
              backgroundImage.src    = image;
              backgroundImage.onload = function() {
                imageContext.drawImage(backgroundImage, 0, 0);
                callback();
              };
            }
            else {
              module.error(error.noImage);
              callback();
            }
          },

          colors: function() {
            module.debug('Drawing color overlays', colors);
            $.each(colors, function(colorName, color) {
              settings.onDraw(overlayContext, imageName, colorName, color);
            });
          }

        },

        debug: function(message, variableName) {
          if(settings.debug) {
            if(variableName !== undefined) {
              console.info(settings.name + ': ' + message, variableName);
            }
            else {
              console.info(settings.name + ': ' + message);
            }
          }
        },
        error: function(errorMessage) {
          console.warn(settings.name + ': ' + errorMessage);
        },
        invoke: function(methodName, context, methodArguments) {
          var
            method
          ;
          methodArguments = methodArguments || Array.prototype.slice.call( arguments, 2 );

          if(typeof methodName == 'string' && instance !== undefined) {
            methodName = methodName.split('.');
            $.each(methodName, function(index, name) {
              if( $.isPlainObject( instance[name] ) ) {
                instance = instance[name];
                return true;
              }
              else if( $.isFunction( instance[name] ) ) {
                method = instance[name];
                return true;
              }
              module.error(settings.error.method);
              return false;
            });
          }
          return ( $.isFunction( method ) )
            ? method.apply(context, methodArguments)
            : false
          ;
        }

      };
      if(instance !== undefined && moduleArguments) {
        // simpler than invoke realizing to invoke itself (and losing scope due prototype.call()
        if(moduleArguments[0] == 'invoke') {
          moduleArguments = Array.prototype.slice.call( moduleArguments, 1 );
        }
        return module.invoke(moduleArguments[0], this, Array.prototype.slice.call( moduleArguments, 1 ) );
      }
      // initializing
      module.initialize();
    })
  ;
  return this;
};

$.fn.colorize.settings = {
  name      : 'Image Colorizer',
  debug     : true,
  namespace : 'colorize',

  onDraw    : function(overlayContext, imageName, colorName, color) {},

  // whether to block execution while updating canvas
  async     : true,
  // object containing names and default values of color regions
  colors    : {},

  metadata: {
    image : 'image',
    name  : 'name'
  },

  error: {
    noImage         : 'No tracing image specified',
    undefinedColors : 'No default colors specified.',
    missingColor    : 'Attempted to change color that does not exist',
    missingPlugin   : 'Blend onto plug-in must be included',
    undefinedHeight : 'The width or height of image canvas could not be automatically determined. Please specify a height.'
  }

};

})( jQuery, window, document );

},{}],322:[function(require,module,exports){
/*!
 * # Semantic UI - Dropdown
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.dropdown = function(parameters) {
  var
    $allModules    = $(this),
    $document      = $(document),

    moduleSelector = $allModules.selector || '',

    hasTouch       = ('ontouchstart' in document.documentElement),
    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue
  ;

  $allModules
    .each(function(elementIndex) {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.dropdown.settings, parameters)
          : $.extend({}, $.fn.dropdown.settings),

        className       = settings.className,
        message         = settings.message,
        fields          = settings.fields,
        keys            = settings.keys,
        metadata        = settings.metadata,
        namespace       = settings.namespace,
        regExp          = settings.regExp,
        selector        = settings.selector,
        error           = settings.error,
        templates       = settings.templates,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $context        = $(settings.context),
        $text           = $module.find(selector.text),
        $search         = $module.find(selector.search),
        $sizer          = $module.find(selector.sizer),
        $input          = $module.find(selector.input),
        $icon           = $module.find(selector.icon),

        $combo = ($module.prev().find(selector.text).length > 0)
          ? $module.prev().find(selector.text)
          : $module.prev(),

        $menu           = $module.children(selector.menu),
        $item           = $menu.find(selector.item),

        activated       = false,
        itemActivated   = false,
        internalChange  = false,
        element         = this,
        instance        = $module.data(moduleNamespace),

        initialLoad,
        pageLostFocus,
        willRefocus,
        elementNamespace,
        id,
        selectObserver,
        menuObserver,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing dropdown', settings);

          if( module.is.alreadySetup() ) {
            module.setup.reference();
          }
          else {
            module.setup.layout();
            module.refreshData();

            module.save.defaults();
            module.restore.selected();

            module.create.id();
            module.bind.events();

            module.observeChanges();
            module.instantiate();
          }

        },

        instantiate: function() {
          module.verbose('Storing instance of dropdown', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.verbose('Destroying previous dropdown', $module);
          module.remove.tabbable();
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
          $menu
            .off(eventNamespace)
          ;
          $document
            .off(elementNamespace)
          ;
          module.disconnect.menuObserver();
          module.disconnect.selectObserver();
        },

        observeChanges: function() {
          if('MutationObserver' in window) {
            selectObserver = new MutationObserver(module.event.select.mutation);
            menuObserver   = new MutationObserver(module.event.menu.mutation);
            module.debug('Setting up mutation observer', selectObserver, menuObserver);
            module.observe.select();
            module.observe.menu();
          }
        },

        disconnect: {
          menuObserver: function() {
            if(menuObserver) {
              menuObserver.disconnect();
            }
          },
          selectObserver: function() {
            if(selectObserver) {
              selectObserver.disconnect();
            }
          }
        },
        observe: {
          select: function() {
            if(module.has.input()) {
              selectObserver.observe($input[0], {
                childList : true,
                subtree   : true
              });
            }
          },
          menu: function() {
            if(module.has.menu()) {
              menuObserver.observe($menu[0], {
                childList : true,
                subtree   : true
              });
            }
          }
        },

        create: {
          id: function() {
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;
            module.verbose('Creating unique id for element', id);
          },
          userChoice: function(values) {
            var
              $userChoices,
              $userChoice,
              isUserValue,
              html
            ;
            values = values || module.get.userValues();
            if(!values) {
              return false;
            }
            values = $.isArray(values)
              ? values
              : [values]
            ;
            $.each(values, function(index, value) {
              if(module.get.item(value) === false) {
                html         = settings.templates.addition( module.add.variables(message.addResult, value) );
                $userChoice  = $('<div />')
                  .html(html)
                  .attr('data-' + metadata.value, value)
                  .attr('data-' + metadata.text, value)
                  .addClass(className.addition)
                  .addClass(className.item)
                ;
                if(settings.hideAdditions) {
                  $userChoice.addClass(className.hidden);
                }
                $userChoices = ($userChoices === undefined)
                  ? $userChoice
                  : $userChoices.add($userChoice)
                ;
                module.verbose('Creating user choices for value', value, $userChoice);
              }
            });
            return $userChoices;
          },
          userLabels: function(value) {
            var
              userValues = module.get.userValues()
            ;
            if(userValues) {
              module.debug('Adding user labels', userValues);
              $.each(userValues, function(index, value) {
                module.verbose('Adding custom user value');
                module.add.label(value, value);
              });
            }
          },
          menu: function() {
            $menu = $('<div />')
              .addClass(className.menu)
              .appendTo($module)
            ;
          },
          sizer: function() {
            $sizer = $('<span />')
              .addClass(className.sizer)
              .insertAfter($search)
            ;
          }
        },

        search: function(query) {
          query = (query !== undefined)
            ? query
            : module.get.query()
          ;
          module.verbose('Searching for query', query);
          if(module.has.minCharacters(query)) {
            module.filter(query);
          }
          else {
            module.hide();
          }
        },

        select: {
          firstUnfiltered: function() {
            module.verbose('Selecting first non-filtered element');
            module.remove.selectedItem();
            $item
              .not(selector.unselectable)
              .not(selector.addition + selector.hidden)
                .eq(0)
                .addClass(className.selected)
            ;
          },
          nextAvailable: function($selected) {
            $selected = $selected.eq(0);
            var
              $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
              $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
              hasNext        = ($nextAvailable.length > 0)
            ;
            if(hasNext) {
              module.verbose('Moving selection to', $nextAvailable);
              $nextAvailable.addClass(className.selected);
            }
            else {
              module.verbose('Moving selection to', $prevAvailable);
              $prevAvailable.addClass(className.selected);
            }
          }
        },

        setup: {
          api: function() {
            var
              apiSettings = {
                debug   : settings.debug,
                urlData : {
                  value : module.get.value(),
                  query : module.get.query()
                },
                on    : false
              }
            ;
            module.verbose('First request, initializing API');
            $module
              .api(apiSettings)
            ;
          },
          layout: function() {
            if( $module.is('select') ) {
              module.setup.select();
              module.setup.returnedObject();
            }
            if( !module.has.menu() ) {
              module.create.menu();
            }
            if( module.is.search() && !module.has.search() ) {
              module.verbose('Adding search input');
              $search = $('<input />')
                .addClass(className.search)
                .prop('autocomplete', 'off')
                .insertBefore($text)
              ;
            }
            if( module.is.multiple() && module.is.searchSelection() && !module.has.sizer()) {
              module.create.sizer();
            }
            if(settings.allowTab) {
              module.set.tabbable();
            }
          },
          select: function() {
            var
              selectValues  = module.get.selectValues()
            ;
            module.debug('Dropdown initialized on a select', selectValues);
            if( $module.is('select') ) {
              $input = $module;
            }
            // see if select is placed correctly already
            if($input.parent(selector.dropdown).length > 0) {
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);
              if( !module.has.menu() ) {
                module.create.menu();
              }
              $menu = $module.children(selector.menu);
              module.setup.menu(selectValues);
            }
            else {
              module.debug('Creating entire dropdown from select');
              $module = $('<div />')
                .attr('class', $input.attr('class') )
                .addClass(className.selection)
                .addClass(className.dropdown)
                .html( templates.dropdown(selectValues) )
                .insertBefore($input)
              ;
              if($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);
                $input.prop('multiple', true);
              }
              if($input.is('[multiple]')) {
                module.set.multiple();
              }
              if ($input.prop('disabled')) {
                module.debug('Disabling dropdown');
                $module.addClass(className.disabled);
              }
              $input
                .removeAttr('class')
                .detach()
                .prependTo($module)
              ;
            }
            module.refresh();
          },
          menu: function(values) {
            $menu.html( templates.menu(values, fields));
            $item = $menu.find(selector.item);
          },
          reference: function() {
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown');
            // replace module reference
            $module = $module.parent(selector.dropdown);
            module.refresh();
            module.setup.returnedObject();
            // invoke method in context of current instance
            if(methodInvoked) {
              instance = module;
              module.invoke(query);
            }
          },
          returnedObject: function() {
            var
              $firstModules = $allModules.slice(0, elementIndex),
              $lastModules = $allModules.slice(elementIndex + 1)
            ;
            // adjust all modules to use correct reference
            $allModules = $firstModules.add($module).add($lastModules);
          }
        },

        refresh: function() {
          module.refreshSelectors();
          module.refreshData();
        },

        refreshItems: function() {
          $item = $menu.find(selector.item);
        },

        refreshSelectors: function() {
          module.verbose('Refreshing selector cache');
          $text   = $module.find(selector.text);
          $search = $module.find(selector.search);
          $input  = $module.find(selector.input);
          $icon   = $module.find(selector.icon);
          $combo  = ($module.prev().find(selector.text).length > 0)
            ? $module.prev().find(selector.text)
            : $module.prev()
          ;
          $menu    = $module.children(selector.menu);
          $item    = $menu.find(selector.item);
        },

        refreshData: function() {
          module.verbose('Refreshing cached metadata');
          $item
            .removeData(metadata.text)
            .removeData(metadata.value)
          ;
        },

        clearData: function() {
          module.verbose('Clearing metadata');
          $item
            .removeData(metadata.text)
            .removeData(metadata.value)
          ;
          $module
            .removeData(metadata.defaultText)
            .removeData(metadata.defaultValue)
            .removeData(metadata.placeholderText)
          ;
        },

        toggle: function() {
          module.verbose('Toggling menu visibility');
          if( !module.is.active() ) {
            module.show();
          }
          else {
            module.hide();
          }
        },

        show: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if(!module.can.show() && module.is.remote()) {
            module.debug('No API results retrieved, searching before show');
            module.queryRemote(module.get.query(), module.show);
          }
          if( module.can.show() && !module.is.active() ) {
            module.debug('Showing dropdown');
            if(module.has.message() && !(module.has.maxSelections() || module.has.allResultsFiltered()) ) {
              module.remove.message();
            }
            if(module.is.allFiltered()) {
              return true;
            }
            if(settings.onShow.call(element) !== false) {
              module.animate.show(function() {
                if( module.can.click() ) {
                  module.bind.intent();
                }
                if(module.has.menuSearch()) {
                  module.focusSearch();
                }
                module.set.visible();
                callback.call(element);
              });
            }
          }
        },

        hide: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if( module.is.active() ) {
            module.debug('Hiding dropdown');
            if(settings.onHide.call(element) !== false) {
              module.animate.hide(function() {
                module.remove.visible();
                callback.call(element);
              });
            }
          }
        },

        hideOthers: function() {
          module.verbose('Finding other dropdowns to hide');
          $allModules
            .not($module)
              .has(selector.menu + '.' + className.visible)
                .dropdown('hide')
          ;
        },

        hideMenu: function() {
          module.verbose('Hiding menu  instantaneously');
          module.remove.active();
          module.remove.visible();
          $menu.transition('hide');
        },

        hideSubMenus: function() {
          var
            $subMenus = $menu.children(selector.item).find(selector.menu)
          ;
          module.verbose('Hiding sub menus', $subMenus);
          $subMenus.transition('hide');
        },

        bind: {
          events: function() {
            if(hasTouch) {
              module.bind.touchEvents();
            }
            module.bind.keyboardEvents();
            module.bind.inputEvents();
            module.bind.mouseEvents();
          },
          touchEvents: function() {
            module.debug('Touch device detected binding additional touch events');
            if( module.is.searchSelection() ) {
              // do nothing special yet
            }
            else if( module.is.single() ) {
              $module
                .on('touchstart' + eventNamespace, module.event.test.toggle)
              ;
            }
            $menu
              .on('touchstart' + eventNamespace, selector.item, module.event.item.mouseenter)
            ;
          },
          keyboardEvents: function() {
            module.verbose('Binding keyboard events');
            $module
              .on('keydown' + eventNamespace, module.event.keydown)
            ;
            if( module.has.search() ) {
              $module
                .on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input)
              ;
            }
            if( module.is.multiple() ) {
              $document
                .on('keydown' + elementNamespace, module.event.document.keydown)
              ;
            }
          },
          inputEvents: function() {
            module.verbose('Binding input change events');
            $module
              .on('change' + eventNamespace, selector.input, module.event.change)
            ;
          },
          mouseEvents: function() {
            module.verbose('Binding mouse events');
            if(module.is.multiple()) {
              $module
                .on('click'   + eventNamespace, selector.label,  module.event.label.click)
                .on('click'   + eventNamespace, selector.remove, module.event.remove.click)
              ;
            }
            if( module.is.searchSelection() ) {
              $module
                .on('mousedown' + eventNamespace, module.event.mousedown)
                .on('mouseup'   + eventNamespace, module.event.mouseup)
                .on('mousedown' + eventNamespace, selector.menu,   module.event.menu.mousedown)
                .on('mouseup'   + eventNamespace, selector.menu,   module.event.menu.mouseup)
                .on('click'     + eventNamespace, selector.icon,   module.event.icon.click)
                .on('focus'     + eventNamespace, selector.search, module.event.search.focus)
                .on('click'     + eventNamespace, selector.search, module.event.search.focus)
                .on('blur'      + eventNamespace, selector.search, module.event.search.blur)
                .on('click'     + eventNamespace, selector.text,   module.event.text.focus)
              ;
              if(module.is.multiple()) {
                $module
                  .on('click' + eventNamespace, module.event.click)
                ;
              }
            }
            else {
              if(settings.on == 'click') {
                $module
                  .on('click' + eventNamespace, selector.icon, module.event.icon.click)
                  .on('click' + eventNamespace, module.event.test.toggle)
                ;
              }
              else if(settings.on == 'hover') {
                $module
                  .on('mouseenter' + eventNamespace, module.delay.show)
                  .on('mouseleave' + eventNamespace, module.delay.hide)
                ;
              }
              else {
                $module
                  .on(settings.on + eventNamespace, module.toggle)
                ;
              }
              $module
                .on('mousedown' + eventNamespace, module.event.mousedown)
                .on('mouseup'   + eventNamespace, module.event.mouseup)
                .on('focus'     + eventNamespace, module.event.focus)
              ;
              if(module.has.menuSearch() ) {
                $module
                  .on('blur' + eventNamespace, selector.search, module.event.search.blur)
                ;
              }
              else {
                $module
                  .on('blur' + eventNamespace, module.event.blur)
                ;
              }
            }
            $menu
              .on('mouseenter' + eventNamespace, selector.item, module.event.item.mouseenter)
              .on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave)
              .on('click'      + eventNamespace, selector.item, module.event.item.click)
            ;
          },
          intent: function() {
            module.verbose('Binding hide intent event to document');
            if(hasTouch) {
              $document
                .on('touchstart' + elementNamespace, module.event.test.touch)
                .on('touchmove'  + elementNamespace, module.event.test.touch)
              ;
            }
            $document
              .on('click' + elementNamespace, module.event.test.hide)
            ;
          }
        },

        unbind: {
          intent: function() {
            module.verbose('Removing hide intent event from document');
            if(hasTouch) {
              $document
                .off('touchstart' + elementNamespace)
                .off('touchmove' + elementNamespace)
              ;
            }
            $document
              .off('click' + elementNamespace)
            ;
          }
        },

        filter: function(query) {
          var
            searchTerm = (query !== undefined)
              ? query
              : module.get.query(),
            afterFiltered = function() {
              if(module.is.multiple()) {
                module.filterActive();
              }
              module.select.firstUnfiltered();
              if( module.has.allResultsFiltered() ) {
                if( settings.onNoResults.call(element, searchTerm) ) {
                  if(settings.allowAdditions) {
                    if(settings.hideAdditions) {
                      module.verbose('User addition with no menu, setting empty style');
                      module.set.empty();
                      module.hideMenu();
                    }
                  }
                  else {
                    module.verbose('All items filtered, showing message', searchTerm);
                    module.add.message(message.noResults);
                  }
                }
                else {
                  module.verbose('All items filtered, hiding dropdown', searchTerm);
                  module.hideMenu();
                }
              }
              else {
                module.remove.empty();
                module.remove.message();
              }
              if(settings.allowAdditions) {
                module.add.userSuggestion(query);
              }
              if(module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch() ) {
                module.show();
              }
            }
          ;
          if(settings.useLabels && module.has.maxSelections()) {
            return;
          }
          if(settings.apiSettings) {
            if( module.can.useAPI() ) {
              module.queryRemote(searchTerm, function() {
                if(settings.filterRemoteData) {
                  module.filterItems(searchTerm);
                }
                afterFiltered();
              });
            }
            else {
              module.error(error.noAPI);
            }
          }
          else {
            module.filterItems(searchTerm);
            afterFiltered();
          }
        },

        queryRemote: function(query, callback) {
          var
            apiSettings = {
              errorDuration : false,
              cache         : 'local',
              throttle      : settings.throttle,
              urlData       : {
                query: query
              },
              onError: function() {
                module.add.message(message.serverError);
                callback();
              },
              onFailure: function() {
                module.add.message(message.serverError);
                callback();
              },
              onSuccess : function(response) {
                module.remove.message();
                module.setup.menu({
                  values: response[fields.remoteValues]
                });
                callback();
              }
            }
          ;
          if( !$module.api('get request') ) {
            module.setup.api();
          }
          apiSettings = $.extend(true, {}, apiSettings, settings.apiSettings);
          $module
            .api('setting', apiSettings)
            .api('query')
          ;
        },

        filterItems: function(query) {
          var
            searchTerm = (query !== undefined)
              ? query
              : module.get.query(),
            results          =  null,
            escapedTerm      = module.escape.string(searchTerm),
            beginsWithRegExp = new RegExp('^' + escapedTerm, 'igm')
          ;
          // avoid loop if we're matching nothing
          if( module.has.query() ) {
            results = [];

            module.verbose('Searching for matching values', searchTerm);
            $item
              .each(function(){
                var
                  $choice = $(this),
                  text,
                  value
                ;
                if(settings.match == 'both' || settings.match == 'text') {
                  text = String(module.get.choiceText($choice, false));
                  if(text.search(beginsWithRegExp) !== -1) {
                    results.push(this);
                    return true;
                  }
                  else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, text)) {
                    results.push(this);
                    return true;
                  }
                  else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, text)) {
                    results.push(this);
                    return true;
                  }
                }
                if(settings.match == 'both' || settings.match == 'value') {
                  value = String(module.get.choiceValue($choice, text));
                  if(value.search(beginsWithRegExp) !== -1) {
                    results.push(this);
                    return true;
                  }
                  else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, value)) {
                    results.push(this);
                    return true;
                  }
                  else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, value)) {
                    results.push(this);
                    return true;
                  }
                }
              })
            ;
          }
          module.debug('Showing only matched items', searchTerm);
          module.remove.filteredItem();
          if(results) {
            $item
              .not(results)
              .addClass(className.filtered)
            ;
          }
        },

        fuzzySearch: function(query, term) {
          var
            termLength  = term.length,
            queryLength = query.length
          ;
          query = query.toLowerCase();
          term  = term.toLowerCase();
          if(queryLength > termLength) {
            return false;
          }
          if(queryLength === termLength) {
            return (query === term);
          }
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var
              queryCharacter = query.charCodeAt(characterIndex)
            ;
            while(nextCharacterIndex < termLength) {
              if(term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
              }
            }
            return false;
          }
          return true;
        },
        exactSearch: function (query, term) {
          query = query.toLowerCase();
          term  = term.toLowerCase();
          if(term.indexOf(query) > -1) {
             return true;
          }
          return false;
        },
        filterActive: function() {
          if(settings.useLabels) {
            $item.filter('.' + className.active)
              .addClass(className.filtered)
            ;
          }
        },

        focusSearch: function(skipHandler) {
          if( module.has.search() && !module.is.focusedOnSearch() ) {
            if(skipHandler) {
              $module.off('focus' + eventNamespace, selector.search);
              $search.focus();
              $module.on('focus'  + eventNamespace, selector.search, module.event.search.focus);
            }
            else {
              $search.focus();
            }
          }
        },

        forceSelection: function() {
          var
            $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
            $activeItem        = $item.not(className.filtered).filter('.' + className.active).eq(0),
            $selectedItem      = ($currentlySelected.length > 0)
              ? $currentlySelected
              : $activeItem,
            hasSelected = ($selectedItem.length > 0)
          ;
          if(hasSelected && !module.is.multiple()) {
            module.debug('Forcing partial selection to selected item', $selectedItem);
            module.event.item.click.call($selectedItem, {}, true);
            return;
          }
          else {
            if(settings.allowAdditions) {
              module.set.selected(module.get.query());
              module.remove.searchTerm();
            }
            else {
              module.remove.searchTerm();
            }
          }
        },

        event: {
          change: function() {
            if(!internalChange) {
              module.debug('Input changed, updating selection');
              module.set.selected();
            }
          },
          focus: function() {
            if(settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();
            }
          },
          blur: function(event) {
            pageLostFocus = (document.activeElement === this);
            if(!activated && !pageLostFocus) {
              module.remove.activeLabel();
              module.hide();
            }
          },
          mousedown: function() {
            if(module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = true;
            }
            else {
              // prevents focus callback from occurring on mousedown
              activated = true;
            }
          },
          mouseup: function() {
            if(module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = false;
            }
            else {
              activated = false;
            }
          },
          click: function(event) {
            var
              $target = $(event.target)
            ;
            // focus search
            if($target.is($module)) {
              if(!module.is.focusedOnSearch()) {
                module.focusSearch();
              }
              else {
                module.show();
              }
            }
          },
          search: {
            focus: function() {
              activated = true;
              if(module.is.multiple()) {
                module.remove.activeLabel();
              }
              if(settings.showOnFocus) {
                module.search();
              }
            },
            blur: function(event) {
              pageLostFocus = (document.activeElement === this);
              if(module.is.searchSelection() && !willRefocus) {
                if(!itemActivated && !pageLostFocus) {
                  if(settings.forceSelection) {
                    module.forceSelection();
                  }
                  module.hide();
                }
              }
              willRefocus = false;
            }
          },
          icon: {
            click: function(event) {
              module.toggle();
            }
          },
          text: {
            focus: function(event) {
              activated = true;
              module.focusSearch();
            }
          },
          input: function(event) {
            if(module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();
            }
            clearTimeout(module.timer);
            module.timer = setTimeout(module.search, settings.delay.search);
          },
          label: {
            click: function(event) {
              var
                $label        = $(this),
                $labels       = $module.find(selector.label),
                $activeLabels = $labels.filter('.' + className.active),
                $nextActive   = $label.nextAll('.' + className.active),
                $prevActive   = $label.prevAll('.' + className.active),
                $range = ($nextActive.length > 0)
                  ? $label.nextUntil($nextActive).add($activeLabels).add($label)
                  : $label.prevUntil($prevActive).add($activeLabels).add($label)
              ;
              if(event.shiftKey) {
                $activeLabels.removeClass(className.active);
                $range.addClass(className.active);
              }
              else if(event.ctrlKey) {
                $label.toggleClass(className.active);
              }
              else {
                $activeLabels.removeClass(className.active);
                $label.addClass(className.active);
              }
              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
            }
          },
          remove: {
            click: function() {
              var
                $label = $(this).parent()
              ;
              if( $label.hasClass(className.active) ) {
                // remove all selected labels
                module.remove.activeLabels();
              }
              else {
                // remove this label only
                module.remove.activeLabels( $label );
              }
            }
          },
          test: {
            toggle: function(event) {
              var
                toggleBehavior = (module.is.multiple())
                  ? module.show
                  : module.toggle
              ;
              if(module.is.bubbledLabelClick(event) || module.is.bubbledIconClick(event)) {
                return;
              }
              if( module.determine.eventOnElement(event, toggleBehavior) ) {
                event.preventDefault();
              }
            },
            touch: function(event) {
              module.determine.eventOnElement(event, function() {
                if(event.type == 'touchstart') {
                  module.timer = setTimeout(function() {
                    module.hide();
                  }, settings.delay.touch);
                }
                else if(event.type == 'touchmove') {
                  clearTimeout(module.timer);
                }
              });
              event.stopPropagation();
            },
            hide: function(event) {
              module.determine.eventInModule(event, module.hide);
            }
          },
          select: {
            mutation: function(mutations) {
              module.debug('<select> modified, recreating menu');
              module.setup.select();
            }
          },
          menu: {
            mutation: function(mutations) {
              var
                mutation   = mutations[0],
                $addedNode = mutation.addedNodes
                  ? $(mutation.addedNodes[0])
                  : $(false),
                $removedNode = mutation.removedNodes
                  ? $(mutation.removedNodes[0])
                  : $(false),
                $changedNodes  = $addedNode.add($removedNode),
                isUserAddition = $changedNodes.is(selector.addition) || $changedNodes.closest(selector.addition).length > 0,
                isMessage      = $changedNodes.is(selector.message)  || $changedNodes.closest(selector.message).length > 0
              ;
              if(isUserAddition || isMessage) {
                module.debug('Updating item selector cache');
                module.refreshItems();
              }
              else {
                module.debug('Menu modified, updating selector cache');
                module.refresh();
              }
            },
            mousedown: function() {
              itemActivated = true;
            },
            mouseup: function() {
              itemActivated = false;
            }
          },
          item: {
            mouseenter: function(event) {
              var
                $target        = $(event.target),
                $item          = $(this),
                $subMenu       = $item.children(selector.menu),
                $otherMenus    = $item.siblings(selector.item).children(selector.menu),
                hasSubMenu     = ($subMenu.length > 0),
                isBubbledEvent = ($subMenu.find($target).length > 0)
              ;
              if( !isBubbledEvent && hasSubMenu ) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function() {
                  module.verbose('Showing sub-menu', $subMenu);
                  $.each($otherMenus, function() {
                    module.animate.hide(false, $(this));
                  });
                  module.animate.show(false, $subMenu);
                }, settings.delay.show);
                event.preventDefault();
              }
            },
            mouseleave: function(event) {
              var
                $subMenu = $(this).children(selector.menu)
              ;
              if($subMenu.length > 0) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function() {
                  module.verbose('Hiding sub-menu', $subMenu);
                  module.animate.hide(false, $subMenu);
                }, settings.delay.hide);
              }
            },
            click: function (event, skipRefocus) {
              var
                $choice        = $(this),
                $target        = (event)
                  ? $(event.target)
                  : $(''),
                $subMenu       = $choice.find(selector.menu),
                text           = module.get.choiceText($choice),
                value          = module.get.choiceValue($choice, text),
                hasSubMenu     = ($subMenu.length > 0),
                isBubbledEvent = ($subMenu.find($target).length > 0)
              ;
              // prevents IE11 bug where menu receives focus even though `tabindex=-1`
              if(module.has.menuSearch()) {
                $(document.activeElement).blur();
              }
              if(!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if(module.is.searchSelection()) {
                  if(settings.allowAdditions) {
                    module.remove.userAddition();
                  }
                  module.remove.searchTerm();
                  if(!module.is.focusedOnSearch() && !(skipRefocus == true)) {
                    module.focusSearch(true);
                  }
                }
                if(!settings.useLabels) {
                  module.remove.filteredItem();
                  module.set.scrollPosition($choice);
                }
                module.determine.selectAction.call(this, text, value);
              }
            }
          },

          document: {
            // label selection should occur even when element has no focus
            keydown: function(event) {
              var
                pressedKey    = event.which,
                isShortcutKey = module.is.inObject(pressedKey, keys)
              ;
              if(isShortcutKey) {
                var
                  $label            = $module.find(selector.label),
                  $activeLabel      = $label.filter('.' + className.active),
                  activeValue       = $activeLabel.data(metadata.value),
                  labelIndex        = $label.index($activeLabel),
                  labelCount        = $label.length,
                  hasActiveLabel    = ($activeLabel.length > 0),
                  hasMultipleActive = ($activeLabel.length > 1),
                  isFirstLabel      = (labelIndex === 0),
                  isLastLabel       = (labelIndex + 1 == labelCount),
                  isSearch          = module.is.searchSelection(),
                  isFocusedOnSearch = module.is.focusedOnSearch(),
                  isFocused         = module.is.focused(),
                  caretAtStart      = (isFocusedOnSearch && module.get.caretPosition() === 0),
                  $nextLabel
                ;
                if(isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;
                }

                if(pressedKey == keys.leftArrow) {
                  // activate previous label
                  if((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');
                    $label.last().addClass(className.active);
                  }
                  else if(hasActiveLabel) {
                    if(!event.shiftKey) {
                      module.verbose('Selecting previous label');
                      $label.removeClass(className.active);
                    }
                    else {
                      module.verbose('Adding previous label to selection');
                    }
                    if(isFirstLabel && !hasMultipleActive) {
                      $activeLabel.addClass(className.active);
                    }
                    else {
                      $activeLabel.prev(selector.siblingLabel)
                        .addClass(className.active)
                        .end()
                      ;
                    }
                    event.preventDefault();
                  }
                }
                else if(pressedKey == keys.rightArrow) {
                  // activate first label
                  if(isFocused && !hasActiveLabel) {
                    $label.first().addClass(className.active);
                  }
                  // activate next label
                  if(hasActiveLabel) {
                    if(!event.shiftKey) {
                      module.verbose('Selecting next label');
                      $label.removeClass(className.active);
                    }
                    else {
                      module.verbose('Adding next label to selection');
                    }
                    if(isLastLabel) {
                      if(isSearch) {
                        if(!isFocusedOnSearch) {
                          module.focusSearch();
                        }
                        else {
                          $label.removeClass(className.active);
                        }
                      }
                      else if(hasMultipleActive) {
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                      }
                      else {
                        $activeLabel.addClass(className.active);
                      }
                    }
                    else {
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    }
                    event.preventDefault();
                  }
                }
                else if(pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if(hasActiveLabel) {
                    module.verbose('Removing active labels');
                    if(isLastLabel) {
                      if(isSearch && !isFocusedOnSearch) {
                        module.focusSearch();
                      }
                    }
                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                    event.preventDefault();
                  }
                  else if(caretAtStart && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                  }
                }
                else {
                  $activeLabel.removeClass(className.active);
                }
              }
            }
          },

          keydown: function(event) {
            var
              pressedKey    = event.which,
              isShortcutKey = module.is.inObject(pressedKey, keys)
            ;
            if(isShortcutKey) {
              var
                $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                $activeItem        = $menu.children('.' + className.active).eq(0),
                $selectedItem      = ($currentlySelected.length > 0)
                  ? $currentlySelected
                  : $activeItem,
                $visibleItems = ($selectedItem.length > 0)
                  ? $selectedItem.siblings(':not(.' + className.filtered +')').addBack()
                  : $menu.children(':not(.' + className.filtered +')'),
                $subMenu              = $selectedItem.children(selector.menu),
                $parentMenu           = $selectedItem.closest(selector.menu),
                inVisibleMenu         = ($parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0),
                hasSubMenu            = ($subMenu.length> 0),
                hasSelectedItem       = ($selectedItem.length > 0),
                selectedIsSelectable  = ($selectedItem.not(selector.unselectable).length > 0),
                delimiterPressed      = (pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple()),
                isAdditionWithoutMenu = (settings.allowAdditions && settings.hideAdditions && (pressedKey == keys.enter || delimiterPressed) && selectedIsSelectable),
                $nextItem,
                isSubMenuItem,
                newIndex
              ;
              // allow selection with menu closed
              if(isAdditionWithoutMenu) {
                module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                module.event.item.click.call($selectedItem, event);
                if(module.is.searchSelection()) {
                  module.remove.searchTerm();
                }
              }

              // visible menu keyboard shortcuts
              if( module.is.visible() ) {

                // enter (select or open sub-menu)
                if(pressedKey == keys.enter || delimiterPressed) {
                  if(pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;
                  }
                  else if(selectedIsSelectable) {
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);
                    if(module.is.searchSelection()) {
                      module.remove.searchTerm();
                    }
                  }
                  event.preventDefault();
                }

                // sub-menu actions
                if(hasSelectedItem) {

                  if(pressedKey == keys.leftArrow) {

                    isSubMenuItem = ($parentMenu[0] !== $menu[0]);

                    if(isSubMenuItem) {
                      module.verbose('Left key pressed, closing sub-menu');
                      module.animate.hide(false, $parentMenu);
                      $selectedItem
                        .removeClass(className.selected)
                      ;
                      $parentMenu
                        .closest(selector.item)
                          .addClass(className.selected)
                      ;
                      event.preventDefault();
                    }
                  }

                  // right arrow (show sub-menu)
                  if(pressedKey == keys.rightArrow) {
                    if(hasSubMenu) {
                      module.verbose('Right key pressed, opening sub-menu');
                      module.animate.show(false, $subMenu);
                      $selectedItem
                        .removeClass(className.selected)
                      ;
                      $subMenu
                        .find(selector.item).eq(0)
                          .addClass(className.selected)
                      ;
                      event.preventDefault();
                    }
                  }
                }

                // up arrow (traverse menu up)
                if(pressedKey == keys.upArrow) {
                  $nextItem = (hasSelectedItem && inVisibleMenu)
                    ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0)
                    : $item.eq(0)
                  ;
                  if($visibleItems.index( $nextItem ) < 0) {
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();
                    return;
                  }
                  else {
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem
                      .removeClass(className.selected)
                    ;
                    $nextItem
                      .addClass(className.selected)
                    ;
                    module.set.scrollPosition($nextItem);
                    if(settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                    }
                  }
                  event.preventDefault();
                }

                // down arrow (traverse menu down)
                if(pressedKey == keys.downArrow) {
                  $nextItem = (hasSelectedItem && inVisibleMenu)
                    ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0)
                    : $item.eq(0)
                  ;
                  if($nextItem.length === 0) {
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();
                    return;
                  }
                  else {
                    module.verbose('Down key pressed, changing active item');
                    $item
                      .removeClass(className.selected)
                    ;
                    $nextItem
                      .addClass(className.selected)
                    ;
                    module.set.scrollPosition($nextItem);
                    if(settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                    }
                  }
                  event.preventDefault();
                }

                // page down (show next page)
                if(pressedKey == keys.pageUp) {
                  module.scrollPage('up');
                  event.preventDefault();
                }
                if(pressedKey == keys.pageDown) {
                  module.scrollPage('down');
                  event.preventDefault();
                }

                // escape (close menu)
                if(pressedKey == keys.escape) {
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();
                }

              }
              else {
                // delimiter key
                if(delimiterPressed) {
                  event.preventDefault();
                }
                // down arrow (open menu)
                if(pressedKey == keys.downArrow && !module.is.visible()) {
                  module.verbose('Down key pressed, showing dropdown');
                  module.select.firstUnfiltered();
                  module.show();
                  event.preventDefault();
                }
              }
            }
            else {
              if( !module.has.search() ) {
                module.set.selectedLetter( String.fromCharCode(pressedKey) );
              }
            }
          }
        },

        trigger: {
          change: function() {
            var
              events       = document.createEvent('HTMLEvents'),
              inputElement = $input[0]
            ;
            if(inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },

        determine: {
          selectAction: function(text, value) {
            module.verbose('Determining action', settings.action);
            if( $.isFunction( module.action[settings.action] ) ) {
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[ settings.action ].call(element, text, value, this);
            }
            else if( $.isFunction(settings.action) ) {
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(element, text, value, this);
            }
            else {
              module.error(error.action, settings.action);
            }
          },
          eventInModule: function(event, callback) {
            var
              $target    = $(event.target),
              inDocument = ($target.closest(document.documentElement).length > 0),
              inModule   = ($target.closest($module).length > 0)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){}
            ;
            if(inDocument && !inModule) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            }
            else {
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;
            }
          },
          eventOnElement: function(event, callback) {
            var
              $target      = $(event.target),
              $label       = $target.closest(selector.siblingLabel),
              inVisibleDOM = document.body.contains(event.target),
              notOnLabel   = ($module.find($label).length === 0),
              notInMenu    = ($target.closest($menu).length === 0)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){}
            ;
            if(inVisibleDOM && notOnLabel && notInMenu) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            }
            else {
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;
            }
          }
        },

        action: {

          nothing: function() {},

          activate: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            if( module.can.activate( $(element) ) ) {
              module.set.selected(value, $(element));
              if(module.is.multiple() && !module.is.allFiltered()) {
                return;
              }
              else {
                module.hideAndClear();
              }
            }
          },

          select: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            if( module.can.activate( $(element) ) ) {
              module.set.value(value, $(element));
              if(module.is.multiple() && !module.is.allFiltered()) {
                return;
              }
              else {
                module.hideAndClear();
              }
            }
          },

          combo: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            module.set.selected(value, $(element));
            module.hideAndClear();
          },

          hide: function(text, value, element) {
            module.set.value(value, text);
            module.hideAndClear();
          }

        },

        get: {
          id: function() {
            return id;
          },
          defaultText: function() {
            return $module.data(metadata.defaultText);
          },
          defaultValue: function() {
            return $module.data(metadata.defaultValue);
          },
          placeholderText: function() {
            return $module.data(metadata.placeholderText) || '';
          },
          text: function() {
            return $text.text();
          },
          query: function() {
            return $.trim($search.val());
          },
          searchWidth: function(value) {
            value = (value !== undefined)
              ? value
              : $search.val()
            ;
            $sizer.text(value);
            // prevent rounding issues
            return Math.ceil( $sizer.width() + 1);
          },
          selectionCount: function() {
            var
              values = module.get.values(),
              count
            ;
            count = ( module.is.multiple() )
              ? $.isArray(values)
                ? values.length
                : 0
              : (module.get.value() !== '')
                ? 1
                : 0
            ;
            return count;
          },
          transition: function($subMenu) {
            return (settings.transition == 'auto')
              ? module.is.upward($subMenu)
                ? 'slide up'
                : 'slide down'
              : settings.transition
            ;
          },
          userValues: function() {
            var
              values = module.get.values()
            ;
            if(!values) {
              return false;
            }
            values = $.isArray(values)
              ? values
              : [values]
            ;
            return $.grep(values, function(value) {
              return (module.get.item(value) === false);
            });
          },
          uniqueArray: function(array) {
            return $.grep(array, function (value, index) {
                return $.inArray(value, array) === index;
            });
          },
          caretPosition: function() {
            var
              input = $search.get(0),
              range,
              rangeLength
            ;
            if('selectionStart' in input) {
              return input.selectionStart;
            }
            else if (document.selection) {
              input.focus();
              range       = document.selection.createRange();
              rangeLength = range.text.length;
              range.moveStart('character', -input.value.length);
              return range.text.length - rangeLength;
            }
          },
          value: function() {
            var
              value = ($input.length > 0)
                ? $input.val()
                : $module.data(metadata.value),
              isEmptyMultiselect = ($.isArray(value) && value.length === 1 && value[0] === '')
            ;
            // prevents placeholder element from being selected when multiple
            return (value === undefined || isEmptyMultiselect)
              ? ''
              : value
            ;
          },
          values: function() {
            var
              value = module.get.value()
            ;
            if(value === '') {
              return '';
            }
            return ( !module.has.selectInput() && module.is.multiple() )
              ? (typeof value == 'string') // delimited string
                ? value.split(settings.delimiter)
                : ''
              : value
            ;
          },
          remoteValues: function() {
            var
              values = module.get.values(),
              remoteValues = false
            ;
            if(values) {
              if(typeof values == 'string') {
                values = [values];
              }
              $.each(values, function(index, value) {
                var
                  name = module.read.remoteData(value)
                ;
                module.verbose('Restoring value from session data', name, value);
                if(name) {
                  if(!remoteValues) {
                    remoteValues = {};
                  }
                  remoteValues[value] = name;
                }
              });
            }
            return remoteValues;
          },
          choiceText: function($choice, preserveHTML) {
            preserveHTML = (preserveHTML !== undefined)
              ? preserveHTML
              : settings.preserveHTML
            ;
            if($choice) {
              if($choice.find(selector.menu).length > 0) {
                module.verbose('Retrieving text of element with sub-menu');
                $choice = $choice.clone();
                $choice.find(selector.menu).remove();
                $choice.find(selector.menuIcon).remove();
              }
              return ($choice.data(metadata.text) !== undefined)
                ? $choice.data(metadata.text)
                : (preserveHTML)
                  ? $.trim($choice.html())
                  : $.trim($choice.text())
              ;
            }
          },
          choiceValue: function($choice, choiceText) {
            choiceText = choiceText || module.get.choiceText($choice);
            if(!$choice) {
              return false;
            }
            return ($choice.data(metadata.value) !== undefined)
              ? String( $choice.data(metadata.value) )
              : (typeof choiceText === 'string')
                ? $.trim(choiceText.toLowerCase())
                : String(choiceText)
            ;
          },
          inputEvent: function() {
            var
              input = $search[0]
            ;
            if(input) {
              return (input.oninput !== undefined)
                ? 'input'
                : (input.onpropertychange !== undefined)
                  ? 'propertychange'
                  : 'keyup'
              ;
            }
            return false;
          },
          selectValues: function() {
            var
              select = {}
            ;
            select.values = [];
            $module
              .find('option')
                .each(function() {
                  var
                    $option  = $(this),
                    name     = $option.html(),
                    disabled = $option.attr('disabled'),
                    value    = ( $option.attr('value') !== undefined )
                      ? $option.attr('value')
                      : name
                  ;
                  if(settings.placeholder === 'auto' && value === '') {
                    select.placeholder = name;
                  }
                  else {
                    select.values.push({
                      name     : name,
                      value    : value,
                      disabled : disabled
                    });
                  }
                })
            ;
            if(settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;
            }
            if(settings.sortSelect) {
              select.values.sort(function(a, b) {
                return (a.name > b.name)
                  ? 1
                  : -1
                ;
              });
              module.debug('Retrieved and sorted values from select', select);
            }
            else {
              module.debug('Retrieved values from select', select);
            }
            return select;
          },
          activeItem: function() {
            return $item.filter('.'  + className.active);
          },
          selectedItem: function() {
            var
              $selectedItem = $item.not(selector.unselectable).filter('.'  + className.selected)
            ;
            return ($selectedItem.length > 0)
              ? $selectedItem
              : $item.eq(0)
            ;
          },
          itemWithAdditions: function(value) {
            var
              $items       = module.get.item(value),
              $userItems   = module.create.userChoice(value),
              hasUserItems = ($userItems && $userItems.length > 0)
            ;
            if(hasUserItems) {
              $items = ($items.length > 0)
                ? $items.add($userItems)
                : $userItems
              ;
            }
            return $items;
          },
          item: function(value, strict) {
            var
              $selectedItem = false,
              shouldSearch,
              isMultiple
            ;
            value = (value !== undefined)
              ? value
              : ( module.get.values() !== undefined)
                ? module.get.values()
                : module.get.text()
            ;
            shouldSearch = (isMultiple)
              ? (value.length > 0)
              : (value !== undefined && value !== null)
            ;
            isMultiple = (module.is.multiple() && $.isArray(value));
            strict     = (value === '' || value === 0)
              ? true
              : strict || false
            ;
            if(shouldSearch) {
              $item
                .each(function() {
                  var
                    $choice       = $(this),
                    optionText    = module.get.choiceText($choice),
                    optionValue   = module.get.choiceValue($choice, optionText)
                  ;
                  // safe early exit
                  if(optionValue === null || optionValue === undefined) {
                    return;
                  }
                  if(isMultiple) {
                    if($.inArray( String(optionValue), value) !== -1 || $.inArray(optionText, value) !== -1) {
                      $selectedItem = ($selectedItem)
                        ? $selectedItem.add($choice)
                        : $choice
                      ;
                    }
                  }
                  else if(strict) {
                    module.verbose('Ambiguous dropdown value using strict type check', $choice, value);
                    if( optionValue === value || optionText === value) {
                      $selectedItem = $choice;
                      return true;
                    }
                  }
                  else {
                    if( String(optionValue) == String(value) || optionText == value) {
                      module.verbose('Found select item by value', optionValue, value);
                      $selectedItem = $choice;
                      return true;
                    }
                  }
                })
              ;
            }
            return $selectedItem;
          }
        },

        check: {
          maxSelections: function(selectionCount) {
            if(settings.maxSelections) {
              selectionCount = (selectionCount !== undefined)
                ? selectionCount
                : module.get.selectionCount()
              ;
              if(selectionCount >= settings.maxSelections) {
                module.debug('Maximum selection count reached');
                if(settings.useLabels) {
                  $item.addClass(className.filtered);
                  module.add.message(message.maxSelections);
                }
                return true;
              }
              else {
                module.verbose('No longer at maximum selection count');
                module.remove.message();
                module.remove.filteredItem();
                if(module.is.searchSelection()) {
                  module.filterItems();
                }
                return false;
              }
            }
            return true;
          }
        },

        restore: {
          defaults: function() {
            module.clear();
            module.restore.defaultText();
            module.restore.defaultValue();
          },
          defaultText: function() {
            var
              defaultText     = module.get.defaultText(),
              placeholderText = module.get.placeholderText
            ;
            if(defaultText === placeholderText) {
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);
            }
            else {
              module.debug('Restoring default text', defaultText);
              module.set.text(defaultText);
            }
          },
          placeholderText: function() {
            module.set.placeholderText();
          },
          defaultValue: function() {
            var
              defaultValue = module.get.defaultValue()
            ;
            if(defaultValue !== undefined) {
              module.debug('Restoring default value', defaultValue);
              if(defaultValue !== '') {
                module.set.value(defaultValue);
                module.set.selected();
              }
              else {
                module.remove.activeItem();
                module.remove.selectedItem();
              }
            }
          },
          labels: function() {
            if(settings.allowAdditions) {
              if(!settings.useLabels) {
                module.error(error.labels);
                settings.useLabels = true;
              }
              module.debug('Restoring selected values');
              module.create.userLabels();
            }
            module.check.maxSelections();
          },
          selected: function() {
            module.restore.values();
            if(module.is.multiple()) {
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();
            }
            else {
              module.debug('Restoring previously selected values');
            }
          },
          values: function() {
            // prevents callbacks from occurring on initial load
            module.set.initialLoad();
            if(settings.apiSettings && settings.saveRemoteData && module.get.remoteValues()) {
              module.restore.remoteValues();
            }
            else {
              module.set.selected();
            }
            module.remove.initialLoad();
          },
          remoteValues: function() {
            var
              values = module.get.remoteValues()
            ;
            module.debug('Recreating selected from session data', values);
            if(values) {
              if( module.is.single() ) {
                $.each(values, function(value, name) {
                  module.set.text(name);
                });
              }
              else {
                $.each(values, function(value, name) {
                  module.add.label(value, name);
                });
              }
            }
          }
        },

        read: {
          remoteData: function(value) {
            var
              name
            ;
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            name = sessionStorage.getItem(value);
            return (name !== undefined)
              ? name
              : false
            ;
          }
        },

        save: {
          defaults: function() {
            module.save.defaultText();
            module.save.placeholderText();
            module.save.defaultValue();
          },
          defaultValue: function() {
            var
              value = module.get.value()
            ;
            module.verbose('Saving default value as', value);
            $module.data(metadata.defaultValue, value);
          },
          defaultText: function() {
            var
              text = module.get.text()
            ;
            module.verbose('Saving default text as', text);
            $module.data(metadata.defaultText, text);
          },
          placeholderText: function() {
            var
              text
            ;
            if(settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();
              module.verbose('Saving placeholder text as', text);
              $module.data(metadata.placeholderText, text);
            }
          },
          remoteData: function(name, value) {
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }
            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);
          }
        },

        clear: function() {
          if(module.is.multiple() && settings.useLabels) {
            module.remove.labels();
          }
          else {
            module.remove.activeItem();
            module.remove.selectedItem();
          }
          module.set.placeholderText();
          module.clearValue();
        },

        clearValue: function() {
          module.set.value('');
        },

        scrollPage: function(direction, $selectedItem) {
          var
            $currentItem  = $selectedItem || module.get.selectedItem(),
            $menu         = $currentItem.closest(selector.menu),
            menuHeight    = $menu.outerHeight(),
            currentScroll = $menu.scrollTop(),
            itemHeight    = $item.eq(0).outerHeight(),
            itemsPerPage  = Math.floor(menuHeight / itemHeight),
            maxScroll     = $menu.prop('scrollHeight'),
            newScroll     = (direction == 'up')
              ? currentScroll - (itemHeight * itemsPerPage)
              : currentScroll + (itemHeight * itemsPerPage),
            $selectableItem = $item.not(selector.unselectable),
            isWithinRange,
            $nextSelectedItem,
            elementIndex
          ;
          elementIndex      = (direction == 'up')
            ? $selectableItem.index($currentItem) - itemsPerPage
            : $selectableItem.index($currentItem) + itemsPerPage
          ;
          isWithinRange = (direction == 'up')
            ? (elementIndex >= 0)
            : (elementIndex < $selectableItem.length)
          ;
          $nextSelectedItem = (isWithinRange)
            ? $selectableItem.eq(elementIndex)
            : (direction == 'up')
              ? $selectableItem.first()
              : $selectableItem.last()
          ;
          if($nextSelectedItem.length > 0) {
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem
              .removeClass(className.selected)
            ;
            $nextSelectedItem
              .addClass(className.selected)
            ;
            if(settings.selectOnKeydown && module.is.single()) {
              module.set.selectedItem($nextSelectedItem);
            }
            $menu
              .scrollTop(newScroll)
            ;
          }
        },

        set: {
          filtered: function() {
            var
              isMultiple       = module.is.multiple(),
              isSearch         = module.is.searchSelection(),
              isSearchMultiple = (isMultiple && isSearch),
              searchValue      = (isSearch)
                ? module.get.query()
                : '',
              hasSearchValue   = (typeof searchValue === 'string' && searchValue.length > 0),
              searchWidth      = module.get.searchWidth(),
              valueIsSet       = searchValue !== ''
            ;
            if(isMultiple && hasSearchValue) {
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);
            }
            if(hasSearchValue || (isSearchMultiple && valueIsSet)) {
              module.verbose('Hiding placeholder text');
              $text.addClass(className.filtered);
            }
            else if(!isMultiple || (isSearchMultiple && !valueIsSet)) {
              module.verbose('Showing placeholder text');
              $text.removeClass(className.filtered);
            }
          },
          empty: function() {
            $module.addClass(className.empty);
          },
          loading: function() {
            $module.addClass(className.loading);
          },
          placeholderText: function(text) {
            text = text || module.get.placeholderText();
            module.debug('Setting placeholder text', text);
            module.set.text(text);
            $text.addClass(className.placeholder);
          },
          tabbable: function() {
            if( module.is.searchSelection() ) {
              module.debug('Added tabindex to searchable dropdown');
              $search
                .val('')
                .attr('tabindex', 0)
              ;
              $menu
                .attr('tabindex', -1)
              ;
            }
            else {
              module.debug('Added tabindex to dropdown');
              if( $module.attr('tabindex') === undefined) {
                $module
                  .attr('tabindex', 0)
                ;
                $menu
                  .attr('tabindex', -1)
                ;
              }
            }
          },
          initialLoad: function() {
            module.verbose('Setting initial load');
            initialLoad = true;
          },
          activeItem: function($item) {
            if( settings.allowAdditions && $item.filter(selector.addition).length > 0 ) {
              $item.addClass(className.filtered);
            }
            else {
              $item.addClass(className.active);
            }
          },
          partialSearch: function(text) {
            var
              length = module.get.query().length
            ;
            $search.val( text.substr(0 , length));
          },
          scrollPosition: function($item, forceScroll) {
            var
              edgeTolerance = 5,
              $menu,
              hasActive,
              offset,
              itemHeight,
              itemOffset,
              menuOffset,
              menuScroll,
              menuHeight,
              abovePage,
              belowPage
            ;

            $item       = $item || module.get.selectedItem();
            $menu       = $item.closest(selector.menu);
            hasActive   = ($item && $item.length > 0);
            forceScroll = (forceScroll !== undefined)
              ? forceScroll
              : false
            ;
            if($item && $menu.length > 0 && hasActive) {
              itemOffset = $item.position().top;

              $menu.addClass(className.loading);
              menuScroll = $menu.scrollTop();
              menuOffset = $menu.offset().top;
              itemOffset = $item.offset().top;
              offset     = menuScroll - menuOffset + itemOffset;
              if(!forceScroll) {
                menuHeight = $menu.height();
                belowPage  = menuScroll + menuHeight < (offset + edgeTolerance);
                abovePage  = ((offset - edgeTolerance) < menuScroll);
              }
              module.debug('Scrolling to active item', offset);
              if(forceScroll || abovePage || belowPage) {
                $menu.scrollTop(offset);
              }
              $menu.removeClass(className.loading);
            }
          },
          text: function(text) {
            if(settings.action !== 'select') {
              if(settings.action == 'combo') {
                module.debug('Changing combo button text', text, $combo);
                if(settings.preserveHTML) {
                  $combo.html(text);
                }
                else {
                  $combo.text(text);
                }
              }
              else {
                if(text !== module.get.placeholderText()) {
                  $text.removeClass(className.placeholder);
                }
                module.debug('Changing text', text, $text);
                $text
                  .removeClass(className.filtered)
                ;
                if(settings.preserveHTML) {
                  $text.html(text);
                }
                else {
                  $text.text(text);
                }
              }
            }
          },
          selectedItem: function($item) {
            var
              value      = module.get.choiceValue($item),
              searchText = module.get.choiceText($item, false),
              text       = module.get.choiceText($item, true)
            ;
            module.debug('Setting user selection to item', $item);
            module.remove.activeItem();
            module.set.partialSearch(searchText);
            module.set.activeItem($item);
            module.set.selected(value, $item);
            module.set.text(text);
          },
          selectedLetter: function(letter) {
            var
              $selectedItem         = $item.filter('.' + className.selected),
              alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
              $nextValue            = false,
              $nextItem
            ;
            // check next of same letter
            if(alreadySelectedLetter) {
              $nextItem = $selectedItem.nextAll($item).eq(0);
              if( module.has.firstLetter($nextItem, letter) ) {
                $nextValue  = $nextItem;
              }
            }
            // check all values
            if(!$nextValue) {
              $item
                .each(function(){
                  if(module.has.firstLetter($(this), letter)) {
                    $nextValue = $(this);
                    return false;
                  }
                })
              ;
            }
            // set next value
            if($nextValue) {
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);
              $selectedItem.removeClass(className.selected);
              $nextValue.addClass(className.selected);
              if(settings.selectOnKeydown && module.is.single()) {
                module.set.selectedItem($nextValue);
              }
            }
          },
          direction: function($menu) {
            if(settings.direction == 'auto') {
              if(module.is.onScreen($menu)) {
                module.remove.upward($menu);
              }
              else {
                module.set.upward($menu);
              }
            }
            else if(settings.direction == 'upward') {
              module.set.upward($menu);
            }
          },
          upward: function($menu) {
            var $element = $menu || $module;
            $element.addClass(className.upward);
          },
          value: function(value, text, $selected) {
            var
              escapedValue = module.escape.value(value),
              hasInput     = ($input.length > 0),
              isAddition   = !module.has.value(value),
              currentValue = module.get.values(),
              stringValue  = (value !== undefined)
                ? String(value)
                : value,
              newValue
            ;
            if(hasInput) {
              if(!settings.allowReselection && stringValue == currentValue) {
                module.verbose('Skipping value update already same value', value, currentValue);
                if(!module.is.initialLoad()) {
                  return;
                }
              }

              if( module.is.single() && module.has.selectInput() && module.can.extendSelect() ) {
                module.debug('Adding user option', value);
                module.add.optionValue(value);
              }
              module.debug('Updating input value', escapedValue, currentValue);
              internalChange = true;
              $input
                .val(escapedValue)
              ;
              if(settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
              }
              else {
                module.trigger.change();
              }
              internalChange = false;
            }
            else {
              module.verbose('Storing value in metadata', escapedValue, $input);
              if(escapedValue !== currentValue) {
                $module.data(metadata.value, stringValue);
              }
            }
            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
            }
            else {
              settings.onChange.call(element, value, text, $selected);
            }
          },
          active: function() {
            $module
              .addClass(className.active)
            ;
          },
          multiple: function() {
            $module.addClass(className.multiple);
          },
          visible: function() {
            $module.addClass(className.visible);
          },
          exactly: function(value, $selectedItem) {
            module.debug('Setting selected to exact values');
            module.clear();
            module.set.selected(value, $selectedItem);
          },
          selected: function(value, $selectedItem) {
            var
              isMultiple = module.is.multiple(),
              $userSelectedItem
            ;
            $selectedItem = (settings.allowAdditions)
              ? $selectedItem || module.get.itemWithAdditions(value)
              : $selectedItem || module.get.item(value)
            ;
            if(!$selectedItem) {
              return;
            }
            module.debug('Setting selected menu item to', $selectedItem);
            if(module.is.multiple()) {
              module.remove.searchWidth();
            }
            if(module.is.single()) {
              module.remove.activeItem();
              module.remove.selectedItem();
            }
            else if(settings.useLabels) {
              module.remove.selectedItem();
            }
            // select each item
            $selectedItem
              .each(function() {
                var
                  $selected      = $(this),
                  selectedText   = module.get.choiceText($selected),
                  selectedValue  = module.get.choiceValue($selected, selectedText),

                  isFiltered     = $selected.hasClass(className.filtered),
                  isActive       = $selected.hasClass(className.active),
                  isUserValue    = $selected.hasClass(className.addition),
                  shouldAnimate  = (isMultiple && $selectedItem.length == 1)
                ;
                if(isMultiple) {
                  if(!isActive || isUserValue) {
                    if(settings.apiSettings && settings.saveRemoteData) {
                      module.save.remoteData(selectedText, selectedValue);
                    }
                    if(settings.useLabels) {
                      module.add.value(selectedValue, selectedText, $selected);
                      module.add.label(selectedValue, selectedText, shouldAnimate);
                      module.set.activeItem($selected);
                      module.filterActive();
                      module.select.nextAvailable($selectedItem);
                    }
                    else {
                      module.add.value(selectedValue, selectedText, $selected);
                      module.set.text(module.add.variables(message.count));
                      module.set.activeItem($selected);
                    }
                  }
                  else if(!isFiltered) {
                    module.debug('Selected active value, removing label');
                    module.remove.selected(selectedValue);
                  }
                }
                else {
                  if(settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                  }
                  module.set.text(selectedText);
                  module.set.value(selectedValue, selectedText, $selected);
                  $selected
                    .addClass(className.active)
                    .addClass(className.selected)
                  ;
                }
              })
            ;
          }
        },

        add: {
          label: function(value, text, shouldAnimate) {
            var
              $next  = module.is.searchSelection()
                ? $search
                : $text,
              escapedValue = module.escape.value(value),
              $label
            ;
            $label =  $('<a />')
              .addClass(className.label)
              .attr('data-' + metadata.value, escapedValue)
              .html(templates.label(escapedValue, text))
            ;
            $label = settings.onLabelCreate.call($label, escapedValue, text);

            if(module.has.label(value)) {
              module.debug('Label already exists, skipping', escapedValue);
              return;
            }
            if(settings.label.variation) {
              $label.addClass(settings.label.variation);
            }
            if(shouldAnimate === true) {
              module.debug('Animating in label', $label);
              $label
                .addClass(className.hidden)
                .insertBefore($next)
                .transition(settings.label.transition, settings.label.duration)
              ;
            }
            else {
              module.debug('Adding selection label', $label);
              $label
                .insertBefore($next)
              ;
            }
          },
          message: function(message) {
            var
              $message = $menu.children(selector.message),
              html     = settings.templates.message(module.add.variables(message))
            ;
            if($message.length > 0) {
              $message
                .html(html)
              ;
            }
            else {
              $message = $('<div/>')
                .html(html)
                .addClass(className.message)
                .appendTo($menu)
              ;
            }
          },
          optionValue: function(value) {
            var
              escapedValue = module.escape.value(value),
              $option      = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
              hasOption    = ($option.length > 0)
            ;
            if(hasOption) {
              return;
            }
            // temporarily disconnect observer
            module.disconnect.selectObserver();
            if( module.is.single() ) {
              module.verbose('Removing previous user addition');
              $input.find('option.' + className.addition).remove();
            }
            $('<option/>')
              .prop('value', escapedValue)
              .addClass(className.addition)
              .html(value)
              .appendTo($input)
            ;
            module.verbose('Adding user addition as an <option>', value);
            module.observe.select();
          },
          userSuggestion: function(value) {
            var
              $addition         = $menu.children(selector.addition),
              $existingItem     = module.get.item(value),
              alreadyHasValue   = $existingItem && $existingItem.not(selector.addition).length,
              hasUserSuggestion = $addition.length > 0,
              html
            ;
            if(settings.useLabels && module.has.maxSelections()) {
              return;
            }
            if(value === '' || alreadyHasValue) {
              $addition.remove();
              return;
            }
            if(hasUserSuggestion) {
              $addition
                .data(metadata.value, value)
                .data(metadata.text, value)
                .attr('data-' + metadata.value, value)
                .attr('data-' + metadata.text, value)
                .removeClass(className.filtered)
              ;
              if(!settings.hideAdditions) {
                html = settings.templates.addition( module.add.variables(message.addResult, value) );
                $addition
                  .html(html)
                ;
              }
              module.verbose('Replacing user suggestion with new value', $addition);
            }
            else {
              $addition = module.create.userChoice(value);
              $addition
                .prependTo($menu)
              ;
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
            }
            if(!settings.hideAdditions || module.is.allFiltered()) {
              $addition
                .addClass(className.selected)
                .siblings()
                .removeClass(className.selected)
              ;
            }
            module.refreshItems();
          },
          variables: function(message, term) {
            var
              hasCount    = (message.search('{count}') !== -1),
              hasMaxCount = (message.search('{maxCount}') !== -1),
              hasTerm     = (message.search('{term}') !== -1),
              values,
              count,
              query
            ;
            module.verbose('Adding templated variables to message', message);
            if(hasCount) {
              count  = module.get.selectionCount();
              message = message.replace('{count}', count);
            }
            if(hasMaxCount) {
              count  = module.get.selectionCount();
              message = message.replace('{maxCount}', settings.maxSelections);
            }
            if(hasTerm) {
              query   = term || module.get.query();
              message = message.replace('{term}', query);
            }
            return message;
          },
          value: function(addedValue, addedText, $selectedItem) {
            var
              currentValue = module.get.values(),
              newValue
            ;
            if(addedValue === '') {
              module.debug('Cannot select blank values from multiselect');
              return;
            }
            // extend current array
            if($.isArray(currentValue)) {
              newValue = currentValue.concat([addedValue]);
              newValue = module.get.uniqueArray(newValue);
            }
            else {
              newValue = [addedValue];
            }
            // add values
            if( module.has.selectInput() ) {
              if(module.can.extendSelect()) {
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);
              }
            }
            else {
              newValue = newValue.join(settings.delimiter);
              module.debug('Setting hidden input to delimited value', newValue, $input);
            }

            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
            }
            else {
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
            }
            module.set.value(newValue, addedValue, addedText, $selectedItem);
            module.check.maxSelections();
          }
        },

        remove: {
          active: function() {
            $module.removeClass(className.active);
          },
          activeLabel: function() {
            $module.find(selector.label).removeClass(className.active);
          },
          empty: function() {
            $module.removeClass(className.empty);
          },
          loading: function() {
            $module.removeClass(className.loading);
          },
          initialLoad: function() {
            initialLoad = false;
          },
          upward: function($menu) {
            var $element = $menu || $module;
            $element.removeClass(className.upward);
          },
          visible: function() {
            $module.removeClass(className.visible);
          },
          activeItem: function() {
            $item.removeClass(className.active);
          },
          filteredItem: function() {
            if(settings.useLabels && module.has.maxSelections() ) {
              return;
            }
            if(settings.useLabels && module.is.multiple()) {
              $item.not('.' + className.active).removeClass(className.filtered);
            }
            else {
              $item.removeClass(className.filtered);
            }
            module.remove.empty();
          },
          optionValue: function(value) {
            var
              escapedValue = module.escape.value(value),
              $option      = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
              hasOption    = ($option.length > 0)
            ;
            if(!hasOption || !$option.hasClass(className.addition)) {
              return;
            }
            // temporarily disconnect observer
            if(selectObserver) {
              selectObserver.disconnect();
              module.verbose('Temporarily disconnecting mutation observer');
            }
            $option.remove();
            module.verbose('Removing user addition as an <option>', escapedValue);
            if(selectObserver) {
              selectObserver.observe($input[0], {
                childList : true,
                subtree   : true
              });
            }
          },
          message: function() {
            $menu.children(selector.message).remove();
          },
          searchWidth: function() {
            $search.css('width', '');
          },
          searchTerm: function() {
            module.verbose('Cleared search term');
            $search.val('');
            module.set.filtered();
          },
          userAddition: function() {
            $item.filter(selector.addition).remove();
          },
          selected: function(value, $selectedItem) {
            $selectedItem = (settings.allowAdditions)
              ? $selectedItem || module.get.itemWithAdditions(value)
              : $selectedItem || module.get.item(value)
            ;

            if(!$selectedItem) {
              return false;
            }

            $selectedItem
              .each(function() {
                var
                  $selected     = $(this),
                  selectedText  = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText)
                ;
                if(module.is.multiple()) {
                  if(settings.useLabels) {
                    module.remove.value(selectedValue, selectedText, $selected);
                    module.remove.label(selectedValue);
                  }
                  else {
                    module.remove.value(selectedValue, selectedText, $selected);
                    if(module.get.selectionCount() === 0) {
                      module.set.placeholderText();
                    }
                    else {
                      module.set.text(module.add.variables(message.count));
                    }
                  }
                }
                else {
                  module.remove.value(selectedValue, selectedText, $selected);
                }
                $selected
                  .removeClass(className.filtered)
                  .removeClass(className.active)
                ;
                if(settings.useLabels) {
                  $selected.removeClass(className.selected);
                }
              })
            ;
          },
          selectedItem: function() {
            $item.removeClass(className.selected);
          },
          value: function(removedValue, removedText, $removedItem) {
            var
              values = module.get.values(),
              newValue
            ;
            if( module.has.selectInput() ) {
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);
            }
            else {
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);
            }
            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
            }
            else {
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
            }
            module.set.value(newValue, removedText, $removedItem);
            module.check.maxSelections();
          },
          arrayValue: function(removedValue, values) {
            if( !$.isArray(values) ) {
              values = [values];
            }
            values = $.grep(values, function(value){
              return (removedValue != value);
            });
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;
          },
          label: function(value, shouldAnimate) {
            var
              $labels       = $module.find(selector.label),
              $removedLabel = $labels.filter('[data-' + metadata.value + '="' + module.escape.string(value) +'"]')
            ;
            module.verbose('Removing label', $removedLabel);
            $removedLabel.remove();
          },
          activeLabels: function($activeLabels) {
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);
          },
          labels: function($labels) {
            $labels = $labels || $module.find(selector.label);
            module.verbose('Removing labels', $labels);
            $labels
              .each(function(){
                var
                  $label      = $(this),
                  value       = $label.data(metadata.value),
                  stringValue = (value !== undefined)
                    ? String(value)
                    : value,
                  isUserValue = module.is.userValue(stringValue)
                ;
                if(settings.onLabelRemove.call($label, value) === false) {
                  module.debug('Label remove callback cancelled removal');
                  return;
                }
                module.remove.message();
                if(isUserValue) {
                  module.remove.value(stringValue);
                  module.remove.label(stringValue);
                }
                else {
                  // selected will also remove label
                  module.remove.selected(stringValue);
                }
              })
            ;
          },
          tabbable: function() {
            if( module.is.searchSelection() ) {
              module.debug('Searchable dropdown initialized');
              $search
                .removeAttr('tabindex')
              ;
              $menu
                .removeAttr('tabindex')
              ;
            }
            else {
              module.debug('Simple selection dropdown initialized');
              $module
                .removeAttr('tabindex')
              ;
              $menu
                .removeAttr('tabindex')
              ;
            }
          }
        },

        has: {
          menuSearch: function() {
            return (module.has.search() && $search.closest($menu).length > 0);
          },
          search: function() {
            return ($search.length > 0);
          },
          sizer: function() {
            return ($sizer.length > 0);
          },
          selectInput: function() {
            return ( $input.is('select') );
          },
          minCharacters: function(searchTerm) {
            if(settings.minCharacters) {
              searchTerm = (searchTerm !== undefined)
                ? String(searchTerm)
                : String(module.get.query())
              ;
              return (searchTerm.length >= settings.minCharacters);
            }
            return true;
          },
          firstLetter: function($item, letter) {
            var
              text,
              firstLetter
            ;
            if(!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;
            }
            text        = module.get.choiceText($item, false);
            letter      = letter.toLowerCase();
            firstLetter = String(text).charAt(0).toLowerCase();
            return (letter == firstLetter);
          },
          input: function() {
            return ($input.length > 0);
          },
          items: function() {
            return ($item.length > 0);
          },
          menu: function() {
            return ($menu.length > 0);
          },
          message: function() {
            return ($menu.children(selector.message).length !== 0);
          },
          label: function(value) {
            var
              escapedValue = module.escape.value(value),
              $labels      = $module.find(selector.label)
            ;
            return ($labels.filter('[data-' + metadata.value + '="' + module.escape.string(escapedValue) +'"]').length > 0);
          },
          maxSelections: function() {
            return (settings.maxSelections && module.get.selectionCount() >= settings.maxSelections);
          },
          allResultsFiltered: function() {
            var
              $normalResults = $item.not(selector.addition)
            ;
            return ($normalResults.filter(selector.unselectable).length === $normalResults.length);
          },
          userSuggestion: function() {
            return ($menu.children(selector.addition).length > 0);
          },
          query: function() {
            return (module.get.query() !== '');
          },
          value: function(value) {
            var
              values   = module.get.values(),
              hasValue = $.isArray(values)
               ? values && ($.inArray(value, values) !== -1)
               : (values == value)
            ;
            return (hasValue)
              ? true
              : false
            ;
          }
        },

        is: {
          active: function() {
            return $module.hasClass(className.active);
          },
          bubbledLabelClick: function(event) {
            return $(event.target).is('select, input') && $module.closest('label').length > 0;
          },
          bubbledIconClick: function(event) {
            return $(event.target).closest($icon).length > 0;
          },
          alreadySetup: function() {
            return ($module.is('select') && $module.parent(selector.dropdown).length > 0  && $module.prev().length === 0);
          },
          animating: function($subMenu) {
            return ($subMenu)
              ? $subMenu.transition && $subMenu.transition('is animating')
              : $menu.transition    && $menu.transition('is animating')
            ;
          },
          disabled: function() {
            return $module.hasClass(className.disabled);
          },
          focused: function() {
            return (document.activeElement === $module[0]);
          },
          focusedOnSearch: function() {
            return (document.activeElement === $search[0]);
          },
          allFiltered: function() {
            return( (module.is.multiple() || module.has.search()) && !(settings.hideAdditions == false && module.has.userSuggestion()) && !module.has.message() && module.has.allResultsFiltered() );
          },
          hidden: function($subMenu) {
            return !module.is.visible($subMenu);
          },
          initialLoad: function() {
            return initialLoad;
          },
          onScreen: function($subMenu) {
            var
              $currentMenu   = $subMenu || $menu,
              canOpenDownward = true,
              onScreen = {},
              calculations
            ;
            $currentMenu.addClass(className.loading);
            calculations = {
              context: {
                scrollTop : $context.scrollTop(),
                height    : $context.outerHeight()
              },
              menu : {
                offset: $currentMenu.offset(),
                height: $currentMenu.outerHeight()
              }
            };
            if(module.is.verticallyScrollableContext()) {
              calculations.menu.offset.top += calculations.context.scrollTop;
            }
            onScreen = {
              above : (calculations.context.scrollTop) <= calculations.menu.offset.top - calculations.menu.height,
              below : (calculations.context.scrollTop + calculations.context.height) >= calculations.menu.offset.top + calculations.menu.height
            };
            if(onScreen.below) {
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;
            }
            else if(!onScreen.below && !onScreen.above) {
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;
            }
            else {
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;
            }
            $currentMenu.removeClass(className.loading);
            return canOpenDownward;
          },
          inObject: function(needle, object) {
            var
              found = false
            ;
            $.each(object, function(index, property) {
              if(property == needle) {
                found = true;
                return true;
              }
            });
            return found;
          },
          multiple: function() {
            return $module.hasClass(className.multiple);
          },
          remote: function() {
            return settings.apiSettings && module.can.useAPI();
          },
          single: function() {
            return !module.is.multiple();
          },
          selectMutation: function(mutations) {
            var
              selectChanged = false
            ;
            $.each(mutations, function(index, mutation) {
              if(mutation.target && $(mutation.target).is('select')) {
                selectChanged = true;
                return true;
              }
            });
            return selectChanged;
          },
          search: function() {
            return $module.hasClass(className.search);
          },
          searchSelection: function() {
            return ( module.has.search() && $search.parent(selector.dropdown).length === 1 );
          },
          selection: function() {
            return $module.hasClass(className.selection);
          },
          userValue: function(value) {
            return ($.inArray(value, module.get.userValues()) !== -1);
          },
          upward: function($menu) {
            var $element = $menu || $module;
            return $element.hasClass(className.upward);
          },
          visible: function($subMenu) {
            return ($subMenu)
              ? $subMenu.hasClass(className.visible)
              : $menu.hasClass(className.visible)
            ;
          },
          verticallyScrollableContext: function() {
            var
              overflowY = ($context.get(0) !== window)
                ? $context.css('overflow-y')
                : false
            ;
            return (overflowY == 'auto' || overflowY == 'scroll');
          }
        },

        can: {
          activate: function($item) {
            if(settings.useLabels) {
              return true;
            }
            if(!module.has.maxSelections()) {
              return true;
            }
            if(module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;
            }
            return false;
          },
          click: function() {
            return (hasTouch || settings.on == 'click');
          },
          extendSelect: function() {
            return settings.allowAdditions || settings.apiSettings;
          },
          show: function() {
            return !module.is.disabled() && (module.has.items() || module.has.message());
          },
          useAPI: function() {
            return $.fn.api !== undefined;
          }
        },

        animate: {
          show: function(callback, $subMenu) {
            var
              $currentMenu = $subMenu || $menu,
              start = ($subMenu)
                ? function() {}
                : function() {
                  module.hideSubMenus();
                  module.hideOthers();
                  module.set.active();
                },
              transition
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){}
            ;
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);
            transition = module.get.transition($subMenu);
            if( module.is.selection() ) {
              module.set.scrollPosition(module.get.selectedItem(), true);
            }
            if( module.is.hidden($currentMenu) || module.is.animating($currentMenu) ) {
              if(transition == 'none') {
                start();
                $currentMenu.transition('show');
                callback.call(element);
              }
              else if($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu
                  .transition({
                    animation  : transition + ' in',
                    debug      : settings.debug,
                    verbose    : settings.verbose,
                    duration   : settings.duration,
                    queue      : true,
                    onStart    : start,
                    onComplete : function() {
                      callback.call(element);
                    }
                  })
                ;
              }
              else {
                module.error(error.noTransition, transition);
              }
            }
          },
          hide: function(callback, $subMenu) {
            var
              $currentMenu = $subMenu || $menu,
              duration = ($subMenu)
                ? (settings.duration * 0.9)
                : settings.duration,
              start = ($subMenu)
                ? function() {}
                : function() {
                  if( module.can.click() ) {
                    module.unbind.intent();
                  }
                  module.remove.active();
                },
              transition = module.get.transition($subMenu)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){}
            ;
            if( module.is.visible($currentMenu) || module.is.animating($currentMenu) ) {
              module.verbose('Doing menu hide animation', $currentMenu);

              if(transition == 'none') {
                start();
                $currentMenu.transition('hide');
                callback.call(element);
              }
              else if($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu
                  .transition({
                    animation  : transition + ' out',
                    duration   : settings.duration,
                    debug      : settings.debug,
                    verbose    : settings.verbose,
                    queue      : true,
                    onStart    : start,
                    onComplete : function() {
                      if(settings.direction == 'auto') {
                        module.remove.upward($subMenu);
                      }
                      callback.call(element);
                    }
                  })
                ;
              }
              else {
                module.error(error.transition);
              }
            }
          }
        },

        hideAndClear: function() {
          module.remove.searchTerm();
          if( module.has.maxSelections() ) {
            return;
          }
          if(module.has.search()) {
            module.hide(function() {
              module.remove.filteredItem();
            });
          }
          else {
            module.hide();
          }
        },

        delay: {
          show: function() {
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.show, settings.delay.show);
          },
          hide: function() {
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.hide, settings.delay.hide);
          }
        },

        escape: {
          value: function(value) {
            var
              multipleValues = $.isArray(value),
              stringValue    = (typeof value === 'string'),
              isUnparsable   = (!stringValue && !multipleValues),
              hasQuotes      = (stringValue && value.search(regExp.quote) !== -1),
              values         = []
            ;
            if(isUnparsable || !hasQuotes) {
              return value;
            }
            module.debug('Encoding quote values for use in select', value);
            if(multipleValues) {
              $.each(value, function(index, value){
                values.push(value.replace(regExp.quote, '&quot;'));
              });
              return values;
            }
            return value.replace(regExp.quote, '&quot;');
          },
          string: function(text) {
            text =  String(text);
            return text.replace(regExp.escape, '\\$&');
          }
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;
  return (returnedValue !== undefined)
    ? returnedValue
    : $allModules
  ;
};

$.fn.dropdown.settings = {

  silent                 : false,
  debug                  : false,
  verbose                : false,
  performance            : true,

  on                     : 'click',    // what event should show menu action on item selection
  action                 : 'activate', // action on item selection (nothing, activate, select, combo, hide, function(){})


  apiSettings            : false,
  selectOnKeydown        : true,       // Whether selection should occur automatically when keyboard shortcuts used
  minCharacters          : 0,          // Minimum characters required to trigger API call

  filterRemoteData       : false,      // Whether API results should be filtered after being returned for query term
  saveRemoteData         : true,       // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh

  throttle               : 200,        // How long to wait after last user input to search remotely

  context                : window,     // Context to use when determining if on screen
  direction              : 'auto',     // Whether dropdown should always open in one direction
  keepOnScreen           : true,       // Whether dropdown should check whether it is on screen before showing

  match                  : 'both',     // what to match against with search selection (both, text, or label)
  fullTextSearch         : false,      // search anywhere in value (set to 'exact' to require exact matches)

  placeholder            : 'auto',     // whether to convert blank <select> values to placeholder text
  preserveHTML           : true,       // preserve html when selecting value
  sortSelect             : false,      // sort selection on init

  forceSelection         : true,       // force a choice on blur with search selection

  allowAdditions         : false,      // whether multiple select should allow user added values
  hideAdditions          : true,      // whether or not to hide special message prompting a user they can enter a value

  maxSelections          : false,      // When set to a number limits the number of selections to this count
  useLabels              : true,       // whether multiple select should filter currently active selections from choices
  delimiter              : ',',        // when multiselect uses normal <input> the values will be delimited with this character

  showOnFocus            : true,       // show menu on focus
  allowReselection       : false,      // whether current value should trigger callbacks when reselected
  allowTab               : true,       // add tabindex to element
  allowCategorySelection : false,      // allow elements with sub-menus to be selected

  fireOnInit             : false,      // Whether callbacks should fire when initializing dropdown values

  transition             : 'auto',     // auto transition will slide down or up based on direction
  duration               : 200,        // duration of transition

  glyphWidth             : 1.037,      // widest glyph width in em (W is 1.037 em) used to calculate multiselect input width

  // label settings on multi-select
  label: {
    transition : 'scale',
    duration   : 200,
    variation  : false
  },

  // delay before event
  delay : {
    hide   : 300,
    show   : 200,
    search : 20,
    touch  : 50
  },

  /* Callbacks */
  onChange      : function(value, text, $selected){},
  onAdd         : function(value, text, $selected){},
  onRemove      : function(value, text, $selected){},

  onLabelSelect : function($selectedLabels){},
  onLabelCreate : function(value, text) { return $(this); },
  onLabelRemove : function(value) { return true; },
  onNoResults   : function(searchTerm) { return true; },
  onShow        : function(){},
  onHide        : function(){},

  /* Component */
  name           : 'Dropdown',
  namespace      : 'dropdown',

  message: {
    addResult     : 'Add <b>{term}</b>',
    count         : '{count} selected',
    maxSelections : 'Max {maxCount} selections',
    noResults     : 'No results found.',
    serverError   : 'There was an error contacting the server'
  },

  error : {
    action          : 'You called a dropdown action that was not defined',
    alreadySetup    : 'Once a select has been initialized behaviors must be called on the created ui dropdown',
    labels          : 'Allowing user additions currently requires the use of labels.',
    missingMultiple : '<select> requires multiple property to be set to correctly preserve multiple values',
    method          : 'The method you called is not defined.',
    noAPI           : 'The API module is required to load resources remotely',
    noStorage       : 'Saving remote data requires session storage',
    noTransition    : 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>'
  },

  regExp : {
    escape   : /[-[\]{}()*+?.,\\^$|#\s]/g,
    quote    : /"/g
  },

  metadata : {
    defaultText     : 'defaultText',
    defaultValue    : 'defaultValue',
    placeholderText : 'placeholder',
    text            : 'text',
    value           : 'value'
  },

  // property names for remote query
  fields: {
    remoteValues : 'results',  // grouping for api results
    values       : 'values',   // grouping for all dropdown values
    disabled     : 'disabled', // whether value should be disabled
    name         : 'name',     // displayed dropdown text
    value        : 'value',    // actual dropdown value
    text         : 'text'      // displayed text when selected
  },

  keys : {
    backspace  : 8,
    delimiter  : 188, // comma
    deleteKey  : 46,
    enter      : 13,
    escape     : 27,
    pageUp     : 33,
    pageDown   : 34,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40
  },

  selector : {
    addition     : '.addition',
    dropdown     : '.ui.dropdown',
    hidden       : '.hidden',
    icon         : '> .dropdown.icon',
    input        : '> input[type="hidden"], > select',
    item         : '.item',
    label        : '> .label',
    remove       : '> .label > .delete.icon',
    siblingLabel : '.label',
    menu         : '.menu',
    message      : '.message',
    menuIcon     : '.dropdown.icon',
    search       : 'input.search, .menu > .search > input, .menu input.search',
    sizer        : '> input.sizer',
    text         : '> .text:not(.icon)',
    unselectable : '.disabled, .filtered'
  },

  className : {
    active      : 'active',
    addition    : 'addition',
    animating   : 'animating',
    disabled    : 'disabled',
    empty       : 'empty',
    dropdown    : 'ui dropdown',
    filtered    : 'filtered',
    hidden      : 'hidden transition',
    item        : 'item',
    label       : 'ui label',
    loading     : 'loading',
    menu        : 'menu',
    message     : 'message',
    multiple    : 'multiple',
    placeholder : 'default',
    sizer       : 'sizer',
    search      : 'search',
    selected    : 'selected',
    selection   : 'selection',
    upward      : 'upward',
    visible     : 'visible'
  }

};

/* Templates */
$.fn.dropdown.settings.templates = {

  // generates dropdown from select values
  dropdown: function(select) {
    var
      placeholder = select.placeholder || false,
      values      = select.values || {},
      html        = ''
    ;
    html +=  '<i class="dropdown icon"></i>';
    if(select.placeholder) {
      html += '<div class="default text">' + placeholder + '</div>';
    }
    else {
      html += '<div class="text"></div>';
    }
    html += '<div class="menu">';
    $.each(select.values, function(index, option) {
      html += (option.disabled)
        ? '<div class="disabled item" data-value="' + option.value + '">' + option.name + '</div>'
        : '<div class="item" data-value="' + option.value + '">' + option.name + '</div>'
      ;
    });
    html += '</div>';
    return html;
  },

  // generates just menu from select
  menu: function(response, fields) {
    var
      values = response[fields.values] || {},
      html   = ''
    ;
    $.each(values, function(index, option) {
      var
        maybeText = (option[fields.text])
          ? 'data-text="' + option[fields.text] + '"'
          : '',
        maybeDisabled = (option[fields.disabled])
          ? 'disabled '
          : ''
      ;
      html += '<div class="'+ maybeDisabled +'item" data-value="' + option[fields.value] + '"' + maybeText + '>'
      html +=   option[fields.name];
      html += '</div>';
    });
    return html;
  },

  // generates label for multiselect
  label: function(value, text) {
    return text + '<i class="delete icon"></i>';
  },


  // generates messages like "No results"
  message: function(message) {
    return message;
  },

  // generates user addition to selection menu
  addition: function(choice) {
    return choice;
  }

};

})( jQuery, window, document );

},{}],323:[function(require,module,exports){
/*!
 * # Semantic UI - Form Validation
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.form = function(parameters) {
  var
    $allModules      = $(this),
    moduleSelector   = $allModules.selector || '',

    time             = new Date().getTime(),
    performance      = [],

    query            = arguments[0],
    legacyParameters = arguments[1],
    methodInvoked    = (typeof query == 'string'),
    queryArguments   = [].slice.call(arguments, 1),
    returnedValue
  ;
  $allModules
    .each(function() {
      var
        $module     = $(this),
        element     = this,

        formErrors  = [],
        keyHeldDown = false,

        // set at run-time
        $field,
        $group,
        $message,
        $prompt,
        $submit,
        $clear,
        $reset,

        settings,
        validation,

        metadata,
        selector,
        className,
        regExp,
        error,

        namespace,
        moduleNamespace,
        eventNamespace,

        instance,
        module
      ;

      module      = {

        initialize: function() {

          // settings grabbed at run time
          module.get.settings();
          if(methodInvoked) {
            if(instance === undefined) {
              module.instantiate();
            }
            module.invoke(query);
          }
          else {
            if(instance !== undefined) {
              instance.invoke('destroy');
            }
            module.verbose('Initializing form validation', $module, settings);
            module.bindEvents();
            module.set.defaults();
            module.instantiate();
          }
        },

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.verbose('Destroying previous module', instance);
          module.removeEvents();
          $module
            .removeData(moduleNamespace)
          ;
        },

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $field      = $module.find(selector.field);
          $group      = $module.find(selector.group);
          $message    = $module.find(selector.message);
          $prompt     = $module.find(selector.prompt);

          $submit     = $module.find(selector.submit);
          $clear      = $module.find(selector.clear);
          $reset      = $module.find(selector.reset);
        },

        submit: function() {
          module.verbose('Submitting form', $module);
          $module
            .submit()
          ;
        },

        attachEvents: function(selector, action) {
          action = action || 'submit';
          $(selector)
            .on('click' + eventNamespace, function(event) {
              module[action]();
              event.preventDefault();
            })
          ;
        },

        bindEvents: function() {
          module.verbose('Attaching form events');
          $module
            .on('submit' + eventNamespace, module.validate.form)
            .on('blur'   + eventNamespace, selector.field, module.event.field.blur)
            .on('click'  + eventNamespace, selector.submit, module.submit)
            .on('click'  + eventNamespace, selector.reset, module.reset)
            .on('click'  + eventNamespace, selector.clear, module.clear)
          ;
          if(settings.keyboardShortcuts) {
            $module
              .on('keydown' + eventNamespace, selector.field, module.event.field.keydown)
            ;
          }
          $field
            .each(function() {
              var
                $input     = $(this),
                type       = $input.prop('type'),
                inputEvent = module.get.changeEvent(type, $input)
              ;
              $(this)
                .on(inputEvent + eventNamespace, module.event.field.change)
              ;
            })
          ;
        },

        clear: function() {
          $field
            .each(function () {
              var
                $field       = $(this),
                $element     = $field.parent(),
                $fieldGroup  = $field.closest($group),
                $prompt      = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue) || '',
                isCheckbox   = $element.is(selector.uiCheckbox),
                isDropdown   = $element.is(selector.uiDropdown),
                isErrored    = $fieldGroup.hasClass(className.error)
              ;
              if(isErrored) {
                module.verbose('Resetting error on field', $fieldGroup);
                $fieldGroup.removeClass(className.error);
                $prompt.remove();
              }
              if(isDropdown) {
                module.verbose('Resetting dropdown value', $element, defaultValue);
                $element.dropdown('clear');
              }
              else if(isCheckbox) {
                $field.prop('checked', false);
              }
              else {
                module.verbose('Resetting field value', $field, defaultValue);
                $field.val('');
              }
            })
          ;
        },

        reset: function() {
          $field
            .each(function () {
              var
                $field       = $(this),
                $element     = $field.parent(),
                $fieldGroup  = $field.closest($group),
                $prompt      = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue),
                isCheckbox   = $element.is(selector.uiCheckbox),
                isDropdown   = $element.is(selector.uiDropdown),
                isErrored    = $fieldGroup.hasClass(className.error)
              ;
              if(defaultValue === undefined) {
                return;
              }
              if(isErrored) {
                module.verbose('Resetting error on field', $fieldGroup);
                $fieldGroup.removeClass(className.error);
                $prompt.remove();
              }
              if(isDropdown) {
                module.verbose('Resetting dropdown value', $element, defaultValue);
                $element.dropdown('restore defaults');
              }
              else if(isCheckbox) {
                module.verbose('Resetting checkbox value', $element, defaultValue);
                $field.prop('checked', defaultValue);
              }
              else {
                module.verbose('Resetting field value', $field, defaultValue);
                $field.val(defaultValue);
              }
            })
          ;
        },

        determine: {
          isValid: function() {
            var
              allValid = true
            ;
            $.each(validation, function(fieldName, field) {
              if( !( module.validate.field(field, fieldName, true) ) ) {
                allValid = false;
              }
            });
            return allValid;
          }
        },

        is: {
          bracketedRule: function(rule) {
            return (rule.type && rule.type.match(settings.regExp.bracket));
          },
          empty: function($field) {
            if(!$field || $field.length === 0) {
              return true;
            }
            else if($field.is('input[type="checkbox"]')) {
              return !$field.is(':checked');
            }
            else {
              return module.is.blank($field);
            }
          },
          blank: function($field) {
            return $.trim($field.val()) === '';
          },
          valid: function(field) {
            var
              allValid = true
            ;
            if(field) {
              module.verbose('Checking if field is valid', field);
              return module.validate.field(validation[field], field, false);
            }
            else {
              module.verbose('Checking if form is valid');
              $.each(validation, function(fieldName, field) {
                if( !module.is.valid(fieldName) ) {
                  allValid = false;
                }
              });
              return allValid;
            }
          }
        },

        removeEvents: function() {
          $module
            .off(eventNamespace)
          ;
          $field
            .off(eventNamespace)
          ;
          $submit
            .off(eventNamespace)
          ;
          $field
            .off(eventNamespace)
          ;
        },

        event: {
          field: {
            keydown: function(event) {
              var
                $field       = $(this),
                key          = event.which,
                isInput      = $field.is(selector.input),
                isCheckbox   = $field.is(selector.checkbox),
                isInDropdown = ($field.closest(selector.uiDropdown).length > 0),
                keyCode      = {
                  enter  : 13,
                  escape : 27
                }
              ;
              if( key == keyCode.escape) {
                module.verbose('Escape key pressed blurring field');
                $field
                  .blur()
                ;
              }
              if(!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                if(!keyHeldDown) {
                  $field
                    .one('keyup' + eventNamespace, module.event.field.keyup)
                  ;
                  module.submit();
                  module.debug('Enter pressed on input submitting form');
                }
                keyHeldDown = true;
              }
            },
            keyup: function() {
              keyHeldDown = false;
            },
            blur: function(event) {
              var
                $field          = $(this),
                $fieldGroup     = $field.closest($group),
                validationRules = module.get.validation($field)
              ;
              if( $fieldGroup.hasClass(className.error) ) {
                module.debug('Revalidating field', $field, validationRules);
                if(validationRules) {
                  module.validate.field( validationRules );
                }
              }
              else if(settings.on == 'blur' || settings.on == 'change') {
                if(validationRules) {
                  module.validate.field( validationRules );
                }
              }
            },
            change: function(event) {
              var
                $field      = $(this),
                $fieldGroup = $field.closest($group),
                validationRules = module.get.validation($field)
              ;
              if(validationRules && (settings.on == 'change' || ( $fieldGroup.hasClass(className.error) && settings.revalidate) )) {
                clearTimeout(module.timer);
                module.timer = setTimeout(function() {
                  module.debug('Revalidating field', $field,  module.get.validation($field));
                  module.validate.field( validationRules );
                }, settings.delay);
              }
            }
          }

        },

        get: {
          ancillaryValue: function(rule) {
            if(!rule.type || (!rule.value && !module.is.bracketedRule(rule))) {
              return false;
            }
            return (rule.value !== undefined)
              ? rule.value
              : rule.type.match(settings.regExp.bracket)[1] + ''
            ;
          },
          ruleName: function(rule) {
            if( module.is.bracketedRule(rule) ) {
              return rule.type.replace(rule.type.match(settings.regExp.bracket)[0], '');
            }
            return rule.type;
          },
          changeEvent: function(type, $input) {
            if(type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';
            }
            else {
              return module.get.inputEvent();
            }
          },
          inputEvent: function() {
            return (document.createElement('input').oninput !== undefined)
              ? 'input'
              : (document.createElement('input').onpropertychange !== undefined)
                ? 'propertychange'
                : 'keyup'
            ;
          },
          prompt: function(rule, field) {
            var
              ruleName      = module.get.ruleName(rule),
              ancillary     = module.get.ancillaryValue(rule),
              prompt        = rule.prompt || settings.prompt[ruleName] || settings.text.unspecifiedRule,
              requiresValue = (prompt.search('{value}') !== -1),
              requiresName  = (prompt.search('{name}') !== -1),
              $label,
              $field,
              name
            ;
            if(requiresName || requiresValue) {
              $field = module.get.field(field.identifier);
            }
            if(requiresValue) {
              prompt = prompt.replace('{value}', $field.val());
            }
            if(requiresName) {
              $label = $field.closest(selector.group).find('label').eq(0);
              name = ($label.length == 1)
                ? $label.text()
                : $field.prop('placeholder') || settings.text.unspecifiedField
              ;
              prompt = prompt.replace('{name}', name);
            }
            prompt = prompt.replace('{identifier}', field.identifier);
            prompt = prompt.replace('{ruleValue}', ancillary);
            if(!rule.prompt) {
              module.verbose('Using default validation prompt for type', prompt, ruleName);
            }
            return prompt;
          },
          settings: function() {
            if($.isPlainObject(parameters)) {
              var
                keys     = Object.keys(parameters),
                isLegacySettings = (keys.length > 0)
                  ? (parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined)
                  : false,
                ruleKeys
              ;
              if(isLegacySettings) {
                // 1.x (ducktyped)
                settings   = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                module.error(settings.error.oldSyntax, element);
                module.verbose('Extending settings from legacy parameters', validation, settings);
              }
              else {
                // 2.x
                if(parameters.fields) {
                  ruleKeys = Object.keys(parameters.fields);
                  if( typeof parameters.fields[ruleKeys[0]] == 'string' || $.isArray(parameters.fields[ruleKeys[0]]) ) {
                    $.each(parameters.fields, function(name, rules) {
                      if(typeof rules == 'string') {
                        rules = [rules];
                      }
                      parameters.fields[name] = {
                        rules: []
                      };
                      $.each(rules, function(index, rule) {
                        parameters.fields[name].rules.push({ type: rule });
                      });
                    });
                  }
                }

                settings   = $.extend(true, {}, $.fn.form.settings, parameters);
                validation = $.extend({}, $.fn.form.settings.defaults, settings.fields);
                module.verbose('Extending settings', validation, settings);
              }
            }
            else {
              settings   = $.fn.form.settings;
              validation = $.fn.form.settings.defaults;
              module.verbose('Using default form validation', validation, settings);
            }

            // shorthand
            namespace       = settings.namespace;
            metadata        = settings.metadata;
            selector        = settings.selector;
            className       = settings.className;
            regExp          = settings.regExp;
            error           = settings.error;
            moduleNamespace = 'module-' + namespace;
            eventNamespace  = '.' + namespace;

            // grab instance
            instance = $module.data(moduleNamespace);

            // refresh selector cache
            module.refresh();
          },
          field: function(identifier) {
            module.verbose('Finding field with identifier', identifier);
            identifier = module.escape.string(identifier);
            if($field.filter('#' + identifier).length > 0 ) {
              return $field.filter('#' + identifier);
            }
            else if( $field.filter('[name="' + identifier +'"]').length > 0 ) {
              return $field.filter('[name="' + identifier +'"]');
            }
            else if( $field.filter('[name="' + identifier +'[]"]').length > 0 ) {
              return $field.filter('[name="' + identifier +'[]"]');
            }
            else if( $field.filter('[data-' + metadata.validate + '="'+ identifier +'"]').length > 0 ) {
              return $field.filter('[data-' + metadata.validate + '="'+ identifier +'"]');
            }
            return $('<input/>');
          },
          fields: function(fields) {
            var
              $fields = $()
            ;
            $.each(fields, function(index, name) {
              $fields = $fields.add( module.get.field(name) );
            });
            return $fields;
          },
          validation: function($field) {
            var
              fieldValidation,
              identifier
            ;
            if(!validation) {
              return false;
            }
            $.each(validation, function(fieldName, field) {
              identifier = field.identifier || fieldName;
              if( module.get.field(identifier)[0] == $field[0] ) {
                field.identifier = identifier;
                fieldValidation = field;
              }
            });
            return fieldValidation || false;
          },
          value: function (field) {
            var
              fields = [],
              results
            ;
            fields.push(field);
            results = module.get.values.call(element, fields);
            return results[field];
          },
          values: function (fields) {
            var
              $fields = $.isArray(fields)
                ? module.get.fields(fields)
                : $field,
              values = {}
            ;
            $fields.each(function(index, field) {
              var
                $field     = $(field),
                type       = $field.prop('type'),
                name       = $field.prop('name'),
                value      = $field.val(),
                isCheckbox = $field.is(selector.checkbox),
                isRadio    = $field.is(selector.radio),
                isMultiple = (name.indexOf('[]') !== -1),
                isChecked  = (isCheckbox)
                  ? $field.is(':checked')
                  : false
              ;
              if(name) {
                if(isMultiple) {
                  name = name.replace('[]', '');
                  if(!values[name]) {
                    values[name] = [];
                  }
                  if(isCheckbox) {
                    if(isChecked) {
                      values[name].push(value || true);
                    }
                    else {
                      values[name].push(false);
                    }
                  }
                  else {
                    values[name].push(value);
                  }
                }
                else {
                  if(isRadio) {
                    if(isChecked) {
                      values[name] = value;
                    }
                  }
                  else if(isCheckbox) {
                    if(isChecked) {
                      values[name] = value || true;
                    }
                    else {
                      values[name] = false;
                    }
                  }
                  else {
                    values[name] = value;
                  }
                }
              }
            });
            return values;
          }
        },

        has: {

          field: function(identifier) {
            module.verbose('Checking for existence of a field with identifier', identifier);
            identifier = module.escape.string(identifier);
            if(typeof identifier !== 'string') {
              module.error(error.identifier, identifier);
            }
            if($field.filter('#' + identifier).length > 0 ) {
              return true;
            }
            else if( $field.filter('[name="' + identifier +'"]').length > 0 ) {
              return true;
            }
            else if( $field.filter('[data-' + metadata.validate + '="'+ identifier +'"]').length > 0 ) {
              return true;
            }
            return false;
          }

        },

        escape: {
          string: function(text) {
            text =  String(text);
            return text.replace(regExp.escape, '\\$&');
          }
        },

        add: {
          prompt: function(identifier, errors) {
            var
              $field       = module.get.field(identifier),
              $fieldGroup  = $field.closest($group),
              $prompt      = $fieldGroup.children(selector.prompt),
              promptExists = ($prompt.length !== 0)
            ;
            errors = (typeof errors == 'string')
              ? [errors]
              : errors
            ;
            module.verbose('Adding field error state', identifier);
            $fieldGroup
              .addClass(className.error)
            ;
            if(settings.inline) {
              if(!promptExists) {
                $prompt = settings.templates.prompt(errors);
                $prompt
                  .appendTo($fieldGroup)
                ;
              }
              $prompt
                .html(errors[0])
              ;
              if(!promptExists) {
                if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', settings.transition);
                  $prompt.transition(settings.transition + ' in', settings.duration);
                }
                else {
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt
                    .fadeIn(settings.duration)
                  ;
                }
              }
              else {
                module.verbose('Inline errors are disabled, no inline error added', identifier);
              }
            }
          },
          errors: function(errors) {
            module.debug('Adding form error messages', errors);
            module.set.error();
            $message
              .html( settings.templates.error(errors) )
            ;
          }
        },

        remove: {
          prompt: function(identifier) {
            var
              $field      = module.get.field(identifier),
              $fieldGroup = $field.closest($group),
              $prompt     = $fieldGroup.children(selector.prompt)
            ;
            $fieldGroup
              .removeClass(className.error)
            ;
            if(settings.inline && $prompt.is(':visible')) {
              module.verbose('Removing prompt for field', identifier);
              if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                $prompt.transition(settings.transition + ' out', settings.duration, function() {
                  $prompt.remove();
                });
              }
              else {
                $prompt
                  .fadeOut(settings.duration, function(){
                    $prompt.remove();
                  })
                ;
              }
            }
          }
        },

        set: {
          success: function() {
            $module
              .removeClass(className.error)
              .addClass(className.success)
            ;
          },
          defaults: function () {
            $field
              .each(function () {
                var
                  $field     = $(this),
                  isCheckbox = ($field.filter(selector.checkbox).length > 0),
                  value      = (isCheckbox)
                    ? $field.is(':checked')
                    : $field.val()
                ;
                $field.data(metadata.defaultValue, value);
              })
            ;
          },
          error: function() {
            $module
              .removeClass(className.success)
              .addClass(className.error)
            ;
          },
          value: function (field, value) {
            var
              fields = {}
            ;
            fields[field] = value;
            return module.set.values.call(element, fields);
          },
          values: function (fields) {
            if($.isEmptyObject(fields)) {
              return;
            }
            $.each(fields, function(key, value) {
              var
                $field      = module.get.field(key),
                $element    = $field.parent(),
                isMultiple  = $.isArray(value),
                isCheckbox  = $element.is(selector.uiCheckbox),
                isDropdown  = $element.is(selector.uiDropdown),
                isRadio     = ($field.is(selector.radio) && isCheckbox),
                fieldExists = ($field.length > 0),
                $multipleField
              ;
              if(fieldExists) {
                if(isMultiple && isCheckbox) {
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');
                  $.each(value, function(index, value) {
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element       = $multipleField.parent();
                    if($multipleField.length > 0) {
                      $element.checkbox('check');
                    }
                  });
                }
                else if(isRadio) {
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]')
                    .parent(selector.uiCheckbox)
                      .checkbox('check')
                  ;
                }
                else if(isCheckbox) {
                  module.verbose('Setting checkbox value', value, $element);
                  if(value === true) {
                    $element.checkbox('check');
                  }
                  else {
                    $element.checkbox('uncheck');
                  }
                }
                else if(isDropdown) {
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);
                }
                else {
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);
                }
              }
            });
          }
        },

        validate: {

          form: function(event, ignoreCallbacks) {
            var
              values = module.get.values(),
              apiRequest
            ;

            // input keydown event will fire submit repeatedly by browser default
            if(keyHeldDown) {
              return false;
            }

            // reset errors
            formErrors = [];
            if( module.determine.isValid() ) {
              module.debug('Form has no validation errors, submitting');
              module.set.success();
              if(ignoreCallbacks !== true) {
                return settings.onSuccess.call(element, event, values);
              }
            }
            else {
              module.debug('Form has errors');
              module.set.error();
              if(!settings.inline) {
                module.add.errors(formErrors);
              }
              // prevent ajax submit
              if($module.data('moduleApi') !== undefined) {
                event.stopImmediatePropagation();
              }
              if(ignoreCallbacks !== true) {
                return settings.onFailure.call(element, formErrors, values);
              }
            }
          },

          // takes a validation object and returns whether field passes validation
          field: function(field, fieldName, showErrors) {
            showErrors = (showErrors !== undefined)
              ? showErrors
              : true
            ;
            if(typeof field == 'string') {
              module.verbose('Validating field', field);
              fieldName = field;
              field = validation[field];
            }
            var
              identifier    = field.identifier || fieldName,
              $field        = module.get.field(identifier),
              $dependsField = (field.depends)
                ? module.get.field(field.depends)
                : false,
              fieldValid  = true,
              fieldErrors = []
            ;
            if(!field.identifier) {
              module.debug('Using field name as identifier', identifier);
              field.identifier = identifier;
            }
            if($field.prop('disabled')) {
              module.debug('Field is disabled. Skipping', identifier);
              fieldValid = true;
            }
            else if(field.optional && module.is.blank($field)){
              module.debug('Field is optional and blank. Skipping', identifier);
              fieldValid = true;
            }
            else if(field.depends && module.is.empty($dependsField)) {
              module.debug('Field depends on another value that is not present or empty. Skipping', $dependsField);
              fieldValid = true;
            }
            else if(field.rules !== undefined) {
              $.each(field.rules, function(index, rule) {
                if( module.has.field(identifier) && !( module.validate.rule(field, rule) ) ) {
                  module.debug('Field is invalid', identifier, rule.type);
                  fieldErrors.push(module.get.prompt(rule, field));
                  fieldValid = false;
                }
              });
            }
            if(fieldValid) {
              if(showErrors) {
                module.remove.prompt(identifier, fieldErrors);
                settings.onValid.call($field);
              }
            }
            else {
              if(showErrors) {
                formErrors = formErrors.concat(fieldErrors);
                module.add.prompt(identifier, fieldErrors);
                settings.onInvalid.call($field, fieldErrors);
              }
              return false;
            }
            return true;
          },

          // takes validation rule and returns whether field passes rule
          rule: function(field, rule) {
            var
              $field       = module.get.field(field.identifier),
              type         = rule.type,
              value        = $field.val(),
              isValid      = true,
              ancillary    = module.get.ancillaryValue(rule),
              ruleName     = module.get.ruleName(rule),
              ruleFunction = settings.rules[ruleName]
            ;
            if( !$.isFunction(ruleFunction) ) {
              module.error(error.noRule, ruleName);
              return;
            }
            // cast to string avoiding encoding special values
            value = (value === undefined || value === '' || value === null)
              ? ''
              : $.trim(value + '')
            ;
            return ruleFunction.call($field, value, ancillary);
          }
        },

        setting: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            settings[name] = value;
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }
          if( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };
      module.initialize();
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.form.settings = {

  name              : 'Form',
  namespace         : 'form',

  debug             : false,
  verbose           : false,
  performance       : true,

  fields            : false,

  keyboardShortcuts : true,
  on                : 'submit',
  inline            : false,

  delay             : 200,
  revalidate        : true,

  transition        : 'scale',
  duration          : 200,

  onValid           : function() {},
  onInvalid         : function() {},
  onSuccess         : function() { return true; },
  onFailure         : function() { return false; },

  metadata : {
    defaultValue : 'default',
    validate     : 'validate'
  },

  regExp: {
    htmlID  : /^[a-zA-Z][\w:.-]*$/g,
    bracket : /\[(.*)\]/i,
    decimal : /^\d+\.?\d*$/,
    email   : /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    escape  : /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    flags   : /^\/(.*)\/(.*)?/,
    integer : /^\-?\d+$/,
    number  : /^\-?\d*(\.\d+)?$/,
    url     : /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
  },

  text: {
    unspecifiedRule  : 'Please enter a valid value',
    unspecifiedField : 'This field'
  },

  prompt: {
    empty                : '{name} must have a value',
    checked              : '{name} must be checked',
    email                : '{name} must be a valid e-mail',
    url                  : '{name} must be a valid url',
    regExp               : '{name} is not formatted correctly',
    integer              : '{name} must be an integer',
    decimal              : '{name} must be a decimal number',
    number               : '{name} must be set to a number',
    is                   : '{name} must be "{ruleValue}"',
    isExactly            : '{name} must be exactly "{ruleValue}"',
    not                  : '{name} cannot be set to "{ruleValue}"',
    notExactly           : '{name} cannot be set to exactly "{ruleValue}"',
    contain              : '{name} cannot contain "{ruleValue}"',
    containExactly       : '{name} cannot contain exactly "{ruleValue}"',
    doesntContain        : '{name} must contain  "{ruleValue}"',
    doesntContainExactly : '{name} must contain exactly "{ruleValue}"',
    minLength            : '{name} must be at least {ruleValue} characters',
    length               : '{name} must be at least {ruleValue} characters',
    exactLength          : '{name} must be exactly {ruleValue} characters',
    maxLength            : '{name} cannot be longer than {ruleValue} characters',
    match                : '{name} must match {ruleValue} field',
    different            : '{name} must have a different value than {ruleValue} field',
    creditCard           : '{name} must be a valid credit card number',
    minCount             : '{name} must have at least {ruleValue} choices',
    exactCount           : '{name} must have exactly {ruleValue} choices',
    maxCount             : '{name} must have {ruleValue} or less choices'
  },

  selector : {
    checkbox   : 'input[type="checkbox"], input[type="radio"]',
    clear      : '.clear',
    field      : 'input, textarea, select',
    group      : '.field',
    input      : 'input',
    message    : '.error.message',
    prompt     : '.prompt.label',
    radio      : 'input[type="radio"]',
    reset      : '.reset:not([type="reset"])',
    submit     : '.submit:not([type="submit"])',
    uiCheckbox : '.ui.checkbox',
    uiDropdown : '.ui.dropdown'
  },

  className : {
    error   : 'error',
    label   : 'ui prompt label',
    pressed : 'down',
    success : 'success'
  },

  error: {
    identifier : 'You must specify a string identifier for each field',
    method     : 'The method you called is not defined.',
    noRule     : 'There is no rule matching the one you specified',
    oldSyntax  : 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
  },

  templates: {

    // template that produces error message
    error: function(errors) {
      var
        html = '<ul class="list">'
      ;
      $.each(errors, function(index, value) {
        html += '<li>' + value + '</li>';
      });
      html += '</ul>';
      return $(html);
    },

    // template that produces label
    prompt: function(errors) {
      return $('<div/>')
        .addClass('ui basic red pointing prompt label')
        .html(errors[0])
      ;
    }
  },

  rules: {

    // is not empty or blank string
    empty: function(value) {
      return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
    },

    // checkbox checked
    checked: function() {
      return ($(this).filter(':checked').length > 0);
    },

    // is most likely an email
    email: function(value){
      return $.fn.form.settings.regExp.email.test(value);
    },

    // value is most likely url
    url: function(value) {
      return $.fn.form.settings.regExp.url.test(value);
    },

    // matches specified regExp
    regExp: function(value, regExp) {
      if(regExp instanceof RegExp) {
        return value.match(regExp);
      }
      var
        regExpParts = regExp.match($.fn.form.settings.regExp.flags),
        flags
      ;
      // regular expression specified as /baz/gi (flags)
      if(regExpParts) {
        regExp = (regExpParts.length >= 2)
          ? regExpParts[1]
          : regExp
        ;
        flags = (regExpParts.length >= 3)
          ? regExpParts[2]
          : ''
        ;
      }
      return value.match( new RegExp(regExp, flags) );
    },

    // is valid integer or matches range
    integer: function(value, range) {
      var
        intRegExp = $.fn.form.settings.regExp.integer,
        min,
        max,
        parts
      ;
      if( !range || ['', '..'].indexOf(range) !== -1) {
        // do nothing
      }
      else if(range.indexOf('..') == -1) {
        if(intRegExp.test(range)) {
          min = max = range - 0;
        }
      }
      else {
        parts = range.split('..', 2);
        if(intRegExp.test(parts[0])) {
          min = parts[0] - 0;
        }
        if(intRegExp.test(parts[1])) {
          max = parts[1] - 0;
        }
      }
      return (
        intRegExp.test(value) &&
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
    },

    // is valid number (with decimal)
    decimal: function(value) {
      return $.fn.form.settings.regExp.decimal.test(value);
    },

    // is valid number
    number: function(value) {
      return $.fn.form.settings.regExp.number.test(value);
    },

    // is value (case insensitive)
    is: function(value, text) {
      text = (typeof text == 'string')
        ? text.toLowerCase()
        : text
      ;
      value = (typeof value == 'string')
        ? value.toLowerCase()
        : value
      ;
      return (value == text);
    },

    // is value
    isExactly: function(value, text) {
      return (value == text);
    },

    // value is not another value (case insensitive)
    not: function(value, notValue) {
      value = (typeof value == 'string')
        ? value.toLowerCase()
        : value
      ;
      notValue = (typeof notValue == 'string')
        ? notValue.toLowerCase()
        : notValue
      ;
      return (value != notValue);
    },

    // value is not another value (case sensitive)
    notExactly: function(value, notValue) {
      return (value != notValue);
    },

    // value contains text (insensitive)
    contains: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text, 'i') ) !== -1);
    },

    // value contains text (case sensitive)
    containsExactly: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text) ) !== -1);
    },

    // value contains text (insensitive)
    doesntContain: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text, 'i') ) === -1);
    },

    // value contains text (case sensitive)
    doesntContainExactly: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text) ) === -1);
    },

    // is at least string length
    minLength: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length >= requiredLength)
        : false
      ;
    },

    // see rls notes for 2.0.6 (this is a duplicate of minLength)
    length: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length >= requiredLength)
        : false
      ;
    },

    // is exactly length
    exactLength: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length == requiredLength)
        : false
      ;
    },

    // is less than length
    maxLength: function(value, maxLength) {
      return (value !== undefined)
        ? (value.length <= maxLength)
        : false
      ;
    },

    // matches another field
    match: function(value, identifier) {
      var
        $form = $(this),
        matchingValue
      ;
      if( $('[data-validate="'+ identifier +'"]').length > 0 ) {
        matchingValue = $('[data-validate="'+ identifier +'"]').val();
      }
      else if($('#' + identifier).length > 0) {
        matchingValue = $('#' + identifier).val();
      }
      else if($('[name="' + identifier +'"]').length > 0) {
        matchingValue = $('[name="' + identifier + '"]').val();
      }
      else if( $('[name="' + identifier +'[]"]').length > 0 ) {
        matchingValue = $('[name="' + identifier +'[]"]');
      }
      return (matchingValue !== undefined)
        ? ( value.toString() == matchingValue.toString() )
        : false
      ;
    },

    // different than another field
    different: function(value, identifier) {
      // use either id or name of field
      var
        $form = $(this),
        matchingValue
      ;
      if( $('[data-validate="'+ identifier +'"]').length > 0 ) {
        matchingValue = $('[data-validate="'+ identifier +'"]').val();
      }
      else if($('#' + identifier).length > 0) {
        matchingValue = $('#' + identifier).val();
      }
      else if($('[name="' + identifier +'"]').length > 0) {
        matchingValue = $('[name="' + identifier + '"]').val();
      }
      else if( $('[name="' + identifier +'[]"]').length > 0 ) {
        matchingValue = $('[name="' + identifier +'[]"]');
      }
      return (matchingValue !== undefined)
        ? ( value.toString() !== matchingValue.toString() )
        : false
      ;
    },

    creditCard: function(cardNumber, cardTypes) {
      var
        cards = {
          visa: {
            pattern : /^4/,
            length  : [16]
          },
          amex: {
            pattern : /^3[47]/,
            length  : [15]
          },
          mastercard: {
            pattern : /^5[1-5]/,
            length  : [16]
          },
          discover: {
            pattern : /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length  : [16]
          },
          unionPay: {
            pattern : /^(62|88)/,
            length  : [16, 17, 18, 19]
          },
          jcb: {
            pattern : /^35(2[89]|[3-8][0-9])/,
            length  : [16]
          },
          maestro: {
            pattern : /^(5018|5020|5038|6304|6759|676[1-3])/,
            length  : [12, 13, 14, 15, 16, 17, 18, 19]
          },
          dinersClub: {
            pattern : /^(30[0-5]|^36)/,
            length  : [14]
          },
          laser: {
            pattern : /^(6304|670[69]|6771)/,
            length  : [16, 17, 18, 19]
          },
          visaElectron: {
            pattern : /^(4026|417500|4508|4844|491(3|7))/,
            length  : [16]
          }
        },
        valid         = {},
        validCard     = false,
        requiredTypes = (typeof cardTypes == 'string')
          ? cardTypes.split(',')
          : false,
        unionPay,
        validation
      ;

      if(typeof cardNumber !== 'string' || cardNumber.length === 0) {
        return;
      }

      // allow dashes in card
      cardNumber = cardNumber.replace(/[\-]/g, '');

      // verify card types
      if(requiredTypes) {
        $.each(requiredTypes, function(index, type){
          // verify each card type
          validation = cards[type];
          if(validation) {
            valid = {
              length  : ($.inArray(cardNumber.length, validation.length) !== -1),
              pattern : (cardNumber.search(validation.pattern) !== -1)
            };
            if(valid.length && valid.pattern) {
              validCard = true;
            }
          }
        });

        if(!validCard) {
          return false;
        }
      }

      // skip luhn for UnionPay
      unionPay = {
        number  : ($.inArray(cardNumber.length, cards.unionPay.length) !== -1),
        pattern : (cardNumber.search(cards.unionPay.pattern) !== -1)
      };
      if(unionPay.number && unionPay.pattern) {
        return true;
      }

      // verify luhn, adapted from  <https://gist.github.com/2134376>
      var
        length        = cardNumber.length,
        multiple      = 0,
        producedValue = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
        ],
        sum           = 0
      ;
      while (length--) {
        sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
        multiple ^= 1;
      }
      return (sum % 10 === 0 && sum > 0);
    },

    minCount: function(value, minCount) {
      if(minCount == 0) {
        return true;
      }
      if(minCount == 1) {
        return (value !== '');
      }
      return (value.split(',').length >= minCount);
    },

    exactCount: function(value, exactCount) {
      if(exactCount == 0) {
        return (value === '');
      }
      if(exactCount == 1) {
        return (value !== '' && value.search(',') === -1);
      }
      return (value.split(',').length == exactCount);
    },

    maxCount: function(value, maxCount) {
      if(maxCount == 0) {
        return false;
      }
      if(maxCount == 1) {
        return (value.search(',') === -1);
      }
      return (value.split(',').length <= maxCount);
    }
  }

};

})( jQuery, window, document );

},{}],324:[function(require,module,exports){
/*!
 * # Semantic UI - Search
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.search = function(parameters) {
  var
    $allModules     = $(this),
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),
    returnedValue
  ;
  $(this)
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.search.settings, parameters)
          : $.extend({}, $.fn.search.settings),

        className        = settings.className,
        metadata         = settings.metadata,
        regExp           = settings.regExp,
        fields           = settings.fields,
        selector         = settings.selector,
        error            = settings.error,
        namespace        = settings.namespace,

        eventNamespace   = '.' + namespace,
        moduleNamespace  = namespace + '-module',

        $module          = $(this),
        $prompt          = $module.find(selector.prompt),
        $searchButton    = $module.find(selector.searchButton),
        $results         = $module.find(selector.results),
        $result          = $module.find(selector.result),
        $category        = $module.find(selector.category),

        element          = this,
        instance         = $module.data(moduleNamespace),

        disabledBubbled  = false,
        resultsDismissed = false,

        module
      ;

      module = {

        initialize: function() {
          module.verbose('Initializing module');
          module.determine.searchFields();
          module.bind.events();
          module.set.type();
          module.create.results();
          module.instantiate();
        },
        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },
        destroy: function() {
          module.verbose('Destroying instance');
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
        },

        refresh: function() {
          module.debug('Refreshing selector cache');
          $prompt         = $module.find(selector.prompt);
          $searchButton   = $module.find(selector.searchButton);
          $category       = $module.find(selector.category);
          $results        = $module.find(selector.results);
          $result         = $module.find(selector.result);
        },

        refreshResults: function() {
          $results = $module.find(selector.results);
          $result  = $module.find(selector.result);
        },

        bind: {
          events: function() {
            module.verbose('Binding events to search');
            if(settings.automatic) {
              $module
                .on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input)
              ;
              $prompt
                .attr('autocomplete', 'off')
              ;
            }
            $module
              // prompt
              .on('focus'     + eventNamespace, selector.prompt, module.event.focus)
              .on('blur'      + eventNamespace, selector.prompt, module.event.blur)
              .on('keydown'   + eventNamespace, selector.prompt, module.handleKeyboard)
              // search button
              .on('click'     + eventNamespace, selector.searchButton, module.query)
              // results
              .on('mousedown' + eventNamespace, selector.results, module.event.result.mousedown)
              .on('mouseup'   + eventNamespace, selector.results, module.event.result.mouseup)
              .on('click'     + eventNamespace, selector.result,  module.event.result.click)
            ;
          }
        },

        determine: {
          searchFields: function() {
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
            if(parameters && parameters.searchFields !== undefined) {
              settings.searchFields = parameters.searchFields;
            }
          }
        },

        event: {
          input: function() {
            clearTimeout(module.timer);
            module.timer = setTimeout(module.query, settings.searchDelay);
          },
          focus: function() {
            module.set.focus();
            if(settings.searchOnFocus && module.has.minimumCharacters() ) {
              module.query(function() {
                if(module.can.show() ) {
                  module.showResults();
                }
              });
            }
          },
          blur: function(event) {
            var
              pageLostFocus = (document.activeElement === this),
              callback      = function() {
                module.cancel.query();
                module.remove.focus();
                module.timer = setTimeout(module.hideResults, settings.hideDelay);
              }
            ;
            if(pageLostFocus) {
              return;
            }
            resultsDismissed = false;
            if(module.resultsClicked) {
              module.debug('Determining if user action caused search to close');
              $module
                .one('click.close' + eventNamespace, selector.results, function(event) {
                  if(module.is.inMessage(event) || disabledBubbled) {
                    $prompt.focus();
                    return;
                  }
                  disabledBubbled = false;
                  if( !module.is.animating() && !module.is.hidden()) {
                    callback();
                  }
                })
              ;
            }
            else {
              module.debug('Input blurred without user action, closing results');
              callback();
            }
          },
          result: {
            mousedown: function() {
              module.resultsClicked = true;
            },
            mouseup: function() {
              module.resultsClicked = false;
            },
            click: function(event) {
              module.debug('Search result selected');
              var
                $result = $(this),
                $title  = $result.find(selector.title).eq(0),
                $link   = $result.is('a[href]')
                  ? $result
                  : $result.find('a[href]').eq(0),
                href    = $link.attr('href')   || false,
                target  = $link.attr('target') || false,
                title   = $title.html(),
                // title is used for result lookup
                value   = ($title.length > 0)
                  ? $title.text()
                  : false,
                results = module.get.results(),
                result  = $result.data(metadata.result) || module.get.result(value, results),
                returnedValue
              ;
              if( $.isFunction(settings.onSelect) ) {
                if(settings.onSelect.call(element, result, results) === false) {
                  module.debug('Custom onSelect callback cancelled default select action');
                  disabledBubbled = true;
                  return;
                }
              }
              module.hideResults();
              if(value) {
                module.set.value(value);
              }
              if(href) {
                module.verbose('Opening search link found in result', $link);
                if(target == '_blank' || event.ctrlKey) {
                  window.open(href);
                }
                else {
                  window.location.href = (href);
                }
              }
            }
          }
        },
        handleKeyboard: function(event) {
          var
            // force selector refresh
            $result         = $module.find(selector.result),
            $category       = $module.find(selector.category),
            $activeResult   = $result.filter('.' + className.active),
            currentIndex    = $result.index( $activeResult ),
            resultSize      = $result.length,
            hasActiveResult = $activeResult.length > 0,

            keyCode         = event.which,
            keys            = {
              backspace : 8,
              enter     : 13,
              escape    : 27,
              upArrow   : 38,
              downArrow : 40
            },
            newIndex
          ;
          // search shortcuts
          if(keyCode == keys.escape) {
            module.verbose('Escape key pressed, blurring search field');
            module.hideResults();
            resultsDismissed = true;
          }
          if( module.is.visible() ) {
            if(keyCode == keys.enter) {
              module.verbose('Enter key pressed, selecting active result');
              if( $result.filter('.' + className.active).length > 0 ) {
                module.event.result.click.call($result.filter('.' + className.active), event);
                event.preventDefault();
                return false;
              }
            }
            else if(keyCode == keys.upArrow && hasActiveResult) {
              module.verbose('Up key pressed, changing active result');
              newIndex = (currentIndex - 1 < 0)
                ? currentIndex
                : currentIndex - 1
              ;
              $category
                .removeClass(className.active)
              ;
              $result
                .removeClass(className.active)
                .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                    .addClass(className.active)
              ;
              event.preventDefault();
            }
            else if(keyCode == keys.downArrow) {
              module.verbose('Down key pressed, changing active result');
              newIndex = (currentIndex + 1 >= resultSize)
                ? currentIndex
                : currentIndex + 1
              ;
              $category
                .removeClass(className.active)
              ;
              $result
                .removeClass(className.active)
                .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                    .addClass(className.active)
              ;
              event.preventDefault();
            }
          }
          else {
            // query shortcuts
            if(keyCode == keys.enter) {
              module.verbose('Enter key pressed, executing query');
              module.query();
              module.set.buttonPressed();
              $prompt.one('keyup', module.remove.buttonFocus);
            }
          }
        },

        setup: {
          api: function(searchTerm, callback) {
            var
              apiSettings = {
                debug             : settings.debug,
                on                : false,
                cache             : true,
                action            : 'search',
                urlData           : {
                  query : searchTerm
                },
                onSuccess         : function(response) {
                  module.parse.response.call(element, response, searchTerm);
                  callback();
                },
                onFailure         : function() {
                  module.displayMessage(error.serverError);
                  callback();
                },
                onAbort : function(response) {
                },
                onError           : module.error
              },
              searchHTML
            ;
            $.extend(true, apiSettings, settings.apiSettings);
            module.verbose('Setting up API request', apiSettings);
            $module.api(apiSettings);
          }
        },

        can: {
          useAPI: function() {
            return $.fn.api !== undefined;
          },
          show: function() {
            return module.is.focused() && !module.is.visible() && !module.is.empty();
          },
          transition: function() {
            return settings.transition && $.fn.transition !== undefined && $module.transition('is supported');
          }
        },

        is: {
          animating: function() {
            return $results.hasClass(className.animating);
          },
          hidden: function() {
            return $results.hasClass(className.hidden);
          },
          inMessage: function(event) {
            if(!event.target) {
              return;
            }
            var
              $target = $(event.target),
              isInDOM = $.contains(document.documentElement, event.target)
            ;
            return (isInDOM && $target.closest(selector.message).length > 0);
          },
          empty: function() {
            return ($results.html() === '');
          },
          visible: function() {
            return ($results.filter(':visible').length > 0);
          },
          focused: function() {
            return ($prompt.filter(':focus').length > 0);
          }
        },

        get: {
          inputEvent: function() {
            var
              prompt = $prompt[0],
              inputEvent   = (prompt !== undefined && prompt.oninput !== undefined)
                ? 'input'
                : (prompt !== undefined && prompt.onpropertychange !== undefined)
                  ? 'propertychange'
                  : 'keyup'
            ;
            return inputEvent;
          },
          value: function() {
            return $prompt.val();
          },
          results: function() {
            var
              results = $module.data(metadata.results)
            ;
            return results;
          },
          result: function(value, results) {
            var
              lookupFields = ['title', 'id'],
              result       = false
            ;
            value = (value !== undefined)
              ? value
              : module.get.value()
            ;
            results = (results !== undefined)
              ? results
              : module.get.results()
            ;
            if(settings.type === 'category') {
              module.debug('Finding result that matches', value);
              $.each(results, function(index, category) {
                if($.isArray(category.results)) {
                  result = module.search.object(value, category.results, lookupFields)[0];
                  // don't continue searching if a result is found
                  if(result) {
                    return false;
                  }
                }
              });
            }
            else {
              module.debug('Finding result in results object', value);
              result = module.search.object(value, results, lookupFields)[0];
            }
            return result || false;
          },
        },

        select: {
          firstResult: function() {
            module.verbose('Selecting first result');
            $result.first().addClass(className.active);
          }
        },

        set: {
          focus: function() {
            $module.addClass(className.focus);
          },
          loading: function() {
            $module.addClass(className.loading);
          },
          value: function(value) {
            module.verbose('Setting search input value', value);
            $prompt
              .val(value)
            ;
          },
          type: function(type) {
            type = type || settings.type;
            if(settings.type == 'category') {
              $module.addClass(settings.type);
            }
          },
          buttonPressed: function() {
            $searchButton.addClass(className.pressed);
          }
        },

        remove: {
          loading: function() {
            $module.removeClass(className.loading);
          },
          focus: function() {
            $module.removeClass(className.focus);
          },
          buttonPressed: function() {
            $searchButton.removeClass(className.pressed);
          }
        },

        query: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          var
            searchTerm = module.get.value(),
            cache = module.read.cache(searchTerm)
          ;
          callback = callback || function() {};
          if( module.has.minimumCharacters() )  {
            if(cache) {
              module.debug('Reading result from cache', searchTerm);
              module.save.results(cache.results);
              module.addResults(cache.html);
              module.inject.id(cache.results);
              callback();
            }
            else {
              module.debug('Querying for', searchTerm);
              if($.isPlainObject(settings.source) || $.isArray(settings.source)) {
                module.search.local(searchTerm);
                callback();
              }
              else if( module.can.useAPI() ) {
                module.search.remote(searchTerm, callback);
              }
              else {
                module.error(error.source);
                callback();
              }
            }
            settings.onSearchQuery.call(element, searchTerm);
          }
          else {
            module.hideResults();
          }
        },

        search: {
          local: function(searchTerm) {
            var
              results = module.search.object(searchTerm, settings.content),
              searchHTML
            ;
            module.set.loading();
            module.save.results(results);
            module.debug('Returned local search results', results);

            searchHTML = module.generateResults({
              results: results
            });
            module.remove.loading();
            module.addResults(searchHTML);
            module.inject.id(results);
            module.write.cache(searchTerm, {
              html    : searchHTML,
              results : results
            });
          },
          remote: function(searchTerm, callback) {
            callback = $.isFunction(callback)
              ? callback
              : function(){}
            ;
            if($module.api('is loading')) {
              $module.api('abort');
            }
            module.setup.api(searchTerm, callback);
            $module
              .api('query')
            ;
          },
          object: function(searchTerm, source, searchFields) {
            var
              results      = [],
              fuzzyResults = [],
              searchExp    = searchTerm.toString().replace(regExp.escape, '\\$&'),
              matchRegExp  = new RegExp(regExp.beginsWith + searchExp, 'i'),

              // avoid duplicates when pushing results
              addResult = function(array, result) {
                var
                  notResult      = ($.inArray(result, results) == -1),
                  notFuzzyResult = ($.inArray(result, fuzzyResults) == -1)
                ;
                if(notResult && notFuzzyResult) {
                  array.push(result);
                }
              }
            ;
            source = source || settings.source;
            searchFields = (searchFields !== undefined)
              ? searchFields
              : settings.searchFields
            ;

            // search fields should be array to loop correctly
            if(!$.isArray(searchFields)) {
              searchFields = [searchFields];
            }

            // exit conditions if no source
            if(source === undefined || source === false) {
              module.error(error.source);
              return [];
            }

            // iterate through search fields looking for matches
            $.each(searchFields, function(index, field) {
              $.each(source, function(label, content) {
                var
                  fieldExists = (typeof content[field] == 'string')
                ;
                if(fieldExists) {
                  if( content[field].search(matchRegExp) !== -1) {
                    // content starts with value (first in results)
                    addResult(results, content);
                  }
                  else if(settings.searchFullText && module.fuzzySearch(searchTerm, content[field]) ) {
                    // content fuzzy matches (last in results)
                    addResult(fuzzyResults, content);
                  }
                }
              });
            });
            return $.merge(results, fuzzyResults);
          }
        },

        fuzzySearch: function(query, term) {
          var
            termLength  = term.length,
            queryLength = query.length
          ;
          if(typeof query !== 'string') {
            return false;
          }
          query = query.toLowerCase();
          term  = term.toLowerCase();
          if(queryLength > termLength) {
            return false;
          }
          if(queryLength === termLength) {
            return (query === term);
          }
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var
              queryCharacter = query.charCodeAt(characterIndex)
            ;
            while(nextCharacterIndex < termLength) {
              if(term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
              }
            }
            return false;
          }
          return true;
        },

        parse: {
          response: function(response, searchTerm) {
            var
              searchHTML = module.generateResults(response)
            ;
            module.verbose('Parsing server response', response);
            if(response !== undefined) {
              if(searchTerm !== undefined && response[fields.results] !== undefined) {
                module.addResults(searchHTML);
                module.inject.id(response[fields.results]);
                module.write.cache(searchTerm, {
                  html    : searchHTML,
                  results : response[fields.results]
                });
                module.save.results(response[fields.results]);
              }
            }
          }
        },

        cancel: {
          query: function() {
            if( module.can.useAPI() ) {
              $module.api('abort');
            }
          }
        },

        has: {
          minimumCharacters: function() {
            var
              searchTerm    = module.get.value(),
              numCharacters = searchTerm.length
            ;
            return (numCharacters >= settings.minCharacters);
          },
          results: function() {
            if($results.length === 0) {
              return false;
            }
            var
              html = $results.html()
            ;
            return html != '';
          }
        },

        clear: {
          cache: function(value) {
            var
              cache = $module.data(metadata.cache)
            ;
            if(!value) {
              module.debug('Clearing cache', value);
              $module.removeData(metadata.cache);
            }
            else if(value && cache && cache[value]) {
              module.debug('Removing value from cache', value);
              delete cache[value];
              $module.data(metadata.cache, cache);
            }
          }
        },

        read: {
          cache: function(name) {
            var
              cache = $module.data(metadata.cache)
            ;
            if(settings.cache) {
              module.verbose('Checking cache for generated html for query', name);
              return (typeof cache == 'object') && (cache[name] !== undefined)
                ? cache[name]
                : false
              ;
            }
            return false;
          }
        },

        create: {
          id: function(resultIndex, categoryIndex) {
            var
              resultID      = (resultIndex + 1), // not zero indexed
              categoryID    = (categoryIndex + 1),
              firstCharCode,
              letterID,
              id
            ;
            if(categoryIndex !== undefined) {
              // start char code for "A"
              letterID = String.fromCharCode(97 + categoryIndex);
              id          = letterID + resultID;
              module.verbose('Creating category result id', id);
            }
            else {
              id = resultID;
              module.verbose('Creating result id', id);
            }
            return id;
          },
          results: function() {
            if($results.length === 0) {
              $results = $('<div />')
                .addClass(className.results)
                .appendTo($module)
              ;
            }
          }
        },

        inject: {
          result: function(result, resultIndex, categoryIndex) {
            module.verbose('Injecting result into results');
            var
              $selectedResult = (categoryIndex !== undefined)
                ? $results
                    .children().eq(categoryIndex)
                      .children(selector.result).eq(resultIndex)
                : $results
                    .children(selector.result).eq(resultIndex)
            ;
            module.verbose('Injecting results metadata', $selectedResult);
            $selectedResult
              .data(metadata.result, result)
            ;
          },
          id: function(results) {
            module.debug('Injecting unique ids into results');
            var
              // since results may be object, we must use counters
              categoryIndex = 0,
              resultIndex   = 0
            ;
            if(settings.type === 'category') {
              // iterate through each category result
              $.each(results, function(index, category) {
                resultIndex = 0;
                $.each(category.results, function(index, value) {
                  var
                    result = category.results[index]
                  ;
                  if(result.id === undefined) {
                    result.id = module.create.id(resultIndex, categoryIndex);
                  }
                  module.inject.result(result, resultIndex, categoryIndex);
                  resultIndex++;
                });
                categoryIndex++;
              });
            }
            else {
              // top level
              $.each(results, function(index, value) {
                var
                  result = results[index]
                ;
                if(result.id === undefined) {
                  result.id = module.create.id(resultIndex);
                }
                module.inject.result(result, resultIndex);
                resultIndex++;
              });
            }
            return results;
          }
        },

        save: {
          results: function(results) {
            module.verbose('Saving current search results to metadata', results);
            $module.data(metadata.results, results);
          }
        },

        write: {
          cache: function(name, value) {
            var
              cache = ($module.data(metadata.cache) !== undefined)
                ? $module.data(metadata.cache)
                : {}
            ;
            if(settings.cache) {
              module.verbose('Writing generated html to cache', name, value);
              cache[name] = value;
              $module
                .data(metadata.cache, cache)
              ;
            }
          }
        },

        addResults: function(html) {
          if( $.isFunction(settings.onResultsAdd) ) {
            if( settings.onResultsAdd.call($results, html) === false ) {
              module.debug('onResultsAdd callback cancelled default action');
              return false;
            }
          }
          if(html) {
            $results
              .html(html)
            ;
            module.refreshResults();
            if(settings.selectFirstResult) {
              module.select.firstResult();
            }
            module.showResults();
          }
          else {
            module.hideResults(function() {
              $results.empty();
            });
          }
        },

        showResults: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if(resultsDismissed) {
            return;
          }
          if(!module.is.visible() && module.has.results()) {
            if( module.can.transition() ) {
              module.debug('Showing results with css animations');
              $results
                .transition({
                  animation  : settings.transition + ' in',
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.duration,
                  onComplete : function() {
                    callback();
                  },
                  queue      : true
                })
              ;
            }
            else {
              module.debug('Showing results with javascript');
              $results
                .stop()
                .fadeIn(settings.duration, settings.easing)
              ;
            }
            settings.onResultsOpen.call($results);
          }
        },
        hideResults: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){}
          ;
          if( module.is.visible() ) {
            if( module.can.transition() ) {
              module.debug('Hiding results with css animations');
              $results
                .transition({
                  animation  : settings.transition + ' out',
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.duration,
                  onComplete : function() {
                    callback();
                  },
                  queue      : true
                })
              ;
            }
            else {
              module.debug('Hiding results with javascript');
              $results
                .stop()
                .fadeOut(settings.duration, settings.easing)
              ;
            }
            settings.onResultsClose.call($results);
          }
        },

        generateResults: function(response) {
          module.debug('Generating html from response', response);
          var
            template       = settings.templates[settings.type],
            isProperObject = ($.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results])),
            isProperArray  = ($.isArray(response[fields.results]) && response[fields.results].length > 0),
            html           = ''
          ;
          if(isProperObject || isProperArray ) {
            if(settings.maxResults > 0) {
              if(isProperObject) {
                if(settings.type == 'standard') {
                  module.error(error.maxResults);
                }
              }
              else {
                response[fields.results] = response[fields.results].slice(0, settings.maxResults);
              }
            }
            if($.isFunction(template)) {
              html = template(response, fields);
            }
            else {
              module.error(error.noTemplate, false);
            }
          }
          else if(settings.showNoResults) {
            html = module.displayMessage(error.noResults, 'empty');
          }
          settings.onResults.call(element, response);
          return html;
        },

        displayMessage: function(text, type) {
          type = type || 'standard';
          module.debug('Displaying message', text, type);
          module.addResults( settings.templates.message(text, type) );
          return settings.templates.message(text, type);
        },

        setting: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            settings[name] = value;
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }
          if( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };
      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }

    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.search.settings = {

  name              : 'Search',
  namespace         : 'search',

  silent            : false,
  debug             : false,
  verbose           : false,
  performance       : true,

  // template to use (specified in settings.templates)
  type              : 'standard',

  // minimum characters required to search
  minCharacters     : 1,

  // whether to select first result after searching automatically
  selectFirstResult : false,

  // API config
  apiSettings       : false,

  // object to search
  source            : false,

  // Whether search should query current term on focus
  searchOnFocus     : true,

  // fields to search
  searchFields   : [
    'title',
    'description'
  ],

  // field to display in standard results template
  displayField   : '',

  // whether to include fuzzy results in local search
  searchFullText : true,

  // whether to add events to prompt automatically
  automatic      : true,

  // delay before hiding menu after blur
  hideDelay      : 0,

  // delay before searching
  searchDelay    : 200,

  // maximum results returned from local
  maxResults     : 7,

  // whether to store lookups in local cache
  cache          : true,

  // whether no results errors should be shown
  showNoResults  : true,

  // transition settings
  transition     : 'scale',
  duration       : 200,
  easing         : 'easeOutExpo',

  // callbacks
  onSelect       : false,
  onResultsAdd   : false,

  onSearchQuery  : function(query){},
  onResults      : function(response){},

  onResultsOpen  : function(){},
  onResultsClose : function(){},

  className: {
    animating : 'animating',
    active    : 'active',
    empty     : 'empty',
    focus     : 'focus',
    hidden    : 'hidden',
    loading   : 'loading',
    results   : 'results',
    pressed   : 'down'
  },

  error : {
    source      : 'Cannot search. No source used, and Semantic API module was not included',
    noResults   : 'Your search returned no results',
    logging     : 'Error in debug logging, exiting.',
    noEndpoint  : 'No search endpoint was specified',
    noTemplate  : 'A valid template name was not specified.',
    serverError : 'There was an issue querying the server.',
    maxResults  : 'Results must be an array to use maxResults setting',
    method      : 'The method you called is not defined.'
  },

  metadata: {
    cache   : 'cache',
    results : 'results',
    result  : 'result'
  },

  regExp: {
    escape     : /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    beginsWith : '(?:\s|^)'
  },

  // maps api response attributes to internal representation
  fields: {
    categories      : 'results',     // array of categories (category view)
    categoryName    : 'name',        // name of category (category view)
    categoryResults : 'results',     // array of results (category view)
    description     : 'description', // result description
    image           : 'image',       // result image
    price           : 'price',       // result price
    results         : 'results',     // array of results (standard)
    title           : 'title',       // result title
    url             : 'url',         // result url
    action          : 'action',      // "view more" object name
    actionText      : 'text',        // "view more" text
    actionURL       : 'url'          // "view more" url
  },

  selector : {
    prompt       : '.prompt',
    searchButton : '.search.button',
    results      : '.results',
    message      : '.results > .message',
    category     : '.category',
    result       : '.result',
    title        : '.title, .name'
  },

  templates: {
    escape: function(string) {
      var
        badChars     = /[&<>"'`]/g,
        shouldEscape = /[&<>"'`]/,
        escape       = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        },
        escapedChar  = function(chr) {
          return escape[chr];
        }
      ;
      if(shouldEscape.test(string)) {
        return string.replace(badChars, escapedChar);
      }
      return string;
    },
    message: function(message, type) {
      var
        html = ''
      ;
      if(message !== undefined && type !== undefined) {
        html +=  ''
          + '<div class="message ' + type + '">'
        ;
        // message type
        if(type == 'empty') {
          html += ''
            + '<div class="header">No Results</div class="header">'
            + '<div class="description">' + message + '</div class="description">'
          ;
        }
        else {
          html += ' <div class="description">' + message + '</div>';
        }
        html += '</div>';
      }
      return html;
    },
    category: function(response, fields) {
      var
        html = '',
        escape = $.fn.search.settings.templates.escape
      ;
      if(response[fields.categoryResults] !== undefined) {

        // each category
        $.each(response[fields.categoryResults], function(index, category) {
          if(category[fields.results] !== undefined && category.results.length > 0) {

            html  += '<div class="category">';

            if(category[fields.categoryName] !== undefined) {
              html += '<div class="name">' + category[fields.categoryName] + '</div>';
            }

            // each item inside category
            $.each(category.results, function(index, result) {
              if(result[fields.url]) {
                html  += '<a class="result" href="' + result[fields.url] + '">';
              }
              else {
                html  += '<a class="result">';
              }
              if(result[fields.image] !== undefined) {
                html += ''
                  + '<div class="image">'
                  + ' <img src="' + result[fields.image] + '">'
                  + '</div>'
                ;
              }
              html += '<div class="content">';
              if(result[fields.price] !== undefined) {
                html += '<div class="price">' + result[fields.price] + '</div>';
              }
              if(result[fields.title] !== undefined) {
                html += '<div class="title">' + result[fields.title] + '</div>';
              }
              if(result[fields.description] !== undefined) {
                html += '<div class="description">' + result[fields.description] + '</div>';
              }
              html  += ''
                + '</div>'
              ;
              html += '</a>';
            });
            html  += ''
              + '</div>'
            ;
          }
        });
        if(response[fields.action]) {
          html += ''
          + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">'
          +   response[fields.action][fields.actionText]
          + '</a>';
        }
        return html;
      }
      return false;
    },
    standard: function(response, fields) {
      var
        html = ''
      ;
      if(response[fields.results] !== undefined) {

        // each result
        $.each(response[fields.results], function(index, result) {
          if(result[fields.url]) {
            html  += '<a class="result" href="' + result[fields.url] + '">';
          }
          else {
            html  += '<a class="result">';
          }
          if(result[fields.image] !== undefined) {
            html += ''
              + '<div class="image">'
              + ' <img src="' + result[fields.image] + '">'
              + '</div>'
            ;
          }
          html += '<div class="content">';
          if(result[fields.price] !== undefined) {
            html += '<div class="price">' + result[fields.price] + '</div>';
          }
          if(result[fields.title] !== undefined) {
            html += '<div class="title">' + result[fields.title] + '</div>';
          }
          if(result[fields.description] !== undefined) {
            html += '<div class="description">' + result[fields.description] + '</div>';
          }
          html  += ''
            + '</div>'
          ;
          html += '</a>';
        });

        if(response[fields.action]) {
          html += ''
          + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">'
          +   response[fields.action][fields.actionText]
          + '</a>';
        }
        return html;
      }
      return false;
    }
  }
};

})( jQuery, window, document );

},{}],325:[function(require,module,exports){
/*!
 * # Semantic UI - Site
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

$.site = $.fn.site = function(parameters) {
  var
    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

    settings        = ( $.isPlainObject(parameters) )
      ? $.extend(true, {}, $.site.settings, parameters)
      : $.extend({}, $.site.settings),

    namespace       = settings.namespace,
    error           = settings.error,

    eventNamespace  = '.' + namespace,
    moduleNamespace = 'module-' + namespace,

    $document       = $(document),
    $module         = $document,
    element         = this,
    instance        = $module.data(moduleNamespace),

    module,
    returnedValue
  ;
  module = {

    initialize: function() {
      module.instantiate();
    },

    instantiate: function() {
      module.verbose('Storing instance of site', module);
      instance = module;
      $module
        .data(moduleNamespace, module)
      ;
    },

    normalize: function() {
      module.fix.console();
      module.fix.requestAnimationFrame();
    },

    fix: {
      console: function() {
        module.debug('Normalizing window.console');
        if (console === undefined || console.log === undefined) {
          module.verbose('Console not available, normalizing events');
          module.disable.console();
        }
        if (typeof console.group == 'undefined' || typeof console.groupEnd == 'undefined' || typeof console.groupCollapsed == 'undefined') {
          module.verbose('Console group not available, normalizing events');
          window.console.group = function() {};
          window.console.groupEnd = function() {};
          window.console.groupCollapsed = function() {};
        }
        if (typeof console.markTimeline == 'undefined') {
          module.verbose('Mark timeline not available, normalizing events');
          window.console.markTimeline = function() {};
        }
      },
      consoleClear: function() {
        module.debug('Disabling programmatic console clearing');
        window.console.clear = function() {};
      },
      requestAnimationFrame: function() {
        module.debug('Normalizing requestAnimationFrame');
        if(window.requestAnimationFrame === undefined) {
          module.debug('RequestAnimationFrame not available, normalizing event');
          window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) { setTimeout(callback, 0); }
          ;
        }
      }
    },

    moduleExists: function(name) {
      return ($.fn[name] !== undefined && $.fn[name].settings !== undefined);
    },

    enabled: {
      modules: function(modules) {
        var
          enabledModules = []
        ;
        modules = modules || settings.modules;
        $.each(modules, function(index, name) {
          if(module.moduleExists(name)) {
            enabledModules.push(name);
          }
        });
        return enabledModules;
      }
    },

    disabled: {
      modules: function(modules) {
        var
          disabledModules = []
        ;
        modules = modules || settings.modules;
        $.each(modules, function(index, name) {
          if(!module.moduleExists(name)) {
            disabledModules.push(name);
          }
        });
        return disabledModules;
      }
    },

    change: {
      setting: function(setting, value, modules, modifyExisting) {
        modules = (typeof modules === 'string')
          ? (modules === 'all')
            ? settings.modules
            : [modules]
          : modules || settings.modules
        ;
        modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
        $.each(modules, function(index, name) {
          var
            namespace = (module.moduleExists(name))
              ? $.fn[name].settings.namespace || false
              : true,
            $existingModules
          ;
          if(module.moduleExists(name)) {
            module.verbose('Changing default setting', setting, value, name);
            $.fn[name].settings[setting] = value;
            if(modifyExisting && namespace) {
              $existingModules = $(':data(module-' + namespace + ')');
              if($existingModules.length > 0) {
                module.verbose('Modifying existing settings', $existingModules);
                $existingModules[name]('setting', setting, value);
              }
            }
          }
        });
      },
      settings: function(newSettings, modules, modifyExisting) {
        modules = (typeof modules === 'string')
          ? [modules]
          : modules || settings.modules
        ;
        modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
        $.each(modules, function(index, name) {
          var
            $existingModules
          ;
          if(module.moduleExists(name)) {
            module.verbose('Changing default setting', newSettings, name);
            $.extend(true, $.fn[name].settings, newSettings);
            if(modifyExisting && namespace) {
              $existingModules = $(':data(module-' + namespace + ')');
              if($existingModules.length > 0) {
                module.verbose('Modifying existing settings', $existingModules);
                $existingModules[name]('setting', newSettings);
              }
            }
          }
        });
      }
    },

    enable: {
      console: function() {
        module.console(true);
      },
      debug: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Enabling debug for modules', modules);
        module.change.setting('debug', true, modules, modifyExisting);
      },
      verbose: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Enabling verbose debug for modules', modules);
        module.change.setting('verbose', true, modules, modifyExisting);
      }
    },
    disable: {
      console: function() {
        module.console(false);
      },
      debug: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Disabling debug for modules', modules);
        module.change.setting('debug', false, modules, modifyExisting);
      },
      verbose: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Disabling verbose debug for modules', modules);
        module.change.setting('verbose', false, modules, modifyExisting);
      }
    },

    console: function(enable) {
      if(enable) {
        if(instance.cache.console === undefined) {
          module.error(error.console);
          return;
        }
        module.debug('Restoring console function');
        window.console = instance.cache.console;
      }
      else {
        module.debug('Disabling console function');
        instance.cache.console = window.console;
        window.console = {
          clear          : function(){},
          error          : function(){},
          group          : function(){},
          groupCollapsed : function(){},
          groupEnd       : function(){},
          info           : function(){},
          log            : function(){},
          markTimeline   : function(){},
          warn           : function(){}
        };
      }
    },

    destroy: function() {
      module.verbose('Destroying previous site for', $module);
      $module
        .removeData(moduleNamespace)
      ;
    },

    cache: {},

    setting: function(name, value) {
      if( $.isPlainObject(name) ) {
        $.extend(true, settings, name);
      }
      else if(value !== undefined) {
        settings[name] = value;
      }
      else {
        return settings[name];
      }
    },
    internal: function(name, value) {
      if( $.isPlainObject(name) ) {
        $.extend(true, module, name);
      }
      else if(value !== undefined) {
        module[name] = value;
      }
      else {
        return module[name];
      }
    },
    debug: function() {
      if(settings.debug) {
        if(settings.performance) {
          module.performance.log(arguments);
        }
        else {
          module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
          module.debug.apply(console, arguments);
        }
      }
    },
    verbose: function() {
      if(settings.verbose && settings.debug) {
        if(settings.performance) {
          module.performance.log(arguments);
        }
        else {
          module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
          module.verbose.apply(console, arguments);
        }
      }
    },
    error: function() {
      module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
      module.error.apply(console, arguments);
    },
    performance: {
      log: function(message) {
        var
          currentTime,
          executionTime,
          previousTime
        ;
        if(settings.performance) {
          currentTime   = new Date().getTime();
          previousTime  = time || currentTime;
          executionTime = currentTime - previousTime;
          time          = currentTime;
          performance.push({
            'Element'        : element,
            'Name'           : message[0],
            'Arguments'      : [].slice.call(message, 1) || '',
            'Execution Time' : executionTime
          });
        }
        clearTimeout(module.performance.timer);
        module.performance.timer = setTimeout(module.performance.display, 500);
      },
      display: function() {
        var
          title = settings.name + ':',
          totalTime = 0
        ;
        time = false;
        clearTimeout(module.performance.timer);
        $.each(performance, function(index, data) {
          totalTime += data['Execution Time'];
        });
        title += ' ' + totalTime + 'ms';
        if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
          console.groupCollapsed(title);
          if(console.table) {
            console.table(performance);
          }
          else {
            $.each(performance, function(index, data) {
              console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
            });
          }
          console.groupEnd();
        }
        performance = [];
      }
    },
    invoke: function(query, passedArguments, context) {
      var
        object = instance,
        maxDepth,
        found,
        response
      ;
      passedArguments = passedArguments || queryArguments;
      context         = element         || context;
      if(typeof query == 'string' && object !== undefined) {
        query    = query.split(/[\. ]/);
        maxDepth = query.length - 1;
        $.each(query, function(depth, value) {
          var camelCaseValue = (depth != maxDepth)
            ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
            : query
          ;
          if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
            object = object[camelCaseValue];
          }
          else if( object[camelCaseValue] !== undefined ) {
            found = object[camelCaseValue];
            return false;
          }
          else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
            object = object[value];
          }
          else if( object[value] !== undefined ) {
            found = object[value];
            return false;
          }
          else {
            module.error(error.method, query);
            return false;
          }
        });
      }
      if ( $.isFunction( found ) ) {
        response = found.apply(context, passedArguments);
      }
      else if(found !== undefined) {
        response = found;
      }
      if($.isArray(returnedValue)) {
        returnedValue.push(response);
      }
      else if(returnedValue !== undefined) {
        returnedValue = [returnedValue, response];
      }
      else if(response !== undefined) {
        returnedValue = response;
      }
      return found;
    }
  };

  if(methodInvoked) {
    if(instance === undefined) {
      module.initialize();
    }
    module.invoke(query);
  }
  else {
    if(instance !== undefined) {
      module.destroy();
    }
    module.initialize();
  }
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.site.settings = {

  name        : 'Site',
  namespace   : 'site',

  error : {
    console : 'Console cannot be restored, most likely it was overwritten outside of module',
    method : 'The method you called is not defined.'
  },

  debug       : false,
  verbose     : false,
  performance : true,

  modules: [
    'accordion',
    'api',
    'checkbox',
    'dimmer',
    'dropdown',
    'embed',
    'form',
    'modal',
    'nag',
    'popup',
    'rating',
    'shape',
    'sidebar',
    'state',
    'sticky',
    'tab',
    'transition',
    'visit',
    'visibility'
  ],

  siteNamespace   : 'site',
  namespaceStub   : {
    cache     : {},
    config    : {},
    sections  : {},
    section   : {},
    utilities : {}
  }

};

// allows for selection of elements with data attributes
$.extend($.expr[ ":" ], {
  data: ($.expr.createPseudo)
    ? $.expr.createPseudo(function(dataName) {
        return function(elem) {
          return !!$.data(elem, dataName);
        };
      })
    : function(elem, i, match) {
      // support: jQuery < 1.8
      return !!$.data(elem, match[ 3 ]);
    }
});


})( jQuery, window, document );

},{}],326:[function(require,module,exports){
/*!
 * # Semantic UI - State
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.state = function(parameters) {
  var
    $allModules     = $(this),

    moduleSelector  = $allModules.selector || '',

    hasTouch        = ('ontouchstart' in document.documentElement),
    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),

    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.state.settings, parameters)
          : $.extend({}, $.fn.state.settings),

        error           = settings.error,
        metadata        = settings.metadata,
        className       = settings.className,
        namespace       = settings.namespace,
        states          = settings.states,
        text            = settings.text,

        eventNamespace  = '.' + namespace,
        moduleNamespace = namespace + '-module',

        $module         = $(this),

        element         = this,
        instance        = $module.data(moduleNamespace),

        module
      ;
      module = {

        initialize: function() {
          module.verbose('Initializing module');

          // allow module to guess desired state based on element
          if(settings.automatic) {
            module.add.defaults();
          }

          // bind events with delegated events
          if(settings.context && moduleSelector !== '') {
            $(settings.context)
              .on(moduleSelector, 'mouseenter' + eventNamespace, module.change.text)
              .on(moduleSelector, 'mouseleave' + eventNamespace, module.reset.text)
              .on(moduleSelector, 'click'      + eventNamespace, module.toggle.state)
            ;
          }
          else {
            $module
              .on('mouseenter' + eventNamespace, module.change.text)
              .on('mouseleave' + eventNamespace, module.reset.text)
              .on('click'      + eventNamespace, module.toggle.state)
            ;
          }
          module.instantiate();
        },

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.verbose('Destroying previous module', instance);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
        },

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $module = $(element);
        },

        add: {
          defaults: function() {
            var
              userStates = parameters && $.isPlainObject(parameters.states)
                ? parameters.states
                : {}
            ;
            $.each(settings.defaults, function(type, typeStates) {
              if( module.is[type] !== undefined && module.is[type]() ) {
                module.verbose('Adding default states', type, element);
                $.extend(settings.states, typeStates, userStates);
              }
            });
          }
        },

        is: {

          active: function() {
            return $module.hasClass(className.active);
          },
          loading: function() {
            return $module.hasClass(className.loading);
          },
          inactive: function() {
            return !( $module.hasClass(className.active) );
          },
          state: function(state) {
            if(className[state] === undefined) {
              return false;
            }
            return $module.hasClass( className[state] );
          },

          enabled: function() {
            return !( $module.is(settings.filter.active) );
          },
          disabled: function() {
            return ( $module.is(settings.filter.active) );
          },
          textEnabled: function() {
            return !( $module.is(settings.filter.text) );
          },

          // definitions for automatic type detection
          button: function() {
            return $module.is('.button:not(a, .submit)');
          },
          input: function() {
            return $module.is('input');
          },
          progress: function() {
            return $module.is('.ui.progress');
          }
        },

        allow: function(state) {
          module.debug('Now allowing state', state);
          states[state] = true;
        },
        disallow: function(state) {
          module.debug('No longer allowing', state);
          states[state] = false;
        },

        allows: function(state) {
          return states[state] || false;
        },

        enable: function() {
          $module.removeClass(className.disabled);
        },

        disable: function() {
          $module.addClass(className.disabled);
        },

        setState: function(state) {
          if(module.allows(state)) {
            $module.addClass( className[state] );
          }
        },

        removeState: function(state) {
          if(module.allows(state)) {
            $module.removeClass( className[state] );
          }
        },

        toggle: {
          state: function() {
            var
              apiRequest,
              requestCancelled
            ;
            if( module.allows('active') && module.is.enabled() ) {
              module.refresh();
              if($.fn.api !== undefined) {
                apiRequest       = $module.api('get request');
                requestCancelled = $module.api('was cancelled');
                if( requestCancelled ) {
                  module.debug('API Request cancelled by beforesend');
                  settings.activateTest   = function(){ return false; };
                  settings.deactivateTest = function(){ return false; };
                }
                else if(apiRequest) {
                  module.listenTo(apiRequest);
                  return;
                }
              }
              module.change.state();
            }
          }
        },

        listenTo: function(apiRequest) {
          module.debug('API request detected, waiting for state signal', apiRequest);
          if(apiRequest) {
            if(text.loading) {
              module.update.text(text.loading);
            }
            $.when(apiRequest)
              .then(function() {
                if(apiRequest.state() == 'resolved') {
                  module.debug('API request succeeded');
                  settings.activateTest   = function(){ return true; };
                  settings.deactivateTest = function(){ return true; };
                }
                else {
                  module.debug('API request failed');
                  settings.activateTest   = function(){ return false; };
                  settings.deactivateTest = function(){ return false; };
                }
                module.change.state();
              })
            ;
          }
        },

        // checks whether active/inactive state can be given
        change: {

          state: function() {
            module.debug('Determining state change direction');
            // inactive to active change
            if( module.is.inactive() ) {
              module.activate();
            }
            else {
              module.deactivate();
            }
            if(settings.sync) {
              module.sync();
            }
            settings.onChange.call(element);
          },

          text: function() {
            if( module.is.textEnabled() ) {
              if(module.is.disabled() ) {
                module.verbose('Changing text to disabled text', text.hover);
                module.update.text(text.disabled);
              }
              else if( module.is.active() ) {
                if(text.hover) {
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);
                }
                else if(text.deactivate) {
                  module.verbose('Changing text to deactivating text', text.deactivate);
                  module.update.text(text.deactivate);
                }
              }
              else {
                if(text.hover) {
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);
                }
                else if(text.activate){
                  module.verbose('Changing text to activating text', text.activate);
                  module.update.text(text.activate);
                }
              }
            }
          }

        },

        activate: function() {
          if( settings.activateTest.call(element) ) {
            module.debug('Setting state to active');
            $module
              .addClass(className.active)
            ;
            module.update.text(text.active);
            settings.onActivate.call(element);
          }
        },

        deactivate: function() {
          if( settings.deactivateTest.call(element) ) {
            module.debug('Setting state to inactive');
            $module
              .removeClass(className.active)
            ;
            module.update.text(text.inactive);
            settings.onDeactivate.call(element);
          }
        },

        sync: function() {
          module.verbose('Syncing other buttons to current state');
          if( module.is.active() ) {
            $allModules
              .not($module)
                .state('activate');
          }
          else {
            $allModules
              .not($module)
                .state('deactivate')
            ;
          }
        },

        get: {
          text: function() {
            return (settings.selector.text)
              ? $module.find(settings.selector.text).text()
              : $module.html()
            ;
          },
          textFor: function(state) {
            return text[state] || false;
          }
        },

        flash: {
          text: function(text, duration, callback) {
            var
              previousText = module.get.text()
            ;
            module.debug('Flashing text message', text, duration);
            text     = text     || settings.text.flash;
            duration = duration || settings.flashDuration;
            callback = callback || function() {};
            module.update.text(text);
            setTimeout(function(){
              module.update.text(previousText);
              callback.call(element);
            }, duration);
          }
        },

        reset: {
          // on mouseout sets text to previous value
          text: function() {
            var
              activeText   = text.active   || $module.data(metadata.storedText),
              inactiveText = text.inactive || $module.data(metadata.storedText)
            ;
            if( module.is.textEnabled() ) {
              if( module.is.active() && activeText) {
                module.verbose('Resetting active text', activeText);
                module.update.text(activeText);
              }
              else if(inactiveText) {
                module.verbose('Resetting inactive text', activeText);
                module.update.text(inactiveText);
              }
            }
          }
        },

        update: {
          text: function(text) {
            var
              currentText = module.get.text()
            ;
            if(text && text !== currentText) {
              module.debug('Updating text', text);
              if(settings.selector.text) {
                $module
                  .data(metadata.storedText, text)
                  .find(settings.selector.text)
                    .text(text)
                ;
              }
              else {
                $module
                  .data(metadata.storedText, text)
                  .html(text)
                ;
              }
            }
            else {
              module.debug('Text is already set, ignoring update', text);
            }
          }
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.state.settings = {

  // module info
  name           : 'State',

  // debug output
  debug          : false,

  // verbose debug output
  verbose        : false,

  // namespace for events
  namespace      : 'state',

  // debug data includes performance
  performance    : true,

  // callback occurs on state change
  onActivate     : function() {},
  onDeactivate   : function() {},
  onChange       : function() {},

  // state test functions
  activateTest   : function() { return true; },
  deactivateTest : function() { return true; },

  // whether to automatically map default states
  automatic      : true,

  // activate / deactivate changes all elements instantiated at same time
  sync           : false,

  // default flash text duration, used for temporarily changing text of an element
  flashDuration  : 1000,

  // selector filter
  filter     : {
    text   : '.loading, .disabled',
    active : '.disabled'
  },

  context    : false,

  // error
  error: {
    beforeSend : 'The before send function has cancelled state change',
    method     : 'The method you called is not defined.'
  },

  // metadata
  metadata: {
    promise    : 'promise',
    storedText : 'stored-text'
  },

  // change class on state
  className: {
    active   : 'active',
    disabled : 'disabled',
    error    : 'error',
    loading  : 'loading',
    success  : 'success',
    warning  : 'warning'
  },

  selector: {
    // selector for text node
    text: false
  },

  defaults : {
    input: {
      disabled : true,
      loading  : true,
      active   : true
    },
    button: {
      disabled : true,
      loading  : true,
      active   : true,
    },
    progress: {
      active   : true,
      success  : true,
      warning  : true,
      error    : true
    }
  },

  states     : {
    active   : true,
    disabled : true,
    error    : true,
    loading  : true,
    success  : true,
    warning  : true
  },

  text     : {
    disabled   : false,
    flash      : false,
    hover      : false,
    active     : false,
    inactive   : false,
    activate   : false,
    deactivate : false
  }

};



})( jQuery, window, document );

},{}],327:[function(require,module,exports){
/*!
 * # Semantic UI - Transition
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.transition = function() {
  var
    $allModules     = $(this),
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    moduleArguments = arguments,
    query           = moduleArguments[0],
    queryArguments  = [].slice.call(arguments, 1),
    methodInvoked   = (typeof query === 'string'),

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },

    returnedValue
  ;
  $allModules
    .each(function(index) {
      var
        $module  = $(this),
        element  = this,

        // set at run time
        settings,
        instance,

        error,
        className,
        metadata,
        animationEnd,
        animationName,

        namespace,
        moduleNamespace,
        eventNamespace,
        module
      ;

      module = {

        initialize: function() {

          // get full settings
          settings        = module.get.settings.apply(element, moduleArguments);

          // shorthand
          className       = settings.className;
          error           = settings.error;
          metadata        = settings.metadata;

          // define namespace
          eventNamespace  = '.' + settings.namespace;
          moduleNamespace = 'module-' + settings.namespace;
          instance        = $module.data(moduleNamespace) || module;

          // get vendor specific events
          animationEnd    = module.get.animationEndEvent();

          if(methodInvoked) {
            methodInvoked = module.invoke(query);
          }

          // method not invoked, lets run an animation
          if(methodInvoked === false) {
            module.verbose('Converted arguments into settings object', settings);
            if(settings.interval) {
              module.delay(settings.animate);
            }
            else  {
              module.animate();
            }
            module.instantiate();
          }
        },

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
        },

        destroy: function() {
          module.verbose('Destroying previous module for', element);
          $module
            .removeData(moduleNamespace)
          ;
        },

        refresh: function() {
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;
        },

        forceRepaint: function() {
          module.verbose('Forcing element repaint');
          var
            $parentElement = $module.parent(),
            $nextElement = $module.next()
          ;
          if($nextElement.length === 0) {
            $module.detach().appendTo($parentElement);
          }
          else {
            $module.detach().insertBefore($nextElement);
          }
        },

        repaint: function() {
          module.verbose('Repainting element');
          var
            fakeAssignment = element.offsetWidth
          ;
        },

        delay: function(interval) {
          var
            direction = module.get.animationDirection(),
            shouldReverse,
            delay
          ;
          if(!direction) {
            direction = module.can.transition()
              ? module.get.direction()
              : 'static'
            ;
          }
          interval = (interval !== undefined)
            ? interval
            : settings.interval
          ;
          shouldReverse = (settings.reverse == 'auto' && direction == className.outward);
          delay = (shouldReverse || settings.reverse == true)
            ? ($allModules.length - index) * settings.interval
            : index * settings.interval
          ;
          module.debug('Delaying animation by', delay);
          setTimeout(module.animate, delay);
        },

        animate: function(overrideSettings) {
          settings = overrideSettings || settings;
          if(!module.is.supported()) {
            module.error(error.support);
            return false;
          }
          module.debug('Preparing animation', settings.animation);
          if(module.is.animating()) {
            if(settings.queue) {
              if(!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
              }
              else {
                module.queue(settings.animation);
              }
              return false;
            }
            else if(!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;
            }
            else {
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();
            }
          }
          if( module.can.animate() ) {
            module.set.animating(settings.animation);
          }
          else {
            module.error(error.noAnimation, settings.animation, element);
          }
        },

        reset: function() {
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();
          module.restore.conditions();
          module.remove.animating();
        },

        queue: function(animation) {
          module.debug('Queueing animation of', animation);
          module.queuing = true;
          $module
            .one(animationEnd + '.queue' + eventNamespace, function() {
              module.queuing = false;
              module.repaint();
              module.animate.apply(this, settings);
            })
          ;
        },

        complete: function (event) {
          module.debug('Animation complete', settings.animation);
          module.remove.completeCallback();
          module.remove.failSafe();
          if(!module.is.looping()) {
            if( module.is.outward() ) {
              module.verbose('Animation is outward, hiding element');
              module.restore.conditions();
              module.hide();
            }
            else if( module.is.inward() ) {
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();
              module.show();
            }
            else {
              module.verbose('Static animation completed');
              module.restore.conditions();
              settings.onComplete.call(element);
            }
          }
        },

        force: {
          visible: function() {
            var
              style          = $module.attr('style'),
              userStyle      = module.get.userStyle(),
              displayType    = module.get.displayType(),
              overrideStyle  = userStyle + 'display: ' + displayType + ' !important;',
              currentDisplay = $module.css('display'),
              emptyStyle     = (style === undefined || style === '')
            ;
            if(currentDisplay !== displayType) {
              module.verbose('Overriding default display to show element', displayType);
              $module
                .attr('style', overrideStyle)
              ;
            }
            else if(emptyStyle) {
              $module.removeAttr('style');
            }
          },
          hidden: function() {
            var
              style          = $module.attr('style'),
              currentDisplay = $module.css('display'),
              emptyStyle     = (style === undefined || style === '')
            ;
            if(currentDisplay !== 'none' && !module.is.hidden()) {
              module.verbose('Overriding default display to hide element');
              $module
                .css('display', 'none')
              ;
            }
            else if(emptyStyle) {
              $module
                .removeAttr('style')
              ;
            }
          }
        },

        has: {
          direction: function(animation) {
            var
              hasDirection = false
            ;
            animation = animation || settings.animation;
            if(typeof animation === 'string') {
              animation = animation.split(' ');
              $.each(animation, function(index, word){
                if(word === className.inward || word === className.outward) {
                  hasDirection = true;
                }
              });
            }
            return hasDirection;
          },
          inlineDisplay: function() {
            var
              style = $module.attr('style') || ''
            ;
            return $.isArray(style.match(/display.*?;/, ''));
          }
        },

        set: {
          animating: function(animation) {
            var
              animationClass,
              direction
            ;
            // remove previous callbacks
            module.remove.completeCallback();

            // determine exact animation
            animation      = animation || settings.animation;
            animationClass = module.get.animationClass(animation);

            // save animation class in cache to restore class names
            module.save.animation(animationClass);

            // override display if necessary so animation appears visibly
            module.force.visible();

            module.remove.hidden();
            module.remove.direction();

            module.start.animation(animationClass);

          },
          duration: function(animationName, duration) {
            duration = duration || settings.duration;
            duration = (typeof duration == 'number')
              ? duration + 'ms'
              : duration
            ;
            if(duration || duration === 0) {
              module.verbose('Setting animation duration', duration);
              $module
                .css({
                  'animation-duration':  duration
                })
              ;
            }
          },
          direction: function(direction) {
            direction = direction || module.get.direction();
            if(direction == className.inward) {
              module.set.inward();
            }
            else {
              module.set.outward();
            }
          },
          looping: function() {
            module.debug('Transition set to loop');
            $module
              .addClass(className.looping)
            ;
          },
          hidden: function() {
            $module
              .addClass(className.transition)
              .addClass(className.hidden)
            ;
          },
          inward: function() {
            module.debug('Setting direction to inward');
            $module
              .removeClass(className.outward)
              .addClass(className.inward)
            ;
          },
          outward: function() {
            module.debug('Setting direction to outward');
            $module
              .removeClass(className.inward)
              .addClass(className.outward)
            ;
          },
          visible: function() {
            $module
              .addClass(className.transition)
              .addClass(className.visible)
            ;
          }
        },

        start: {
          animation: function(animationClass) {
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);
            $module
              .addClass(animationClass)
              .one(animationEnd + '.complete' + eventNamespace, module.complete)
            ;
            if(settings.useFailSafe) {
              module.add.failSafe();
            }
            module.set.duration(settings.duration);
            settings.onStart.call(element);
          }
        },

        save: {
          animation: function(animation) {
            if(!module.cache) {
              module.cache = {};
            }
            module.cache.animation = animation;
          },
          displayType: function(displayType) {
            if(displayType !== 'none') {
              $module.data(metadata.displayType, displayType);
            }
          },
          transitionExists: function(animation, exists) {
            $.fn.transition.exists[animation] = exists;
            module.verbose('Saving existence of transition', animation, exists);
          }
        },

        restore: {
          conditions: function() {
            var
              animation = module.get.currentAnimation()
            ;
            if(animation) {
              $module
                .removeClass(animation)
              ;
              module.verbose('Removing animation class', module.cache);
            }
            module.remove.duration();
          }
        },

        add: {
          failSafe: function() {
            var
              duration = module.get.duration()
            ;
            module.timer = setTimeout(function() {
              $module.triggerHandler(animationEnd);
            }, duration + settings.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
          }
        },

        remove: {
          animating: function() {
            $module.removeClass(className.animating);
          },
          animationCallbacks: function() {
            module.remove.queueCallback();
            module.remove.completeCallback();
          },
          queueCallback: function() {
            $module.off('.queue' + eventNamespace);
          },
          completeCallback: function() {
            $module.off('.complete' + eventNamespace);
          },
          display: function() {
            $module.css('display', '');
          },
          direction: function() {
            $module
              .removeClass(className.inward)
              .removeClass(className.outward)
            ;
          },
          duration: function() {
            $module
              .css('animation-duration', '')
            ;
          },
          failSafe: function() {
            module.verbose('Removing fail safe timer', module.timer);
            if(module.timer) {
              clearTimeout(module.timer);
            }
          },
          hidden: function() {
            $module.removeClass(className.hidden);
          },
          visible: function() {
            $module.removeClass(className.visible);
          },
          looping: function() {
            module.debug('Transitions are no longer looping');
            if( module.is.looping() ) {
              module.reset();
              $module
                .removeClass(className.looping)
              ;
            }
          },
          transition: function() {
            $module
              .removeClass(className.visible)
              .removeClass(className.hidden)
            ;
          }
        },
        get: {
          settings: function(animation, duration, onComplete) {
            // single settings object
            if(typeof animation == 'object') {
              return $.extend(true, {}, $.fn.transition.settings, animation);
            }
            // all arguments provided
            else if(typeof onComplete == 'function') {
              return $.extend({}, $.fn.transition.settings, {
                animation  : animation,
                onComplete : onComplete,
                duration   : duration
              });
            }
            // only duration provided
            else if(typeof duration == 'string' || typeof duration == 'number') {
              return $.extend({}, $.fn.transition.settings, {
                animation : animation,
                duration  : duration
              });
            }
            // duration is actually settings object
            else if(typeof duration == 'object') {
              return $.extend({}, $.fn.transition.settings, duration, {
                animation : animation
              });
            }
            // duration is actually callback
            else if(typeof duration == 'function') {
              return $.extend({}, $.fn.transition.settings, {
                animation  : animation,
                onComplete : duration
              });
            }
            // only animation provided
            else {
              return $.extend({}, $.fn.transition.settings, {
                animation : animation
              });
            }
          },
          animationClass: function(animation) {
            var
              animationClass = animation || settings.animation,
              directionClass = (module.can.transition() && !module.has.direction())
                ? module.get.direction() + ' '
                : ''
            ;
            return className.animating + ' '
              + className.transition + ' '
              + directionClass
              + animationClass
            ;
          },
          currentAnimation: function() {
            return (module.cache && module.cache.animation !== undefined)
              ? module.cache.animation
              : false
            ;
          },
          currentDirection: function() {
            return module.is.inward()
              ? className.inward
              : className.outward
            ;
          },
          direction: function() {
            return module.is.hidden() || !module.is.visible()
              ? className.inward
              : className.outward
            ;
          },
          animationDirection: function(animation) {
            var
              direction
            ;
            animation = animation || settings.animation;
            if(typeof animation === 'string') {
              animation = animation.split(' ');
              // search animation name for out/in class
              $.each(animation, function(index, word){
                if(word === className.inward) {
                  direction = className.inward;
                }
                else if(word === className.outward) {
                  direction = className.outward;
                }
              });
            }
            // return found direction
            if(direction) {
              return direction;
            }
            return false;
          },
          duration: function(duration) {
            duration = duration || settings.duration;
            if(duration === false) {
              duration = $module.css('animation-duration') || 0;
            }
            return (typeof duration === 'string')
              ? (duration.indexOf('ms') > -1)
                ? parseFloat(duration)
                : parseFloat(duration) * 1000
              : duration
            ;
          },
          displayType: function(shouldDetermine) {
            shouldDetermine = (shouldDetermine !== undefined)
              ? shouldDetermine
              : true
            ;
            if(settings.displayType) {
              return settings.displayType;
            }
            if(shouldDetermine && $module.data(metadata.displayType) === undefined) {
              // create fake element to determine display state
              module.can.transition(true);
            }
            return $module.data(metadata.displayType);
          },
          userStyle: function(style) {
            style = style || $module.attr('style') || '';
            return style.replace(/display.*?;/, '');
          },
          transitionExists: function(animation) {
            return $.fn.transition.exists[animation];
          },
          animationStartEvent: function() {
            var
              element     = document.createElement('div'),
              animations  = {
                'animation'       :'animationstart',
                'OAnimation'      :'oAnimationStart',
                'MozAnimation'    :'mozAnimationStart',
                'WebkitAnimation' :'webkitAnimationStart'
              },
              animation
            ;
            for(animation in animations){
              if( element.style[animation] !== undefined ){
                return animations[animation];
              }
            }
            return false;
          },
          animationEndEvent: function() {
            var
              element     = document.createElement('div'),
              animations  = {
                'animation'       :'animationend',
                'OAnimation'      :'oAnimationEnd',
                'MozAnimation'    :'mozAnimationEnd',
                'WebkitAnimation' :'webkitAnimationEnd'
              },
              animation
            ;
            for(animation in animations){
              if( element.style[animation] !== undefined ){
                return animations[animation];
              }
            }
            return false;
          }

        },

        can: {
          transition: function(forced) {
            var
              animation         = settings.animation,
              transitionExists  = module.get.transitionExists(animation),
              displayType       = module.get.displayType(false),
              elementClass,
              tagName,
              $clone,
              currentAnimation,
              inAnimation,
              directionExists
            ;
            if( transitionExists === undefined || forced) {
              module.verbose('Determining whether animation exists');
              elementClass = $module.attr('class');
              tagName      = $module.prop('tagName');

              $clone = $('<' + tagName + ' />').addClass( elementClass ).insertAfter($module);
              currentAnimation = $clone
                .addClass(animation)
                .removeClass(className.inward)
                .removeClass(className.outward)
                .addClass(className.animating)
                .addClass(className.transition)
                .css('animationName')
              ;
              inAnimation = $clone
                .addClass(className.inward)
                .css('animationName')
              ;
              if(!displayType) {
                displayType = $clone
                  .attr('class', elementClass)
                  .removeAttr('style')
                  .removeClass(className.hidden)
                  .removeClass(className.visible)
                  .show()
                  .css('display')
                ;
                module.verbose('Determining final display state', displayType);
                module.save.displayType(displayType);
              }

              $clone.remove();
              if(currentAnimation != inAnimation) {
                module.debug('Direction exists for animation', animation);
                directionExists = true;
              }
              else if(currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;
              }
              else {
                module.debug('Static animation found', animation, displayType);
                directionExists = false;
              }
              module.save.transitionExists(animation, directionExists);
            }
            return (transitionExists !== undefined)
              ? transitionExists
              : directionExists
            ;
          },
          animate: function() {
            // can transition does not return a value if animation does not exist
            return (module.can.transition() !== undefined);
          }
        },

        is: {
          animating: function() {
            return $module.hasClass(className.animating);
          },
          inward: function() {
            return $module.hasClass(className.inward);
          },
          outward: function() {
            return $module.hasClass(className.outward);
          },
          looping: function() {
            return $module.hasClass(className.looping);
          },
          occurring: function(animation) {
            animation = animation || settings.animation;
            animation = '.' + animation.replace(' ', '.');
            return ( $module.filter(animation).length > 0 );
          },
          visible: function() {
            return $module.is(':visible');
          },
          hidden: function() {
            return $module.css('visibility') === 'hidden';
          },
          supported: function() {
            return(animationEnd !== false);
          }
        },

        hide: function() {
          module.verbose('Hiding element');
          if( module.is.animating() ) {
            module.reset();
          }
          element.blur(); // IE will trigger focus change if element is not blurred before hiding
          module.remove.display();
          module.remove.visible();
          module.set.hidden();
          module.force.hidden();
          settings.onHide.call(element);
          settings.onComplete.call(element);
          // module.repaint();
        },

        show: function(display) {
          module.verbose('Showing element', display);
          module.remove.hidden();
          module.set.visible();
          module.force.visible();
          settings.onShow.call(element);
          settings.onComplete.call(element);
          // module.repaint();
        },

        toggle: function() {
          if( module.is.visible() ) {
            module.hide();
          }
          else {
            module.show();
          }
        },

        stop: function() {
          module.debug('Stopping current animation');
          $module.triggerHandler(animationEnd);
        },

        stopAll: function() {
          module.debug('Stopping all animation');
          module.remove.queueCallback();
          $module.triggerHandler(animationEnd);
        },

        clear: {
          queue: function() {
            module.debug('Clearing animation queue');
            module.remove.queueCallback();
          }
        },

        enable: function() {
          module.verbose('Starting animation');
          $module.removeClass(className.disabled);
        },

        disable: function() {
          module.debug('Stopping animation');
          $module.addClass(className.disabled);
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        // modified for transition to return invoke success
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }

          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return (found !== undefined)
            ? found
            : false
          ;
        }
      };
      module.initialize();
    })
  ;
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

// Records if CSS transition is available
$.fn.transition.exists = {};

$.fn.transition.settings = {

  // module info
  name          : 'Transition',

  // hide all output from this component regardless of other settings
  silent        : false,

  // debug content outputted to console
  debug         : false,

  // verbose debug output
  verbose       : false,

  // performance data output
  performance   : true,

  // event namespace
  namespace     : 'transition',

  // delay between animations in group
  interval      : 0,

  // whether group animations should be reversed
  reverse       : 'auto',

  // animation callback event
  onStart       : function() {},
  onComplete    : function() {},
  onShow        : function() {},
  onHide        : function() {},

  // whether timeout should be used to ensure callback fires in cases animationend does not
  useFailSafe   : true,

  // delay in ms for fail safe
  failSafeDelay : 100,

  // whether EXACT animation can occur twice in a row
  allowRepeats  : false,

  // Override final display type on visible
  displayType   : false,

  // animation duration
  animation     : 'fade',
  duration      : false,

  // new animations will occur after previous ones
  queue         : true,

  metadata : {
    displayType: 'display'
  },

  className   : {
    animating  : 'animating',
    disabled   : 'disabled',
    hidden     : 'hidden',
    inward     : 'in',
    loading    : 'loading',
    looping    : 'looping',
    outward    : 'out',
    transition : 'transition',
    visible    : 'visible'
  },

  // possible errors
  error: {
    noAnimation : 'Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.',
    repeated    : 'That animation is already occurring, cancelling repeated animation',
    method      : 'The method you called is not defined',
    support     : 'This browser does not support CSS animations'
  }

};


})( jQuery, window, document );

},{}],328:[function(require,module,exports){
/*!
 * # Semantic UI - Visibility
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.visibility = function(parameters) {
  var
    $allModules    = $(this),
    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue,

    moduleCount    = $allModules.length,
    loadedCount    = 0
  ;

  $allModules
    .each(function() {
      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.visibility.settings, parameters)
          : $.extend({}, $.fn.visibility.settings),

        className       = settings.className,
        namespace       = settings.namespace,
        error           = settings.error,
        metadata        = settings.metadata,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $window         = $(window),

        $module         = $(this),
        $context        = $(settings.context),

        $placeholder,

        selector        = $module.selector || '',
        instance        = $module.data(moduleNamespace),

        requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function(callback) { setTimeout(callback, 0); },

        element         = this,
        disabled        = false,

        contextObserver,
        observer,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing', settings);

          module.setup.cache();

          if( module.should.trackChanges() ) {

            if(settings.type == 'image') {
              module.setup.image();
            }
            if(settings.type == 'fixed') {
              module.setup.fixed();
            }

            if(settings.observeChanges) {
              module.observeChanges();
            }
            module.bind.events();
          }

          module.save.position();
          if( !module.is.visible() ) {
            module.error(error.visible, $module);
          }

          if(settings.initialCheck) {
            module.checkVisibility();
          }
          module.instantiate();
        },

        instantiate: function() {
          module.debug('Storing instance', module);
          $module
            .data(moduleNamespace, module)
          ;
          instance = module;
        },

        destroy: function() {
          module.verbose('Destroying previous module');
          if(observer) {
            observer.disconnect();
          }
          if(contextObserver) {
            contextObserver.disconnect();
          }
          $window
            .off('load'   + eventNamespace, module.event.load)
            .off('resize' + eventNamespace, module.event.resize)
          ;
          $context
            .off('scroll'       + eventNamespace, module.event.scroll)
            .off('scrollchange' + eventNamespace, module.event.scrollchange)
          ;
          if(settings.type == 'fixed') {
            module.resetFixed();
            module.remove.placeholder();
          }
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
        },

        observeChanges: function() {
          if('MutationObserver' in window) {
            contextObserver = new MutationObserver(module.event.contextChanged);
            observer        = new MutationObserver(module.event.changed);
            contextObserver.observe(document, {
              childList : true,
              subtree   : true
            });
            observer.observe(element, {
              childList : true,
              subtree   : true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },

        bind: {
          events: function() {
            module.verbose('Binding visibility events to scroll and resize');
            if(settings.refreshOnLoad) {
              $window
                .on('load'   + eventNamespace, module.event.load)
              ;
            }
            $window
              .on('resize' + eventNamespace, module.event.resize)
            ;
            // pub/sub pattern
            $context
              .off('scroll'      + eventNamespace)
              .on('scroll'       + eventNamespace, module.event.scroll)
              .on('scrollchange' + eventNamespace, module.event.scrollchange)
            ;
          }
        },

        event: {
          changed: function(mutations) {
            module.verbose('DOM tree modified, updating visibility calculations');
            module.timer = setTimeout(function() {
              module.verbose('DOM tree modified, updating sticky menu');
              module.refresh();
            }, 100);
          },
          contextChanged: function(mutations) {
            [].forEach.call(mutations, function(mutation) {
              if(mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function(node) {
                  if(node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                  }
                });
              }
            });
          },
          resize: function() {
            module.debug('Window resized');
            if(settings.refreshOnResize) {
              requestAnimationFrame(module.refresh);
            }
          },
          load: function() {
            module.debug('Page finished loading');
            requestAnimationFrame(module.refresh);
          },
          // publishes scrollchange event on one scroll
          scroll: function() {
            if(settings.throttle) {
              clearTimeout(module.timer);
              module.timer = setTimeout(function() {
                $context.triggerHandler('scrollchange' + eventNamespace, [ $context.scrollTop() ]);
              }, settings.throttle);
            }
            else {
              requestAnimationFrame(function() {
                $context.triggerHandler('scrollchange' + eventNamespace, [ $context.scrollTop() ]);
              });
            }
          },
          // subscribes to scrollchange
          scrollchange: function(event, scrollPosition) {
            module.checkVisibility(scrollPosition);
          },
        },

        precache: function(images, callback) {
          if (!(images instanceof Array)) {
            images = [images];
          }
          var
            imagesLength  = images.length,
            loadedCounter = 0,
            cache         = [],
            cacheImage    = document.createElement('img'),
            handleLoad    = function() {
              loadedCounter++;
              if (loadedCounter >= images.length) {
                if ($.isFunction(callback)) {
                  callback();
                }
              }
            }
          ;
          while (imagesLength--) {
            cacheImage         = document.createElement('img');
            cacheImage.onload  = handleLoad;
            cacheImage.onerror = handleLoad;
            cacheImage.src     = images[imagesLength];
            cache.push(cacheImage);
          }
        },

        enableCallbacks: function() {
          module.debug('Allowing callbacks to occur');
          disabled = false;
        },

        disableCallbacks: function() {
          module.debug('Disabling all callbacks temporarily');
          disabled = true;
        },

        should: {
          trackChanges: function() {
            if(methodInvoked) {
              module.debug('One time query, no need to bind events');
              return false;
            }
            module.debug('Callbacks being attached');
            return true;
          }
        },

        setup: {
          cache: function() {
            module.cache = {
              occurred : {},
              screen   : {},
              element  : {},
            };
          },
          image: function() {
            var
              src = $module.data(metadata.src)
            ;
            if(src) {
              module.verbose('Lazy loading image', src);
              settings.once           = true;
              settings.observeChanges = false;

              // show when top visible
              settings.onOnScreen = function() {
                module.debug('Image on screen', element);
                module.precache(src, function() {
                  module.set.image(src, function() {
                    loadedCount++;
                    if(loadedCount == moduleCount) {
                      settings.onAllLoaded.call(this);
                    }
                    settings.onLoad.call(this);
                  });
                });
              };
            }
          },
          fixed: function() {
            module.debug('Setting up fixed');
            settings.once           = false;
            settings.observeChanges = false;
            settings.initialCheck   = true;
            settings.refreshOnLoad  = true;
            if(!parameters.transition) {
              settings.transition = false;
            }
            module.create.placeholder();
            module.debug('Added placeholder', $placeholder);
            settings.onTopPassed = function() {
              module.debug('Element passed, adding fixed position', $module);
              module.show.placeholder();
              module.set.fixed();
              if(settings.transition) {
                if($.fn.transition !== undefined) {
                  $module.transition(settings.transition, settings.duration);
                }
              }
            };
            settings.onTopPassedReverse = function() {
              module.debug('Element returned to position, removing fixed', $module);
              module.hide.placeholder();
              module.remove.fixed();
            };
          }
        },

        create: {
          placeholder: function() {
            module.verbose('Creating fixed position placeholder');
            $placeholder = $module
              .clone(false)
              .css('display', 'none')
              .addClass(className.placeholder)
              .insertAfter($module)
            ;
          }
        },

        show: {
          placeholder: function() {
            module.verbose('Showing placeholder');
            $placeholder
              .css('display', 'block')
              .css('visibility', 'hidden')
            ;
          }
        },
        hide: {
          placeholder: function() {
            module.verbose('Hiding placeholder');
            $placeholder
              .css('display', 'none')
              .css('visibility', '')
            ;
          }
        },

        set: {
          fixed: function() {
            module.verbose('Setting element to fixed position');
            $module
              .addClass(className.fixed)
              .css({
                position : 'fixed',
                top      : settings.offset + 'px',
                left     : 'auto',
                zIndex   : settings.zIndex
              })
            ;
            settings.onFixed.call(element);
          },
          image: function(src, callback) {
            $module
              .attr('src', src)
            ;
            if(settings.transition) {
              if( $.fn.transition !== undefined) {
                if($module.hasClass(className.visible)) {
                  module.debug('Transition already occurred on this image, skipping animation');
                  return;
                }
                $module.transition(settings.transition, settings.duration, callback);
              }
              else {
                $module.fadeIn(settings.duration, callback);
              }
            }
            else {
              $module.show();
            }
          }
        },

        is: {
          onScreen: function() {
            var
              calculations   = module.get.elementCalculations()
            ;
            return calculations.onScreen;
          },
          offScreen: function() {
            var
              calculations   = module.get.elementCalculations()
            ;
            return calculations.offScreen;
          },
          visible: function() {
            if(module.cache && module.cache.element) {
              return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
            }
            return false;
          },
          verticallyScrollableContext: function() {
            var
              overflowY = ($context.get(0) !== window)
                ? $context.css('overflow-y')
                : false
            ;
            return (overflowY == 'auto' || overflowY == 'scroll');
          },
          horizontallyScrollableContext: function() {
            var
              overflowX = ($context.get(0) !== window)
                ? $context.css('overflow-x')
                : false
            ;
            return (overflowX == 'auto' || overflowX == 'scroll');
          }
        },

        refresh: function() {
          module.debug('Refreshing constants (width/height)');
          if(settings.type == 'fixed') {
            module.resetFixed();
          }
          module.reset();
          module.save.position();
          if(settings.checkOnRefresh) {
            module.checkVisibility();
          }
          settings.onRefresh.call(element);
        },

        resetFixed: function () {
          module.remove.fixed();
          module.remove.occurred();
        },

        reset: function() {
          module.verbose('Resetting all cached values');
          if( $.isPlainObject(module.cache) ) {
            module.cache.screen = {};
            module.cache.element = {};
          }
        },

        checkVisibility: function(scroll) {
          module.verbose('Checking visibility of element', module.cache.element);

          if( !disabled && module.is.visible() ) {

            // save scroll position
            module.save.scroll(scroll);

            // update calculations derived from scroll
            module.save.calculations();

            // percentage
            module.passed();

            // reverse (must be first)
            module.passingReverse();
            module.topVisibleReverse();
            module.bottomVisibleReverse();
            module.topPassedReverse();
            module.bottomPassedReverse();

            // one time
            module.onScreen();
            module.offScreen();
            module.passing();
            module.topVisible();
            module.bottomVisible();
            module.topPassed();
            module.bottomPassed();

            // on update callback
            if(settings.onUpdate) {
              settings.onUpdate.call(element, module.get.elementCalculations());
            }
          }
        },

        passed: function(amount, newCallback) {
          var
            calculations   = module.get.elementCalculations(),
            amountInPixels
          ;
          // assign callback
          if(amount && newCallback) {
            settings.onPassed[amount] = newCallback;
          }
          else if(amount !== undefined) {
            return (module.get.pixelsPassed(amount) > calculations.pixelsPassed);
          }
          else if(calculations.passing) {
            $.each(settings.onPassed, function(amount, callback) {
              if(calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                module.execute(callback, amount);
              }
              else if(!settings.once) {
                module.remove.occurred(callback);
              }
            });
          }
        },

        onScreen: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onOnScreen,
            callbackName = 'onScreen'
          ;
          if(newCallback) {
            module.debug('Adding callback for onScreen', newCallback);
            settings.onOnScreen = newCallback;
          }
          if(calculations.onScreen) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback !== undefined) {
            return calculations.onOnScreen;
          }
        },

        offScreen: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onOffScreen,
            callbackName = 'offScreen'
          ;
          if(newCallback) {
            module.debug('Adding callback for offScreen', newCallback);
            settings.onOffScreen = newCallback;
          }
          if(calculations.offScreen) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback !== undefined) {
            return calculations.onOffScreen;
          }
        },

        passing: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onPassing,
            callbackName = 'passing'
          ;
          if(newCallback) {
            module.debug('Adding callback for passing', newCallback);
            settings.onPassing = newCallback;
          }
          if(calculations.passing) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback !== undefined) {
            return calculations.passing;
          }
        },


        topVisible: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopVisible,
            callbackName = 'topVisible'
          ;
          if(newCallback) {
            module.debug('Adding callback for top visible', newCallback);
            settings.onTopVisible = newCallback;
          }
          if(calculations.topVisible) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return calculations.topVisible;
          }
        },

        bottomVisible: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomVisible,
            callbackName = 'bottomVisible'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom visible', newCallback);
            settings.onBottomVisible = newCallback;
          }
          if(calculations.bottomVisible) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return calculations.bottomVisible;
          }
        },

        topPassed: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopPassed,
            callbackName = 'topPassed'
          ;
          if(newCallback) {
            module.debug('Adding callback for top passed', newCallback);
            settings.onTopPassed = newCallback;
          }
          if(calculations.topPassed) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return calculations.topPassed;
          }
        },

        bottomPassed: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomPassed,
            callbackName = 'bottomPassed'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom passed', newCallback);
            settings.onBottomPassed = newCallback;
          }
          if(calculations.bottomPassed) {
            module.execute(callback, callbackName);
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return calculations.bottomPassed;
          }
        },

        passingReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onPassingReverse,
            callbackName = 'passingReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for passing reverse', newCallback);
            settings.onPassingReverse = newCallback;
          }
          if(!calculations.passing) {
            if(module.get.occurred('passing')) {
              module.execute(callback, callbackName);
            }
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback !== undefined) {
            return !calculations.passing;
          }
        },


        topVisibleReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopVisibleReverse,
            callbackName = 'topVisibleReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for top visible reverse', newCallback);
            settings.onTopVisibleReverse = newCallback;
          }
          if(!calculations.topVisible) {
            if(module.get.occurred('topVisible')) {
              module.execute(callback, callbackName);
            }
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return !calculations.topVisible;
          }
        },

        bottomVisibleReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomVisibleReverse,
            callbackName = 'bottomVisibleReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom visible reverse', newCallback);
            settings.onBottomVisibleReverse = newCallback;
          }
          if(!calculations.bottomVisible) {
            if(module.get.occurred('bottomVisible')) {
              module.execute(callback, callbackName);
            }
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return !calculations.bottomVisible;
          }
        },

        topPassedReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopPassedReverse,
            callbackName = 'topPassedReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for top passed reverse', newCallback);
            settings.onTopPassedReverse = newCallback;
          }
          if(!calculations.topPassed) {
            if(module.get.occurred('topPassed')) {
              module.execute(callback, callbackName);
            }
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return !calculations.onTopPassed;
          }
        },

        bottomPassedReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomPassedReverse,
            callbackName = 'bottomPassedReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom passed reverse', newCallback);
            settings.onBottomPassedReverse = newCallback;
          }
          if(!calculations.bottomPassed) {
            if(module.get.occurred('bottomPassed')) {
              module.execute(callback, callbackName);
            }
          }
          else if(!settings.once) {
            module.remove.occurred(callbackName);
          }
          if(newCallback === undefined) {
            return !calculations.bottomPassed;
          }
        },

        execute: function(callback, callbackName) {
          var
            calculations = module.get.elementCalculations(),
            screen       = module.get.screenCalculations()
          ;
          callback = callback || false;
          if(callback) {
            if(settings.continuous) {
              module.debug('Callback being called continuously', callbackName, calculations);
              callback.call(element, calculations, screen);
            }
            else if(!module.get.occurred(callbackName)) {
              module.debug('Conditions met', callbackName, calculations);
              callback.call(element, calculations, screen);
            }
          }
          module.save.occurred(callbackName);
        },

        remove: {
          fixed: function() {
            module.debug('Removing fixed position');
            $module
              .removeClass(className.fixed)
              .css({
                position : '',
                top      : '',
                left     : '',
                zIndex   : ''
              })
            ;
            settings.onUnfixed.call(element);
          },
          placeholder: function() {
            module.debug('Removing placeholder content');
            if($placeholder) {
              $placeholder.remove();
            }
          },
          occurred: function(callback) {
            if(callback) {
              var
                occurred = module.cache.occurred
              ;
              if(occurred[callback] !== undefined && occurred[callback] === true) {
                module.debug('Callback can now be called again', callback);
                module.cache.occurred[callback] = false;
              }
            }
            else {
              module.cache.occurred = {};
            }
          }
        },

        save: {
          calculations: function() {
            module.verbose('Saving all calculations necessary to determine positioning');
            module.save.direction();
            module.save.screenCalculations();
            module.save.elementCalculations();
          },
          occurred: function(callback) {
            if(callback) {
              if(module.cache.occurred[callback] === undefined || (module.cache.occurred[callback] !== true)) {
                module.verbose('Saving callback occurred', callback);
                module.cache.occurred[callback] = true;
              }
            }
          },
          scroll: function(scrollPosition) {
            scrollPosition      = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
            module.cache.scroll = scrollPosition;
          },
          direction: function() {
            var
              scroll     = module.get.scroll(),
              lastScroll = module.get.lastScroll(),
              direction
            ;
            if(scroll > lastScroll && lastScroll) {
              direction = 'down';
            }
            else if(scroll < lastScroll && lastScroll) {
              direction = 'up';
            }
            else {
              direction = 'static';
            }
            module.cache.direction = direction;
            return module.cache.direction;
          },
          elementPosition: function() {
            var
              element = module.cache.element,
              screen  = module.get.screenSize()
            ;
            module.verbose('Saving element position');
            // (quicker than $.extend)
            element.fits          = (element.height < screen.height);
            element.offset        = $module.offset();
            element.width         = $module.outerWidth();
            element.height        = $module.outerHeight();
            // compensate for scroll in context
            if(module.is.verticallyScrollableContext()) {
              element.offset.top += $context.scrollTop() - $context.offset().top;
            }
            if(module.is.horizontallyScrollableContext()) {
              element.offset.left += $context.scrollLeft - $context.offset().left;
            }
            // store
            module.cache.element = element;
            return element;
          },
          elementCalculations: function() {
            var
              screen     = module.get.screenCalculations(),
              element    = module.get.elementPosition()
            ;
            // offset
            if(settings.includeMargin) {
              element.margin        = {};
              element.margin.top    = parseInt($module.css('margin-top'), 10);
              element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
              element.top    = element.offset.top - element.margin.top;
              element.bottom = element.offset.top + element.height + element.margin.bottom;
            }
            else {
              element.top    = element.offset.top;
              element.bottom = element.offset.top + element.height;
            }

            // visibility
            element.topPassed        = (screen.top >= element.top);
            element.bottomPassed     = (screen.top >= element.bottom);
            element.topVisible       = (screen.bottom >= element.top) && !element.bottomPassed;
            element.bottomVisible    = (screen.bottom >= element.bottom) && !element.topPassed;
            element.pixelsPassed     = 0;
            element.percentagePassed = 0;

            // meta calculations
            element.onScreen  = (element.topVisible && !element.bottomPassed);
            element.passing   = (element.topPassed && !element.bottomPassed);
            element.offScreen = (!element.onScreen);

            // passing calculations
            if(element.passing) {
              element.pixelsPassed     = (screen.top - element.top);
              element.percentagePassed = (screen.top - element.top) / element.height;
            }
            module.cache.element = element;
            module.verbose('Updated element calculations', element);
            return element;
          },
          screenCalculations: function() {
            var
              scroll = module.get.scroll()
            ;
            module.save.direction();
            module.cache.screen.top    = scroll;
            module.cache.screen.bottom = scroll + module.cache.screen.height;
            return module.cache.screen;
          },
          screenSize: function() {
            module.verbose('Saving window position');
            module.cache.screen = {
              height: $context.height()
            };
          },
          position: function() {
            module.save.screenSize();
            module.save.elementPosition();
          }
        },

        get: {
          pixelsPassed: function(amount) {
            var
              element = module.get.elementCalculations()
            ;
            if(amount.search('%') > -1) {
              return ( element.height * (parseInt(amount, 10) / 100) );
            }
            return parseInt(amount, 10);
          },
          occurred: function(callback) {
            return (module.cache.occurred !== undefined)
              ? module.cache.occurred[callback] || false
              : false
            ;
          },
          direction: function() {
            if(module.cache.direction === undefined) {
              module.save.direction();
            }
            return module.cache.direction;
          },
          elementPosition: function() {
            if(module.cache.element === undefined) {
              module.save.elementPosition();
            }
            return module.cache.element;
          },
          elementCalculations: function() {
            if(module.cache.element === undefined) {
              module.save.elementCalculations();
            }
            return module.cache.element;
          },
          screenCalculations: function() {
            if(module.cache.screen === undefined) {
              module.save.screenCalculations();
            }
            return module.cache.screen;
          },
          screenSize: function() {
            if(module.cache.screen === undefined) {
              module.save.screenSize();
            }
            return module.cache.screen;
          },
          scroll: function() {
            if(module.cache.scroll === undefined) {
              module.save.scroll();
            }
            return module.cache.scroll;
          },
          lastScroll: function() {
            if(module.cache.screen === undefined) {
              module.debug('First scroll event, no last scroll could be found');
              return false;
            }
            return module.cache.screen.top;
          }
        },

        setting: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            settings[name] = value;
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        instance.save.scroll();
        instance.save.calculations();
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.visibility.settings = {

  name                   : 'Visibility',
  namespace              : 'visibility',

  debug                  : false,
  verbose                : false,
  performance            : true,

  // whether to use mutation observers to follow changes
  observeChanges         : true,

  // check position immediately on init
  initialCheck           : true,

  // whether to refresh calculations after all page images load
  refreshOnLoad          : true,

  // whether to refresh calculations after page resize event
  refreshOnResize        : true,

  // should call callbacks on refresh event (resize, etc)
  checkOnRefresh         : true,

  // callback should only occur one time
  once                   : true,

  // callback should fire continuously whe evaluates to true
  continuous             : false,

  // offset to use with scroll top
  offset                 : 0,

  // whether to include margin in elements position
  includeMargin          : false,

  // scroll context for visibility checks
  context                : window,

  // visibility check delay in ms (defaults to animationFrame)
  throttle               : false,

  // special visibility type (image, fixed)
  type                   : false,

  // z-index to use with visibility 'fixed'
  zIndex                 : '10',

  // image only animation settings
  transition             : 'fade in',
  duration               : 1000,

  // array of callbacks for percentage
  onPassed               : {},

  // standard callbacks
  onOnScreen             : false,
  onOffScreen            : false,
  onPassing              : false,
  onTopVisible           : false,
  onBottomVisible        : false,
  onTopPassed            : false,
  onBottomPassed         : false,

  // reverse callbacks
  onPassingReverse       : false,
  onTopVisibleReverse    : false,
  onBottomVisibleReverse : false,
  onTopPassedReverse     : false,
  onBottomPassedReverse  : false,

  // special callbacks for image
  onLoad                 : function() {},
  onAllLoaded            : function() {},

  // special callbacks for fixed position
  onFixed                : function() {},
  onUnfixed              : function() {},

  // utility callbacks
  onUpdate               : false, // disabled by default for performance
  onRefresh              : function(){},

  metadata : {
    src: 'src'
  },

  className: {
    fixed       : 'fixed',
    placeholder : 'placeholder',
    visible     : 'visible'
  },

  error : {
    method  : 'The method you called is not defined.',
    visible : 'Element is hidden, you must call refresh after element becomes visible'
  }

};

})( jQuery, window, document );

},{}],329:[function(require,module,exports){
/*!
 * # Semantic UI - Visit
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.visit = $.fn.visit = function(parameters) {
  var
    $allModules     = $.isFunction(this)
        ? $(window)
        : $(this),
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),
    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.visit.settings, parameters)
          : $.extend({}, $.fn.visit.settings),

        error           = settings.error,
        namespace       = settings.namespace,

        eventNamespace  = '.' + namespace,
        moduleNamespace = namespace + '-module',

        $module         = $(this),
        $displays       = $(),

        element         = this,
        instance        = $module.data(moduleNamespace),
        module
      ;
      module = {

        initialize: function() {
          if(settings.count) {
            module.store(settings.key.count, settings.count);
          }
          else if(settings.id) {
            module.add.id(settings.id);
          }
          else if(settings.increment && methodInvoked !== 'increment') {
            module.increment();
          }
          module.add.display($module);
          module.instantiate();
        },

        instantiate: function() {
          module.verbose('Storing instance of visit module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.verbose('Destroying instance');
          $module
            .removeData(moduleNamespace)
          ;
        },

        increment: function(id) {
          var
            currentValue = module.get.count(),
            newValue     = +(currentValue) + 1
          ;
          if(id) {
            module.add.id(id);
          }
          else {
            if(newValue > settings.limit && !settings.surpass) {
              newValue = settings.limit;
            }
            module.debug('Incrementing visits', newValue);
            module.store(settings.key.count, newValue);
          }
        },

        decrement: function(id) {
          var
            currentValue = module.get.count(),
            newValue     = +(currentValue) - 1
          ;
          if(id) {
            module.remove.id(id);
          }
          else {
            module.debug('Removing visit');
            module.store(settings.key.count, newValue);
          }
        },

        get: {
          count: function() {
            return +(module.retrieve(settings.key.count)) || 0;
          },
          idCount: function(ids) {
            ids = ids || module.get.ids();
            return ids.length;
          },
          ids: function(delimitedIDs) {
            var
              idArray = []
            ;
            delimitedIDs = delimitedIDs || module.retrieve(settings.key.ids);
            if(typeof delimitedIDs === 'string') {
              idArray = delimitedIDs.split(settings.delimiter);
            }
            module.verbose('Found visited ID list', idArray);
            return idArray;
          },
          storageOptions: function(data) {
            var
              options = {}
            ;
            if(settings.expires) {
              options.expires = settings.expires;
            }
            if(settings.domain) {
              options.domain = settings.domain;
            }
            if(settings.path) {
              options.path = settings.path;
            }
            return options;
          }
        },

        has: {
          visited: function(id, ids) {
            var
              visited = false
            ;
            ids = ids || module.get.ids();
            if(id !== undefined && ids) {
              $.each(ids, function(index, value){
                if(value == id) {
                  visited = true;
                }
              });
            }
            return visited;
          }
        },

        set: {
          count: function(value) {
            module.store(settings.key.count, value);
          },
          ids: function(value) {
            module.store(settings.key.ids, value);
          }
        },

        reset: function() {
          module.store(settings.key.count, 0);
          module.store(settings.key.ids, null);
        },

        add: {
          id: function(id) {
            var
              currentIDs = module.retrieve(settings.key.ids),
              newIDs = (currentIDs === undefined || currentIDs === '')
                ? id
                : currentIDs + settings.delimiter + id
            ;
            if( module.has.visited(id) ) {
              module.debug('Unique content already visited, not adding visit', id, currentIDs);
            }
            else if(id === undefined) {
              module.debug('ID is not defined');
            }
            else {
              module.debug('Adding visit to unique content', id);
              module.store(settings.key.ids, newIDs);
            }
            module.set.count( module.get.idCount() );
          },
          display: function(selector) {
            var
              $element = $(selector)
            ;
            if($element.length > 0 && !$.isWindow($element[0])) {
              module.debug('Updating visit count for element', $element);
              $displays = ($displays.length > 0)
                ? $displays.add($element)
                : $element
              ;
            }
          }
        },

        remove: {
          id: function(id) {
            var
              currentIDs = module.get.ids(),
              newIDs     = []
            ;
            if(id !== undefined && currentIDs !== undefined) {
              module.debug('Removing visit to unique content', id, currentIDs);
              $.each(currentIDs, function(index, value){
                if(value !== id) {
                  newIDs.push(value);
                }
              });
              newIDs = newIDs.join(settings.delimiter);
              module.store(settings.key.ids, newIDs );
            }
            module.set.count( module.get.idCount() );
          }
        },

        check: {
          limit: function(value) {
            value = value || module.get.count();
            if(settings.limit) {
              if(value >= settings.limit) {
                module.debug('Pages viewed exceeded limit, firing callback', value, settings.limit);
                settings.onLimit.call(element, value);
              }
              module.debug('Limit not reached', value, settings.limit);
              settings.onChange.call(element, value);
            }
            module.update.display(value);
          }
        },

        update: {
          display: function(value) {
            value = value || module.get.count();
            if($displays.length > 0) {
              module.debug('Updating displayed view count', $displays);
              $displays.html(value);
            }
          }
        },

        store: function(key, value) {
          var
            options = module.get.storageOptions(value)
          ;
          if(settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
            window.localStorage.setItem(key, value);
            module.debug('Value stored using local storage', key, value);
          }
          else if($.cookie !== undefined) {
            $.cookie(key, value, options);
            module.debug('Value stored using cookie', key, value, options);
          }
          else {
            module.error(error.noCookieStorage);
            return;
          }
          if(key == settings.key.count) {
            module.check.limit(value);
          }
        },
        retrieve: function(key, value) {
          var
            storedValue
          ;
          if(settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
            storedValue = window.localStorage.getItem(key);
          }
          // get by cookie
          else if($.cookie !== undefined) {
            storedValue = $.cookie(key);
          }
          else {
            module.error(error.noCookieStorage);
          }
          if(storedValue == 'undefined' || storedValue == 'null' || storedValue === undefined || storedValue === null) {
            storedValue = undefined;
          }
          return storedValue;
        },

        setting: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            settings[name] = value;
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          module.debug('Changing internal', name, value);
          if(value !== undefined) {
            if( $.isPlainObject(name) ) {
              $.extend(true, module, name);
            }
            else {
              module[name] = value;
            }
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };
      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }

    })
  ;
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.visit.settings = {

  name          : 'Visit',

  debug         : false,
  verbose       : false,
  performance   : true,

  namespace     : 'visit',

  increment     : false,
  surpass       : false,
  count         : false,
  limit         : false,

  delimiter     : '&',
  storageMethod : 'localstorage',

  key           : {
    count : 'visit-count',
    ids   : 'visit-ids'
  },

  expires       : 30,
  domain        : false,
  path          : '/',

  onLimit       : function() {},
  onChange      : function() {},

  error         : {
    method          : 'The method you called is not defined',
    missingPersist  : 'Using the persist setting requires the inclusion of PersistJS',
    noCookieStorage : 'The default storage cookie requires $.cookie to be included.'
  }

};

})( jQuery, window, document );

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
