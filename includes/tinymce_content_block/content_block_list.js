(function($) {	
	
	window.yali_cb_values = tinymce.activeEditor.settings.contentBlockValues;	

	tinymce.PluginManager.add('yali_cb_list', function(editor, url) {
		
		editor.addButton('yali_cb_list', {
			//type: 'textbox',
			text: 'Add Content Block',
			icon: false,			
			values: window.yali_cb_values,
			onClick: function() {
				editor.windowManager.open({
					title: 'Add Content Block',
					url: yaliContentBlocks.contentBlockHtml,
					width: 500,
					height: 500,
					buttons: [{
						text: 'Insert Into Post',
						onclick: function() {	
							console.log('content block js: ', tinymce.activeEditor.selectedBlocks);
							tinymce.activeEditor.selectedBlocks.map(function(block) {
								tinymce.activeEditor.execCommand('mceInsertContent', false, '<p>' + block + '</p>') ;
							});
							top.tinymce.activeEditor.windowManager.close();
						}	
					}, {
						text: 'Cancel',
						onclick: 'close'
					}]
				},
				{			
					listItems: window.yali_cb_values
				});
			}			
		});
	});	
	
})(jQuery);