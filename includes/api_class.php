<?php

namespace Yali;

use WP_REST_Request;

class API {

    public static function do_request( $request ) {
		$response = rest_do_request( $request );
		return $response->data;	
	}

    public static function debug( $obj ) {
	 	echo '<pre>'; 
		var_dump( $obj );
		echo '</pre>'; 
	}

    public static function get_page($id) {			
		$request = new WP_REST_Request('GET', '/wp/v2/pages/' . $id);
		$response = rest_do_request($request);
		return $response->data;
	}

	public static function get_post($id) {
		$request = new WP_REST_Request('GET', '/wp/v2/posts/' . $id);
		$response = rest_do_request($request);
		return $response->data;	
	}

	public static function get_all_posts() {
		$request = new WP_REST_Request('GET', '/wp/v2/posts');
		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_paginated_posts($page_num) {
		$request = new WP_REST_Request('GET', '/wp/v2/posts');
		$request->set_param('page', $page_num);
		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_limited_posts($count) {
		$request = new WP_REST_Request('GET', '/wp/v2/posts');
		$request->set_param('per_page', $count);
		$response = rest_do_request($request);
		return $response->data;
	}

	public static function get_archive_posts($filter, $taxonomy) {
		$request = new WP_REST_Request('GET', '/wp/v2/posts');

		switch ($taxonomy) {
			case 'post_tag':
				$request->set_param('tags', $filter);
				break;

			case 'category':
				$request->set_param('categories', $filter);
				break;

			case 'series':
				$request->set_param('series', $filter);
				break;

			case 'content_type':
				$request->set_param('content_type', $filter);
				break;
			
			default:				
				break;
		}
		
		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_paginated_archive_posts($filter, $taxonomy, $page_num) {
		$request = new WP_REST_Request('GET', '/wp/v2/posts');
		
		if( $taxonomy == 'post_tag' ) {
			$request->set_param('tags', $filter);
		}

		if( $taxonomy == 'category' ) {
			$request->set_param('categories', $filter);	
		}
		
		$request->set_param('page', $page_num);

		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_contentblock($id) {
		$request = new WP_REST_Request('GET', '/wp/v2/content_block/' . $id);
		$response = rest_do_request($request);
		return $response->data;	
	}

	public static function get_all_contentblocks() {
		$request = new WP_REST_Request('GET', '/wp/v2/content_block');
		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_bio($id) {
		$request = new WP_REST_Request('GET', '/wp/v2/bios/' . $id);
		$response = rest_do_request($request);
		return $response->data;	
	}

	public static function get_all_bios() {
		$request = new WP_REST_Request('GET', '/wp/v2/bios');
		$response = rest_do_request($request);		
		return $response->data;;
	}

	public static function get_sidebar($sidebar) {
		$request = new WP_REST_Request('GET', '/wp-rest-api-sidebars/v1/sidebars/' . $sidebar);
		return self::do_request( $request );
	}

	public static function get_menu( $id ) {
		$request = new WP_REST_Request( 'GET', '/wp-api-menus/v2/menus/' . $id );
		$menu = self::do_request( $request );
		return ( isset($menu['items']) ) ? $menu['items'] : '';
	}

	public static function get_featImg_obj($id) {
		$request = new WP_REST_Request('GET', '/wp/v2/media/' . $id);
		$response = rest_do_request($request);
		return $response->data;	
	}	

	public static function get_child_pages($parent_page_id) {
		$request = new WP_REST_Request('GET', '/wp/v2/pages');
		$request->set_param('parent', $parent_page_id);
		return self::do_request($request);
	}

	public static function get_category_list() {
		$request = new WP_REST_Request('GET', '/wp/v2/categories');
		$request->set_param('per_page', 100);
		return self::do_request($request);
	}

	public static function get_category_info($category_id) {
		$request = new WP_REST_Request('GET', '/wp/v2/categories/' . $category_id);		
		return self::do_request($request);
	}

}
