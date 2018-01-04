(function($) {

	tinymce.PluginManager.add('yali_custom_button', function(editor, url) {

		editor.addButton('yali_custom_button', {
			id: 'yali_add_custom_button',
			text: 'Add Button',
			icon: false,
			onClick: function() {
				editor.windowManager.open({
					title: 'Add Button',
					width: 500,
					height: 255,
					body: [
						{
							type: 'textbox',
							name: 'btn_label',
							label: 'Button Text',
							value: ''
						},
						{
							type: 'textbox',
							name: 'btn_link',
							label: 'Button URL',
							placeholder: 'Enter full URL (including http/https)',
							value: ''
						},
						{
							type: 'checkbox',
							name: 'btn_tab',
							label: 'Open link in new tab?',
							checked: true
						},
						{
							type: 'listbox',
							text: 'Button Color',
							name: 'btn_color',
							values: [
								{ text: 'Navy Blue', value: '#192856' },
								{ text: 'Medium Blue', value: '#174f9f' },
								{ text: 'Light Blue', value: '#25ace2' },
								{ text: 'Yellow', value: '#f2d400' },
								{ text: 'Light Grey', value: '#eeeeee' },
								{ text: 'Red', value: '#bd1125' }
							]
						},
						{
							type: 'listbox',
							text: 'Button Size',
							name: 'btn_size',
							values: [
								{ text: 'Large', value: 'large' },
								{ text: 'Small', value: 'small' },
							]
						},
						{
							type: 'listbox',
							text: 'Button Alignment',
							name: 'btn_align',
							values: [
								{ text: 'Left', value: 'left' },
								{ text: 'Center', value: 'center' },
								{ text: 'Right', value: 'right' }
							]
						}
					],
					onsubmit: function( e ) {
							editor.insertContent( '[custom_button btn_label="' + e.data.btn_label + '" btn_link="' + e.data.btn_link + '" btn_tab="' + e.data.btn_tab + '" btn_color="' + e.data.btn_color + '" btn_size="' + e.data.btn_size + '" btn_align="' + e.data.btn_align + '"]' );
					}
				})
			}
		});
	});

})(jQuery);
