import '../../node_modules/semantic-ui-sass/semantic-ui'; 
import * as nav from './nav.js';
import * as footer from './footer.js';
import * as join_form from './join_form.js';
import * as search from './search.js';
import ResponsiveBackgroundImage from './ResponsiveBackgroundImage.js';
import * as dropdown_filter from './dropdown_filter';
import './application_status';
import './simple_filter';
import scroll_to_elem from './scrollTo';

(function($) {
 
  nav.init($);
  footer.init();
  join_form.init();
  search.init();  
  dropdown_filter.init();

  // Init Accordions
  $('.ui.accordion').accordion();  

  // Initialize responsive background images
  let elements = document.querySelectorAll('[data-responsive-background-image]');   
  for ( let i = 0; i < elements.length; i++ ) {  
    new ResponsiveBackgroundImage( elements[i] );
  }

  // MWF Links - Page Scroll
  scroll_to_elem('.scroll_link');
 
})( jQuery ); 

