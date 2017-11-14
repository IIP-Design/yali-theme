import '../../node_modules/semantic-ui-sass/semantic-ui'; 
import * as nav from './nav.js';
import * as footer from './footer.js';
import * as join_form from './join_form.js';
import * as search from './search.js';
import * as cdp from './cdp';
import * as responsiveImages from './responsive_background_image.js';
import * as dropdown_filter from './dropdown_filter';
import './simple_filter';
import scroll_to_elem from './scrollTo';
import show_more_posts from './show_more';

(function($) {
 
  nav.init($);
  footer.init();
  join_form.init();
  search.init();  
  dropdown_filter.init();
  cdp.init($);
  responsiveImages.init();

  // Init Accordions
  $('.ui.accordion').accordion();  

  // MWF Links, 16days page - Page Scroll
  if( location.pathname.includes('/16days') ) {
    let pledge = document.querySelector('[href="#pledgeform16"]');
    pledge.classList.add('scroll_link');
  }

  scroll_to_elem('.scroll_link');


  // Search Results Page
  show_more_posts('.results_list_row.hidden');
 
})( jQuery ); 