<?php


global $post;
$page_num = blog_list_pagination_num();


$context = array();
$context['page_data'] = rest_get_page($post->ID);
$context['home_sidebar_right'] = rest_get_sidebar('header-right');
$context['page_num'] = $page_num;

$context['header_menu'] = rest_get_header_menu();
$context['footer_menu'] = rest_get_footer_menu();


if( is_page(602) ) {
	$context['blog_list'] = !empty($page_num) ? rest_get_paginated_posts($page_num) : rest_get_all_posts();
}

if( is_front_page() ) {
	$context['recent_posts'] = rest_get_limited_posts(4);
	$context['home_cta'] = rest_get_sidebar('footer-2');
}


echo $twig->render('page.twig', $context );