<?php 

require_once 'inc/yali-util.php';
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

$twig_is_single = new Twig_Function('is_single', function() {
	return is_single();
});
$twig->addFunction($twig_is_single);

$twig_is_page = new Twig_Function('is_page', function() {
	return is_page();
});
$twig->addFunction($twig_is_page);

$twig_is_archive = new Twig_Function('is_archive', function() {
	return is_archive();
});
$twig->addFunction($twig_is_archive);

$twig_header_img = new Twig_Function('header_img', function() {
	return 'http://yali.rest.dev/wp-content/uploads/sites/4/2014/07/yali_network_banner.png';
});
$twig->addFunction($twig_header_img);


/*
* Utility Functions
*/
function blog_list_pagination_num() {
	$req_params = $_SERVER['REQUEST_URI'];
	$page = preg_replace('/[^0-9]/', '', $req_params);
	return $page;
}


/*
* Add Yoast Seo Data to API Response
*/
add_action('rest_api_init', 'yoast_register_data');
function yoast_register_data() {
	register_rest_field(array('post', 'page'), 'yoast_seo', array(
		'get_callback' => 'yoast_seo_data'
	));
}

function yoast_seo_data($object, $request) {
	$yoast_seo = array();
	$yoast_seo['keywords'] = get_post_meta($object['id'], '_yoast_wpseo_focuskw', true);
	$yoast_seo['title'] = get_post_meta($object['id'], '_yoast_wpseo_title', true);
	$yoast_seo['description'] = get_post_meta($object['id'], '_yoast_wpseo_metadesc', true);
	return $yoast_seo;
}


/*
* Add Featured Image URL to JSON response
*/
add_action('rest_api_init', 'featured_img_register_json');
function featured_img_register_json() {
	register_rest_field(array('post'), 'featured_img_url', array(
		'get_callback' => 'featured_img_url'
	));
}

function featured_img_url($post, $request) {
	return ( has_post_thumbnail($post->ID) ) ? wp_get_attachment_url(get_post_thumbnail_id($post->ID)) : false;
}


/*
* Add Post Tag Names to JSON Response
*/
add_action('rest_api_init', 'tag_names_register_json');
function tag_names_register_json() {
	register_rest_field(array('post'), 'post_tag_names', array(
		'get_callback' => 'post_tag_names'
	));
}

function post_tag_names($post, $request) {	
	return $post_tag_names = get_the_tags($post->ID);
}


/*
* Add Post Category Names to JSON Response
*/
add_action('rest_api_init', 'category_name_register_json');
function category_name_register_json() {
	register_rest_field(array('post'), 'post_category_names', array(
		'get_callback' => 'post_category_names'
	));
}

function post_category_names($post, $request) {	
	return $post_tag_names = get_the_category($post->ID);
}


?>