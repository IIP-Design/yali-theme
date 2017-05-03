<?php 

require_once 'inc/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem(get_stylesheet_directory() . '/views');
$twig = new Twig_Environment($loader, array(
	'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());


/*
* WP Functions
*/
$twig_wp_head = new Twig_Function('wp_head', function() {
	return wp_head();
});
$twig->addFunction($twig_wp_head);

$twig_wp_footer = new Twig_Function('wp_footer', function() {
	return wp_footer();
});
$twig->addFunction($twig_wp_footer);

$twig_css_directory = new Twig_Function('theme_path', function() {
	echo get_stylesheet_directory_uri();
});
$twig->addFunction($twig_css_directory);

$twig_site_url = new Twig_Function('site_url', function() {
	echo get_site_url();
});
$twig->addFunction($twig_site_url);

$twig_is_home = new Twig_Function('is_home', function() {
	return is_front_page();
});
$twig->addFunction($twig_is_home);

$twig_is_blog = new Twig_Function('is_blog', function() {
	return is_page(602);
});
$twig->addFunction($twig_is_blog);

$twig_header_img = new Twig_Function('header_img', function() {
	return 'http://yali.rest.dev/wp-content/uploads/sites/4/2014/07/yali_network_banner.png';
});
$twig->addFunction($twig_header_img);



/*
* WP API Methods
*/
function rest_get_page($id) {			
	$request = new WP_REST_Request('GET', '/wp/v2/pages/' . $id);
	$response = rest_do_request($request);
	return $response->data;
}

function rest_get_post($id) {
	$request = new WP_REST_Request('GET', '/wp/v2/posts/' . $id);
	$response = rest_do_request($request);
	return $response->data;	
}

function rest_get_all_posts() {
	$request = new WP_REST_Request('GET', '/wp/v2/posts');
	$response = rest_do_request($request);
	$responseArr = [];
	$responseArr['data'] = $response->data;
	$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
	return $responseArr;
}

function rest_get_paginated_posts($page_num) {
	$request = new WP_REST_Request('GET', '/wp/v2/posts');
	$request->set_param('page', $page_num);
	$response = rest_do_request($request);
	$responseArr = [];
	$responseArr['data'] = $response->data;
	$responseArr['total_pages'] = $response->headers['X-WP-TotalPages'];
	return $responseArr;
}

function rest_get_limited_posts($count) {
	$request = new WP_REST_Request('GET', '/wp/v2/posts');
	$request->set_param('per_page', $count);
	$response = rest_do_request($request);
	return $response->data;
}

function rest_get_sidebar($sidebar) {
	$request = new WP_REST_Request('GET', '/wp-rest-api-sidebars/v1/sidebars/' . $sidebar);
	$response = rest_do_request($request);
	return $response->data;	
}

function rest_get_header_menu() {
	$request = new WP_REST_Request('GET', '/wp-api-menus/v2/menus/2');
	$response = rest_do_request($request);
	return $response->data;	
}

function rest_get_footer_menu() {
	$request = new WP_REST_Request('GET', '/wp-api-menus/v2/menus/3');
	$response = rest_do_request($request);
	return $response->data;	
}

/*
* Utility Functions
*/
function blog_list_pagination_num() {
	$req_params = $_SERVER['REQUEST_URI'];
	$page = preg_replace('/[^0-9]/', '', $req_params);
	return $page;
}



?>