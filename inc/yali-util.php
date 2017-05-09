<?php

class Yali {

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
		
		if( $taxonomy == 'post_tag' ) {
			$request->set_param('tags', $filter);
		}

		if( $taxonomy == 'category' ) {
			$request->set_param('category', $filter);	
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
			$request->set_param('category', $filter);	
		}
		
		$request->set_param('page', $page_num);

		$response = rest_do_request($request);
		$responseArr = [];
		$responseArr['data'] = $response->data;
		$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
		return $responseArr;
	}

	public static function get_sidebar($sidebar) {
		$request = new WP_REST_Request('GET', '/wp-rest-api-sidebars/v1/sidebars/' . $sidebar);
		$response = rest_do_request($request);
		return $response->data;	
	}

	public static function get_header_menu() {
		$request = new WP_REST_Request('GET', '/wp-api-menus/v2/menus/2');
		$response = rest_do_request($request);
		return $response->data;	
	}

	public static function get_footer_menu() {
		$request = new WP_REST_Request('GET', '/wp-api-menus/v2/menus/3');
		$response = rest_do_request($request);
		return $response->data;	
	}

}