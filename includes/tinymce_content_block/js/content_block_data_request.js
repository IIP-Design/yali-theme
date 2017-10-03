(function($) {	

	$.get(yaliContentBlocks.dataUrl)
		.then(function(blockList){
			var blockListArray = [];

			blockList.map(function(block) {
				blockListArray.push(
					{ text: block.title.rendered, value: block.display_shortcode }
				);
			});

			try  {
				tinymce.activeEditor.settings.contentBlockValues = blockListArray;
			} catch(err) {
				console.log('tinymce not loaded');
			}
	  });

})(jQuery);	  