<?php

/*
* Include Page Templates' CMB2 Fields
*/
foreach( glob(get_stylesheet_directory() . '/includes/wp_custom_tmpl_fields/*.php') as $custom_field_file ) {
	require_once $custom_field_file;
}


/*
* Include Custom Taxonomies
*/
foreach( glob(get_stylesheet_directory() . '/includes/wp_custom_tax/*.php') as $custom_tax_file ) {
	require_once $custom_tax_file;
}


/**
 * Autoload classes - any class that is in the includes dir with a '[NAME]_class.php file format will be autoloaded'
 */
require_once get_stylesheet_directory() . '/includes/autoloader.php';

YALI_Autoloader::register( get_stylesheet_directory() . '/includes/' );

use Yali\Twig as Twig;
use Yali\Content_Block as Content_Block;
use Yali\Content_Block_Shortcode as Content_Block_Shortcode;

class YaliSite {

	/**
	 * Initializes theme
	 * Addtional initialization is done within the Corona theme, i.e. theme support, textdomain, etc
	 * @see corona/lib/init.php
	 * @param  string $dir absolute path to twig template directory
	 */
	function __construct() {
		add_filter( 'corona_add_constants', array( $this, 'add_constants' ) );

		add_filter( 'twig_init', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_shortcodes' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) ); 
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) ); 
	
		$this->twig_init();
	}

	function twig_init() {
		Twig::$locations = array( 'templates' );
		Twig::init();
	}

	function add_constants( $constants ) {
		$yali_constants = array(
			'CHILD_THEME_VERSION' => corona_get_theme_version( get_stylesheet_directory() . '/version.json' )
		);
		$constants = array_merge( $yali_constants, $constants );
		return $constants;
	}

	/**
     * Registers custom post types
     *
     * @return void
     */
    function register_post_types() {
    	Content_Block::register();
		}

	function register_taxonomies() {
		// this is where you can register custom taxonomies
	}

	function register_shortcodes() {
		Content_Block_Shortcode::register();
	}

	function enqueue_scripts() {
		 	wp_enqueue_script( 'yali-js', get_stylesheet_directory_uri() . '/dist/js/bundle.min.js', array('jquery'), CHILD_THEME_VERSION, true );
	}

	function admin_enqueue_scripts() {
			wp_enqueue_style( 'yali-admin-css', get_stylesheet_directory_uri() . '/style-admin.css' );
	}

	function add_to_twig( $twig ) {
		/* add additional contextual functions to twig */
		return $twig;
	}

}

new YaliSite();


/*
* Add excerpt to pages
*
*/
add_post_type_support( 'page', 'excerpt' );


/*
* Add Featured Image URL to JSON response
*
*/
add_action('rest_api_init', 'featured_img_register_json');
function featured_img_register_json() {
	register_rest_field(array('post', 'page'), 'featured_img_url', array(
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
* IIP Interactive Plugin Edits
*
*/
require_once get_stylesheet_directory() . '/assets/edit-iip-interactive-plugin/edit-iip-interactive.php';