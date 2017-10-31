<?php

namespace Yali;

use Yali\API as API;

class Site {

	public $blogname;
	public $charset;
	public $description;
	public $id;
	public $language;
	public $language_attributes;
	public $name;
	public $pingback_url;
	public $siteurl;
	public $title;
	public $url;
	public $site_url;   // wp core file location
	public $theme_url;
	public $check_host;

	public function __construct() {
    $this->init();
  }

  protected function init() {
    $blog_id = get_current_blog_id();
		$this->url = home_url();
    	$this->site_url = site_url();
		$this->theme_url = get_stylesheet_directory_uri();
    	$this->name = get_bloginfo( 'name' );
		$this->title = $this->name;
		$this->description = get_bloginfo( 'description' );
		$this->language = get_bloginfo( 'language' );
		$this->charset = get_bloginfo( 'charset' );
		$this->pingback = $this->pingback_url = get_bloginfo( 'pingback_url' );	
		$this->check_host = $_SERVER['SERVER_NAME'];
	}
  
  /**
	 * Returns the link to the site's home.
   */
  public function link() {
		return $this->url;
	}

	/**
	 * Reutrns menu
	 *
	 * @param int $menu_id id of menu
	 * @return array menu items
	 */
	public function get_menu( $menu_id ) {
		return API::get_menu( $menu_id );
	}
}