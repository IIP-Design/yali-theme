(function($) {	
	
	tinymce.PluginManager.add('yali_cb_list', function(editor, url) {
		
		editor.addButton('yali_cb_list', {
			type: 'listbox',
			text: 'Add Content Block',
			icon: false,			
			values: tinymce.activeEditor.settings.contentBlockValues,
			onselect: function() {
				var shortcode = this.value()
				editor.insertContent( shortcode );
			}		
		});
	});	
	
})(jQuery);