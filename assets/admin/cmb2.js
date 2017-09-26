window.CMB2 = window.CMB2 || {};
(function(window, document, $, cmb){
  'use strict';
  

  // Only show the CDP metabox if the block type is 'post_list'
  // This is needed as CMB2 conditionals does not handle show/hide of groups
  $('#yali_cb_type').change( function() {
  
    var blockType = $(this).val(),
        widgetBoxPostList = $('#yali_cb_box_cdp')
    try {
      if( blockType == 'post_list') {
        widgetBoxPostList.show();
      } else {
        widgetBoxPostList.hide();
      }
    } catch(e) {
      console.log('Unable to update the view');
    }
  });

  $('.cdp-select-posts-by input[type=radio]').change( function() {
    var selected = $(this).val();
    var selectByPosts = $('.cmb-type-cdp-autocomplete.cmb-repeat'),
        selectByPostsLink = $('div[data-groupid=cdp_autocomplete_post_link_group]');

    if( selected === 'custom' ) {
      selectByPosts.show();
      selectByPostsLink.hide();
    } else if ( selected === 'custom_link'  ) {
      selectByPosts.hide();
      selectByPostsLink.show();
    } else {
      selectByPosts.hide();
      selectByPostsLink.hide();
    }
  });

})( window, document, jQuery, window.CMB2 );