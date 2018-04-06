(function($) {

	tinymce.PluginManager.add('yali_shortcode_dropdown', function(editor, url) {

		editor.addButton('yali_shortcode_dropdown', {
			id: 'yali_shortcode_dropdown',
			text: 'Add a Shortcode',
			icon: false,
      type: 'menubutton',
      menu: [{
        text: 'Add Button',
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
        }, {
          text: 'Add Content Block',
          onClick: function() {
    				editor.windowManager.open({
    					title: 'Add Content Block',
    					url: yaliContentBlocks.contentBlockHtml,
    					width: 500,
    					height: 420,
    					buttons: [{
    						text: 'Insert Into Post',
    						onclick: function() {
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
    					listItems: yaliContentBlocks.updatedBlocksArray
    				});
    			}
      }, {
        text: 'Add Course',
        onClick: function() {
          editor.windowManager.open({
            width: 500,
            height: 155,
            body: [
              {
          			type: 'textbox',
          			name: 'id',
          			label: 'Course ID',
          			value: ''
          		},
          		{
          			type: 'textbox',
          			name: 'exit_page',
          			label: 'Exit Page',
          			placeholder: 'Enter the slug - Ex: /exit-page',
          			value: ''
          		},
          		{
          			type: 'listbox',
                label: 'Course Language',
          			text: 'Select',
          			name: 'language',
          			values: [
          				{ text: 'English', value: 'en' },
          				{ text: 'French', value: 'fr' },
          				{ text: 'Portuguese', value: 'pt' },
          				{ text: 'Spanish', value: 'es' }
          			]
          		}
            ],
            onsubmit: function( e ) {
              editor.insertContent( '[course id="' + e.data.id + '" exit_page="' + e.data.exit_page + '" language="' + e.data.language + '"]' );
            }
          })
        }
      }, {
        text: 'Add Screendoor',
        onClick: function() {
          editor.windowManager.open({
            width: 500,
            height: 150,
            body: [
              {
          			type: 'textbox',
          			name: 'embed',
          			label: 'Embed Token',
          			value: ''
          		},
          		{
          			type: 'textbox',
          			name: 'project',
          			label: 'Project ID',
          			value: ''
          		},
              {
          			type: 'listbox',
          			name: 'autosend',
          			label: 'Autosend',
                values: [
          				{ text: 'Yes', value: 'true' },
          				{ text: 'No', value: 'false' }
                ]
          		}
            ],
            onsubmit: function( e ) {
              editor.insertContent( '[screendoor embed="' + e.data.embed + '" project="' + e.data.project + '" autosend='+ e.data.autosend + ']' );
            }
          })
        }
      }]
		});
	});

})(jQuery);
