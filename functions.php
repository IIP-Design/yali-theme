<?php

/**
 * Autoload classes - any class that is in the includes dir with a '[NAME]_class.php file format will be autoloaded'
 */
require_once get_stylesheet_directory() . '/includes/autoloader.php';

YALI_Autoloader::register( get_stylesheet_directory() . '/includes/' );

use Yali\Twig as Twig;
use Yali\Content_Block as Content_Block;
use Yali\Content_Block_Shortcode as Content_Block_Shortcode;
use Yali\Custom_Button as Custom_Button;
use Yali\Custom_Button_Shortcode as Custom_Button_Shortcode;
use Yali\Bios as Bios;
use Yali\Content_Type_Tax as Content_Type_Tax;
use Yali\Series_Tax as Series_Tax;

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

		/*
		* Register JSON Data to WP API
		*/
		require_once 'includes/wp_api_register_json.php';

		/*
		* Include Page Templates' CMB2 Fields
		*/
		foreach( glob(get_stylesheet_directory() . '/includes/wp_custom_tmpl_fields/*.php') as $custom_field_file ) {
			require_once $custom_field_file;
		}

		/*
		* Add Content Block Select List to TinyMCE - must be after Yali_Autoloader
		*/
		require_once 'includes/tinymce_content_block/tinymce_content_block.php';

		/*
		* Add excerpt to pages
		*/
		add_post_type_support( 'page', 'excerpt' );

		/*
		* Excerpt Read More
		*/
		add_action('init', 'excerpt_more_override');
		function excerpt_more_override() {
			remove_filter('excerpt_more', 'corona_excerpt_read_more');
			add_filter('excerpt_more', function($more) {
				global $post;
				return '&nbsp; <a href="' . get_permalink($post->ID) . '"> Read More...</a>';
			});
		}

		/*
		* IIP Interactive Plugin Edits
		*/
		require_once get_stylesheet_directory() . '/includes/edit-iip-interactive-plugin/edit-iip-interactive.php';		
	}

	function twig_init() {
		Twig::$locations = array( 'twig-templates' );
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
		Custom_Button::register();
		Bios::register();
	}

	function register_taxonomies() {
		// this is where you can register custom taxonomies		
		Content_Type_Tax::register();
		Series_Tax::register();
	}

	function register_shortcodes() {
		Content_Block_Shortcode::register();
		Custom_Button_Shortcode::register();
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
