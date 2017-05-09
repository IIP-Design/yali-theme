<?php

// Post Object
global $post;

// Store page number if displaying paginated blog posts
$page_num = blog_list_pagination_num();

// Main data array to pass to template
$context = array();

// Populate array w/ elements needed for page
$context['page_data'] = Yali::get_page($post->ID);
$context['home_sidebar_right'] = Yali::get_sidebar('header-right');
$context['blog_sidebar'] = Yali::get_sidebar('primary-sidebar');
$context['page_num'] = $page_num;
$context['header_menu'] = Yali::get_header_menu();
$context['footer_menu'] = Yali::get_footer_menu();


if( is_page(602) ) {
	$context['blog_list'] = !empty($page_num) ? Yali::get_paginated_posts($page_num) : Yali::get_all_posts();
}

if( is_front_page() ) {
	$context['recent_posts'] = Yali::get_limited_posts(4);
	$context['home_cta'] = Yali::get_sidebar('footer-2');
}

// Render template passing in data array
echo $twig->render('page.twig', $context );