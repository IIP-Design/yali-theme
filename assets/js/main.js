import '../../node_modules/semantic-ui-sass/semantic-ui'; 
import * as nav from './nav.js';
import * as footer from './footer.js';
import * as join_form from './join_form.js';
import * as search from './search.js';
import './date_countdown.js';

(function($) {
 
  nav.init($);
  footer.init();
  join_form.init();
  search.init();  

  // YALILearns Page
  $('.ui.accordion').accordion();

})( jQuery ); 
