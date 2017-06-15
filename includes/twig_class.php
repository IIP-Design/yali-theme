<?php

/**
 * use YALI namespace to avoid potential conflicts
 */
namespace Yali;

use Twig_Environment;
use Twig_Loader_Filesystem;
use Twig_Extension_Debug;
use Twig_Function;
use Twig_YALI_Extension;

class Twig {

  public static $locations;     // locations to look for templates
  public static $context;         
  public static $autoescape;    // Twig escape strathey
  protected static $twig;       // stores Twig singleton instance
  protected static $loader;     // Twig_Loader_Filesystem loader

  public static function init() {
		 new self();
	}

  public function __construct() {
    self::$loader = new Twig_Loader_Filesystem( self::$locations,  get_stylesheet_directory() ); 
    
    $params = array('debug' => WP_DEBUG, 'autoescape' => false);
		if ( isset(self::$autoescape) ) {
			$params['autoescape'] = self::$autoescape;
		}
    $twig = new Twig_Environment( self::$loader, $params );

    if ( WP_DEBUG ) {
			$twig->addExtension( new Twig_Extension_Debug() );
		}

    // add all Wordpress, Yali, Corona functions, filters, globals etc via single extension
    $twig->addExtension( new Twig_YALI_Extension() );

    // allow addtional Twig configuration to be registered
    $twig = apply_filters('twig_init', $twig);

    self::$twig = $twig;
  }

  /**
   * Render Twig template to page (twig pass thru).  Expose a static method for use in all pages
   *
   * @param string $template template to use
   * @param array $context context data that template uses
   * @return void
   * 
   * @todo Allow for an array of templates to be added
   */
  public static function render( $templates, $context ) {
    $template = self::pick_template( $templates );
    return self::$twig->render( $template, $context );
	}

  /**
	 * @param array $templates
	 * @return string
	 */
	public static function pick_template( $templates ) {
		if ( is_array($templates) ) {
			/* its an array so we have to figure out which one to send */
			foreach ( $templates as $template ) {
				if ( self::template_exists($template) ) {
					return $template;
				}
			}
			return $templates[0];
		}
		return $templates;
	}

  /**
	 * @param string $file
	 * @return bool
	 */
	protected static function template_exists( $file ) {
		foreach ( self::$loader->getPaths() as $dir ) {
			$look_for = get_stylesheet_directory() . '/' . $dir . '/' . $file;
			if ( file_exists($look_for) ) {
				return true;
			}
		}
		return false;
	}
}

