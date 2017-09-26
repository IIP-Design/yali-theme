(function($) {

	$(document).on('cmb_init', function() {
		
		// Metabox DOM Selections
		var widgetMetabox = document.getElementById('yali_cb_box_cdp'),
			socialMetabox = document.getElementById('yali_cb_social_links'),
			accordionMetaBox = document.getElementById('yali_cb_accordion');
		
		// Metabox Object store for iterating
		var conditionalMetaboxes = {
			'post_list': widgetMetabox,
			'social': socialMetabox,
			'accordion': accordionMetaBox
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
		if( init_content_type_selection === undefined ) {
			return;
		}

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


