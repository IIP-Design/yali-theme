import '../../node_modules/semantic-ui-sass/semantic-ui'; 
<<<<<<< HEAD
import * as nav from './nav.js';
import * as footer from './footer.js';
import * as join_form from './join_form.js';
import * as search from './search.js';
import './date_countdown.js';
import ResponsiveBackgroundImage from './ResponsiveBackgroundImage.js';
=======
import * as nav from './nav';
import * as footer from './footer';
import * as join_form from './join_form';
import * as search from './search';
import * as dropdown_filter from './dropdown_filter';
import './date_countdown';
>>>>>>> b870434a2976439c01b2d49f6932efeaff0ff7ad

(function($) {
 
  nav.init($);
  footer.init();
  join_form.init();
  search.init();  
  dropdown_filter.init();

  // YALILearns Page
  $('.ui.accordion').accordion();

  // initialize responsive background images
  let elements = document.querySelectorAll('[data-responsive-background-image]');   
  for ( let i = 0; i < elements.length; i++ ) {  
    new ResponsiveBackgroundImage( elements[i] );
  }
 
})( jQuery ); 

