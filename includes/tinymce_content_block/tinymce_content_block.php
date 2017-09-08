<?php

add_action('init', 'content_block_list');
if( !function_exists('content_block_list') ) {
	function content_block_list() {		
		if( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
			return;
		}

		add_filter('mce_external_plugins', 'cbl_add_buttons');
		add_filter('mce_buttons', 'cbl_register_buttons');
	}
}

if( !function_exists('cbl_add_buttons') ) {
	function cbl_add_buttons($plugin_array) {		
		$plugin_array['yali_cb_list'] = get_stylesheet_directory_uri() . '/includes/tinymce_content_block/content_block_list.js';
		return $plugin_array;
	}	
}

if( !function_exists('cbl_register_buttons') ) {
	function cbl_register_buttons($buttons) {
		array_push($buttons, 'yali_cb_list');		
		return $buttons;
	}
}


// HTTP Request - Populate active TinyMCE Editor w/ Content Block List
add_action('admin_footer', function() {
	wp_enqueue_script('tinymce_content_block_data_request', get_stylesheet_directory_uri() . '/includes/tinymce_content_block/content_block_data_request.js', array('jquery') );
	wp_localize_script('tinymce_content_block_data_request', 'yaliContentBlocks', array(
		'dataUrl' => get_site_url() . '/wp-json/wp/v2/content_block'		
	));
});

