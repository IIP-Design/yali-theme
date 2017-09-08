(function($) {	
	$.get('http://yali.rebuild.local/wp/wp-json/wp/v2/content_block')
		.then(function(data){
			var valuesArr = [];

			data.map(function(d) {
				valuesArr.push(
					{ text: d.title.rendered, value: d.display_shortcode }
				);
			});

			tinymce.activeEditor.settings.contentBlockValues = valuesArr;

			console.log('from ajax request: ', tinymce.activeEditor.settings.contentBlockValues);
	  	});

})(jQuery);	  