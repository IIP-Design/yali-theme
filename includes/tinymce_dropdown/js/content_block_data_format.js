(function() {	
	
	// array to pass to tinyMCE editor
	// follows { text: '', value: '' } format	
	yaliContentBlocks.updatedBlocksArray = [];
	yaliContentBlocks.contentBlocks.map(function(block) {
		display_shortcode = '[content_block id="' + block.ID + '" title="' + block.post_title + '"]';

		yaliContentBlocks.updatedBlocksArray.push({
			text: block.post_title,
			value: display_shortcode
		});
	});
	
	

})();	  