<?php 

require_once 'inc/vendor/autoload.php';

$loader = new Twig_Loader_Filesystem(get_stylesheet_directory() . '/views');
$twig = new Twig_Environment($loader);


function rest_get_page($id) {			
	$request = new WP_REST_Request('GET', '/wp/v2/pages/' . $id);
	$response = rest_do_request($request);
	return $response->data;
}

function rest_get_post($id) {
	$request = new WP_REST_Request('GET', '/wp/v2/posts/' . $id);
	$response = rest_get_server()->dispatch($request);
	return $response->data;	
}

function rest_get_all_posts() {
	$request = new WP_REST_Request('GET', '/wp/v2/posts');
	$response = rest_get_server()->dispatch($request);
	return $response->data;	
}

?>