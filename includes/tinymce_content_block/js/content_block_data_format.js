(function() {	
	
	// Check http request status
	var errorStatus = yaliContentBlocks.errorStatus;
	if( errorStatus !== null )	{
		console.error('Content Blocks Request Error: ', errorStatus);
		return;
	}

	// array to pass to tinyMCE editor
	// follows { text: '', value: '' } format	
	yaliContentBlocks.updatedBlocksArray = []

	yaliContentBlocks.contentBlocks.map(function(block) {
		yaliContentBlocks.updatedBlocksArray.push({
			text: block.title.rendered,
			value: block.display_shortcode
		});
	});
	
	

})();	  