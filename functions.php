<?php

/**
 * Autoload classes - any class that is in the includes dir with a '[NAME]_class.php file format will be autoloaded'
 */
require_once get_stylesheet_directory() . '/includes/autoloader.php';

/**
 * Require badge generation class
 */
include( get_stylesheet_directory() . '/badge/class-america-badge-generation.php');

/**
 * Add attachment using the Formidable 'frm_notification_attachment' hook
 */

function yali_add_attachment( $attachments, $form, $args ) {
	if ( $form->form_key == 'get_pledge' || $form->form_key == 'get_earthday' || $form->form_key == 'get_yalilearns2016' || $form->form_key == 'get_certificate2' || $form->form_key == 'get_4all') {

		$params = array (
			'key'				=>  $form->form_key,				// form identifier (i.e. project id used to find config)
			'metas'			=>  $args['entry']->metas		// formidable metas passed in via $args that hold field values
		);

		$generator = new America_Badge_Generation ();
		$attachments[] =  $generator->create_image( $params );
 }
	return $attachments;
}

add_filter( 'frm_notification_attachment', 'yali_add_attachment', 10, 3 );

/**
  * Send token data for Course
  */

function localize_nonce() {

  include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
  $requiredplugin = 'wp-simple-nonce/wp-simple-nonce.php';

  if ( is_plugin_active($requiredplugin) ) {
    global $post;

    if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'course' ) ) {
      $nonce = WPSimpleNonce::init( 'certificate', 2592000, true );
      wp_enqueue_script( 'token-js', get_stylesheet_directory_uri() . '/assets/js/token.js', array() );
      wp_localize_script( 'token-js', 'token', $nonce );
    }
  }
}

add_action('wp_enqueue_scripts', 'localize_nonce');

/**
  * Validate token data for Course
  */

add_filter('frm_validate_entry', 'check_nonce', 20, 2);
function check_nonce( $errors, $values ) {

  include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
  $requiredplugin = 'wp-simple-nonce/wp-simple-nonce.php';

  if ( is_plugin_active($requiredplugin) ) {

    if( $values['form_key'] == 'get_certificate2' && strpos($_POST["_wp_http_referer"], 'get-quiz-certificate') !== false && empty($errors) ) {

      $result = WPSimpleNonce::checkNonce($_GET['tokenName'], $_GET['tokenValue']);

      if ( ! $result ) {
         $errors['my_error'] = 'This certificate page has expired. Please return to the quiz and complete it again to generate your certificate.';
      }

    }

  }

  return $errors;
}

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
		add_action( 'admin_init', array( $this, 'admin_remove_menu_pages' ) );
		add_action( 'admin_init', array( $this, 'admin_remove_corona_shortcode_button') );
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
		$module_url = self::cdp_get_option('cdp_module_url');
		$article_feed_js = $module_url . "cdp-module-article-feed/cdp-module-article-feed.min.js";
		$article_feed_css = $module_url . "cdp-module-article-feed/cdp-module-article-feed.min.css";

		wp_enqueue_script( 'artice-feed-js', $article_feed_js, null, '1.0.0', true );
		wp_enqueue_style( 'artice-feed-css', $article_feed_css, null, '1.0.0' );

		wp_enqueue_script( 'yali-js', get_stylesheet_directory_uri() . '/dist/js/bundle.min.js', array('jquery', 'artice-feed-js'), CHILD_THEME_VERSION, true );
	}

	function admin_enqueue_scripts() {
			wp_enqueue_style( 'yali-admin-css', get_stylesheet_directory_uri() . '/style-admin.css' );
	}

	function admin_remove_menu_pages() {
		if ( !current_user_can( 'manage_sites' ) ) {
			remove_menu_page('vc-welcome');
		}
	}

	function admin_remove_corona_shortcode_button(){
		$instance = TinyMce_Btn_Shortcode::instance();
		remove_filter("mce_external_plugins", array ( $instance, 'corona_add_js_to_load' ) );
	}

	function add_to_twig( $twig ) {
		/* add additional contextual functions to twig */
		return $twig;
	}

	// Helpers
	public static function cdp_get_option( $key = '', $default = false ) {
    if ( function_exists( 'cmb2_get_option' ) ) {
      // Use cmb2_get_option as it passes through some key filters.
      return cmb2_get_option( 'cdp_options', $key, $default );
    }

    // Fallback to get_option if CMB2 is not loaded yet.
    $opts = get_option( 'cdp_options', $default );
    $val = $default;

    if ( 'all' == $key ) {
      $val = $opts;
    } elseif ( is_array( $opts ) && array_key_exists( $key, $opts ) && false !== $opts[ $key ] ) {
      $val = $opts[ $key ];
    }

    return $val;
  }

}

new YaliSite();
