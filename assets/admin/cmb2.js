window.CMB2 = window.CMB2 || {};
(function(window, document, $, cmb){
  'use strict';
  
  // Only show the CDP metabox if the block type is 'post_list'
  $('#yali_cb_type').change( function() {
    var blockType = $(this).val(),
        widgetBox = $('#yali_cb_box_cdp');
    try {
      if( blockType == 'post_list') {
        widgetBox.show();
      } else {
        widgetBox.hide();
      }
    } catch(e) {
      console.log('Unable to update the view');
    }
  });

})(window, document, jQuery, window.CMB2);

