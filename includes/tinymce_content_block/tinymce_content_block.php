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
		$plugin_array['yali_cb_list'] = get_stylesheet_directory_uri() . '/includes/tinymce_content_block/js/content_block_list.js';
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

	if( function_exists('get_current_screen') ) {
		
		// check if post, page or content block edit screen
		$screen = get_current_screen();		
		if( $screen->base == 'post' ) {
			
			$blocks = get_posts(array( 'post_type' => 'content_block', 'posts_per_page' => -1 ));
			wp_reset_postdata();

			// format content blocks data for use for tinymce in yaliContentBlocks global var
			wp_enqueue_script('tinymce_content_block_data_format', get_stylesheet_directory_uri() . '/includes/tinymce_content_block/js/content_block_data_format.js', array('jquery') );
			wp_localize_script('tinymce_content_block_data_format', 'yaliContentBlocks', array(		
				'contentBlockHtml' => get_stylesheet_directory_uri() . '/includes/tinymce_content_block/html/contentBlockList.html',
				'contentBlocks' => $blocks
			));			
		}
	}		
});

// Style tinymce button
add_action('admin_head', function() {	
	if( function_exists('get_current_screen') ) {
		$screen = get_current_screen();		
		if( $screen->base == 'post' ) {
			wp_enqueue_style('yali_add_content_block_tinymce_button', get_stylesheet_directory_uri() . '/includes/tinymce_content_block/css/add_content_block_tinymce_button.css');
		}
	}
});