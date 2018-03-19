//import * as polyfills from './_js_polyfills.js';
// import '../../node_modules/semantic-ui-sass/semantic-ui';
import '../../node_modules/semantic-ui-sass/js/accordion';
import '../../node_modules/semantic-ui-sass/js/api';
import '../../node_modules/semantic-ui-sass/js/checkbox';
import '../../node_modules/semantic-ui-sass/js/colorize';
import '../../node_modules/semantic-ui-sass/js/dropdown';
import '../../node_modules/semantic-ui-sass/js/form';
import '../../node_modules/semantic-ui-sass/js/search';
import '../../node_modules/semantic-ui-sass/js/site';
import '../../node_modules/semantic-ui-sass/js/state';
import '../../node_modules/semantic-ui-sass/js/transition';
import '../../node_modules/semantic-ui-sass/js/visibility';
import '../../node_modules/semantic-ui-sass/js/visit';
import * as nav from './nav.js';
import * as footer from './footer.js';
import * as join_form from './join_form.js';
import * as search from './search.js';
import * as cdp from './cdp';
import * as responsiveImages from './responsive_background_image.js';
import scroll_to_elem from './scrollTo';
import show_more_posts from './show_more';

(function($) {

  //polyfills.init();
  nav.init($);
  footer.init();
  join_form.init();
  search.init();
  cdp.init($);
  responsiveImages.init();

  // Init Accordions
  $('.ui.accordion').accordion({
    onOpen: function(item) {
      let content_script = this.querySelector('script') || null;
      if( content_script !== null ) {
        content_script.removeAttribute('class');
        content_script.removeAttribute('style');
      }      
    }
  });

  // MWF Links
  scroll_to_elem('.scroll_link');


  // Search Results Page
  show_more_posts('.results_list_row.hidden');

})( jQuery );
