(function($) {

	$(document).on('cmb_init', function() {
		
		// Metabox DOM Selections
		var widgetMetabox = document.getElementById('yali_cb_box_cdp'),
			socialMetabox = document.getElementById('yali_cb_social_links');
		
		// Metabox Object store for iterating
		var conditionalMetaboxes = {
			'post_list': widgetMetabox,
			'social': socialMetabox			
		};		

		function toggleConditionalMetaboxes(blockTypeSelection) {
			for( var type in conditionalMetaboxes) {
	      		if( type == blockTypeSelection ){
	      			conditionalMetaboxes[type].style.display = 'block';
	      		} else {
	      			conditionalMetaboxes[type].style.display = 'none';
	      		}
	      	}
		}

		function hideAllConditionalMetaboxes() {
			for( var type in conditionalMetaboxes) {
	      		conditionalMetaboxes[type].style.display = 'none';
	      	}
		}

		// Hide Conditional Boxes based on initial content type selection
		var init_content_type_selection = $('#yali_cb_type').val();
		if( conditionalMetaboxes[init_content_type_selection] !== undefined ) {
	    	toggleConditionalMetaboxes(init_content_type_selection);			      	
	    } else {
			  hideAllConditionalMetaboxes();
	    }
		

		// Toggle Metabox display on content type selection
	 	$('#yali_cb_type').change( function() {

		    var blockTypeSelection = $(this).val();		        

		    try {		      
		      // Check if selection exists in metabox store object & toggle display || hide all conditional metaboxes
		      if( conditionalMetaboxes[blockTypeSelection] !== undefined ) {			      	
		      	toggleConditionalMetaboxes(blockTypeSelection);			      	
		      }	else {
		      	hideAllConditionalMetaboxes();
		      }

		    } catch(e) {
		      console.log('Unable to update the view');
		    }
	  	});

	});

})(jQuery);

// $('.cdp-select-posts-by input[type=radio]').change( function() {
//   var selected = $(this).val();
//   var selectByPosts = $('.cmb-type-cdp-autocomplete.cmb-repeat'),
//       selectByPostsLink = $('div[data-groupid=cdp_autocomplete_post_link_group]');

//   if( selected === 'custom' ) {
//     selectByPosts.show();
//     selectByPostsLink.hide();
//   } else if ( selected === 'custom_link'  ) {
//     selectByPosts.hide();
//     selectByPostsLink.show();
//   } else {
//     selectByPosts.hide();
//     selectByPostsLink.hide();
//   }
// });