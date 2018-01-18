<?php

use Yali\Site as Site;

class Twig_YALI_Extension extends Twig_Extension implements Twig_Extension_GlobalsInterface {
    
	public function getGlobals() {
		return array(
			'site' 		=> new Site(),
			'context' => array()
		);
  }

	 public function getTests() {
		return array();
  }
    
	public function getFunctions() {
		return array(
			new Twig_Function( 'wp_head', 										array($this, 'wp_head') ),
			new Twig_Function( 'wp_title', 										array($this, 'wp_title') ),	
			new Twig_Function( 'body_class', 									array($this, 'body_class') ),
			new Twig_Function( 'language_attributes', 				array($this, 'language_attributes') ),
			new Twig_Function( 'wp_footer', 									array($this, 'wp_footer') ),
			new Twig_Function( 'is_front_page', 							array($this, 'is_front_page') ),
			new Twig_Function( 'is_home', 										array($this, 'is_home') ),
			new Twig_Function( 'is_single', 									array($this, 'is_single') ),
			new Twig_Function( 'is_page', 										array($this, 'is_page') ),
		  	new Twig_Function( 'is_archive', 									array($this, 'is_archive') ), 
		  	new Twig_Function( 'get_pagename', 									array($this, 'get_pagename') ),	  	

			new Twig_Function( 'corona_entry_footer_output', 	array($this, 'corona_entry_footer_output') ),  
			new Twig_Function( 'corona_get_header_image_tag', array($this, 'corona_get_header_image_tag') ),
			
			new Twig_Function( 'tha_html_before', 						array($this, 'tha_html_before') ),  
			new Twig_Function( 'tha_head_top', 								array($this, 'tha_head_top') ),
			new Twig_Function( 'tha_head_bottom', 						array($this, 'tha_head_bottom') ),
			new Twig_Function( 'tha_body_top', 								array($this, 'tha_body_top') ),
			new Twig_Function( 'tha_body_bottom', 						array($this, 'tha_body_bottom') ),
			new Twig_Function( 'tha_header_before', 					array($this, 'tha_header_before') ),
			new Twig_Function( 'tha_content_before',					array($this, 'tha_content_before') ),
			new Twig_Function( 'tha_content_after', 					array($this, 'tha_content_after') ),
			new Twig_Function( 'tha_content_top',						 	array($this, 'tha_content_top') ),
			new Twig_Function( 'tha_content_bottom', 					array($this, 'tha_content_bottom') ),
			new Twig_Function( 'tha_footer_after', 						array($this, 'tha_footer_after') ),
			new Twig_Function( 'tha_footer_top', 							array($this, 'tha_footer_top') ),
			new Twig_Function( 'tha_footer_bottom', 					array($this, 'tha_footer_bottom') )
		);
    }

		
	// add wordpress functions
	public function wp_head() { return wp_head(); }
	public function wp_title() { return wp_title(); }
	public function body_class() { return body_class(); }
	public function language_attributes() { return language_attributes(); }
	public function wp_footer() { return wp_footer(); }
	public function is_front_page() { return is_front_page(); }
	public function is_home() { return is_home(); }
	public function is_single() { return is_single(); }
	public function is_page() { return is_page(); }
	public function is_archive() { return is_archive(); }
	public function the_post_thumbnail() { return the_post_thumbnail(); }
	public function get_pagename() { return get_query_var('pagename'); }	

	// add corona functions
	public function corona_entry_footer_output() {  return corona_entry_footer_output(); }
	public function corona_get_header_image_tag() {  return corona_get_header_image_tag(); }

	// add tha hook functions
	public function tha_html_before() { return tha_html_before(); }
	public function tha_head_top() { return tha_head_top(); }
	public function tha_head_bottom() { return tha_head_bottom(); }

	public function tha_body_top() { return tha_body_top(); }
	public function tha_body_bottom() { return tha_body_bottom(); }

	public function tha_header_before() { return tha_header_before(); }
	
	public function tha_content_before() { return tha_content_before(); }
	public function tha_content_after() { return tha_content_after(); }
	public function tha_content_top() { return tha_content_top(); }
	public function tha_content_bottom() { return tha_content_bottom(); }
	
	public function tha_footer_after() { return tha_footer_after(); }
	public function tha_footer_top() { return tha_footer_top(); }
	public function tha_footer_bottom() { return tha_footer_bottom(); }
}

