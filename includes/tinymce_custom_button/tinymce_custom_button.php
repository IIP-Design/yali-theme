<?php

add_action('init', 'custom_button');
if( !function_exists('custom_button') ) {
	function custom_button() {
		if( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
			return;
		}

		add_filter('mce_external_plugins', 'custom_button_add_buttons');
		add_filter('mce_buttons', 'custom_button_register_buttons');
	}
}

if( !function_exists('custom_button_add_buttons') ) {
	function custom_button_add_buttons($plugin_array) {
		$plugin_array['yali_custom_button'] = get_stylesheet_directory_uri() . '/includes/tinymce_custom_button/js/custom_button.js';
		return $plugin_array;
	}
}

if( !function_exists('custom_button_register_buttons') ) {
	function custom_button_register_buttons($buttons) {
		array_push($buttons, 'yali_custom_button');
		return $buttons;
	}
}

// Style tinymce button
add_action('admin_head', function() {
	if( function_exists('get_current_screen') ) {
		$screen = get_current_screen();
		if( $screen->base == 'post' ) {
			wp_enqueue_style('yali_add_custom_button_tinymce_button', get_stylesheet_directory_uri() . '/includes/tinymce_custom_button/css/add_custom_button_tinymce_button.css');
		}
	}
});
