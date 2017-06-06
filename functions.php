<?php

require_once get_stylesheet_directory() . '/includes/autoloader.php';

/**
 * Autoload classes - any class that is in theincludes dir with a '[NAME].class.php file format will be autoloaded'
 */
YALI_Autoloader::register( get_stylesheet_directory() . '/includes/' );


use Yali\Twig as Twig;

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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) ); 
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );

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

	function register_post_types() {
		// this is where you can register custom post types
	}

	function register_taxonomies() {
		// this is where you can register custom taxonomies
	}

	function register_shortcodes() { // content blocks
		// this is where you can register shortcodes
	}

	function enqueue_scripts() {
		wp_enqueue_script( 'semantic-js', get_stylesheet_directory_uri() . '/node_modules/semantic-ui/dist/semantic.min.js', array('jquery'), '2.2.10', true );
		wp_enqueue_script( 'yali-js', get_stylesheet_directory_uri() . '/dist/js/bundle.min.js', array(), CHILD_THEME_VERSION, true );
	}

	function enqueue_styles() {
		wp_enqueue_style( 'semantic-css', get_stylesheet_directory_uri() . '/node_modules/semantic-ui/dist/semantic.min.css', array(), '2.2.10', 'all' );
	}

	function add_to_twig( $twig ) {
		/* add additional contextual functions to twig */
		return $twig;
	}

}

new YaliSite();
