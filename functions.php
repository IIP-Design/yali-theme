<?php

require_once get_stylesheet_directory() . '/includes/autoloader.php';

/**
 * Autoload classes - any class that is in the includes dir with a '[NAME]_class.php file format will be autoloaded'
 */
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
		Twig::$locations = array( 'templates', 'views' );
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
		//add_shortcode( 'content_block', array($this, 'render_content_block') );
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
