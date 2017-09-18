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


