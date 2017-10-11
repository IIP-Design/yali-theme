<?php

/*
* Add Featured Image URL to JSON response
*
*/
add_action('rest_api_init', 'featured_img_register_json');
function featured_img_register_json() {
	register_rest_field(array('post', 'page', 'bios'), 'featured_img_url', array(
		'get_callback' => 'featured_img_url'
	));
}

function featured_img_url($post, $request) {
	return ( has_post_thumbnail($post['id']) ) ? wp_get_attachment_url(get_post_thumbnail_id($post['id'])) : false;
}


/*
* Add Post Tag Names to JSON Response
*
*/
add_action('rest_api_init', 'tag_names_register_json');
function tag_names_register_json() {
	register_rest_field(array('post'), 'post_tag_names', array(
		'get_callback' => 'post_tag_names'
	));
}

function post_tag_names($post, $request) {
	return $post_tag_names = get_the_tags($post['id']);
}


/*
* Add Post Category Names to JSON Response
*
*/
add_action('rest_api_init', 'category_name_register_json');
function category_name_register_json() {
	register_rest_field(array('post'), 'post_category_names', array(
		'get_callback' => 'post_category_names'
	));
}

function post_category_names($post, $request) {
	return $post_tag_names = get_the_category($post['id']);
}


/*
* Add Series Custom Taxonomy Data to JSON Response
*
*/
add_action('rest_api_init', 'series_name_register_json');
function series_name_register_json() {
	register_rest_field(array('post'), 'post_series_names', array(
		'get_callback' => 'post_series_names'
	));
}

function post_series_names($post, $request) {
	return $post_series_names = get_the_terms($post['id'], 'series');
}


/*
* Add Content Type Custom Taxonomy Data to JSON Response
*
*/
add_action('rest_api_init', 'content_type_name_register_json');
function content_type_name_register_json() {
	register_rest_field(array('post'), 'post_content_type_names', array(
		'get_callback' => 'post_content_type_names'
	));
}

function post_content_type_names($post, $request) {
	return $post_content_type_names = get_the_terms($post['id'], 'content_type');
}


/*
* Add Content Block Shortcode to JSON Response
*
*/
add_action('rest_api_init', 'content_block_shortcode_json');
function content_block_shortcode_json() {
	register_rest_field(array('content_block'), 'display_shortcode', array(
		'get_callback' => 'display_content_block_shortcode'
	));
}

function display_content_block_shortcode($content_block, $request) {
	return $display_shortcode = "[content_block id='" . $content_block['id'] . "' title='" . $content_block['title']['rendered'] . "']";	
}


/*
* Add Bios Title field to JSON Response
*
*/
add_action('rest_api_init', 'bios_title_json');
function bios_title_json() {
	register_rest_field(array('bios'), 'bio_title', array(
		'get_callback' => 'bio_title_field'
	));	
}

function bio_title_field($bio, $request) {
	return $bio_title = get_post_meta($bio['id'], 'yali_bio_title', true);
}
