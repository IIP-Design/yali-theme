import '../../node_modules/semantic-ui-sass/semantic-ui'; 
import * as nav from './nav';
import * as footer from './footer';
import * as join_form from './join_form';
import * as search from './search';
import * as dropdown_filter from './dropdown_filter';
import './date_countdown';

(function($) {
 
  nav.init($);
  footer.init();
  join_form.init();
  search.init();  
  dropdown_filter.init();

  // YALILearns Page
  $('.ui.accordion').accordion();

})( jQuery ); 
