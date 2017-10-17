<?php

use Yali\Twig as Twig;

global $post;

$queried_object = get_queried_object();
$filter = $queried_object->term_id;
$taxonomy = $queried_object->taxonomy;
$series = get_terms('series');


// TEMP
$check_host = $_SERVER['SERVER_NAME'];

$context = array(
	'check_host'      => $check_host,
	'archive_query'   => $queried_object->name,
	'taxonomy'        => ( $taxonomy == 'post_tag' ) ? 'tag' : $taxonomy,
	'filter_slug'     => $queried_object->slug,
	'blog_list'       => Yali\API::get_archive_posts($filter, $taxonomy),
	'category_list'   => Yali\API::get_category_list(),
	'series_list'     => $series,
	'header_url'	  => get_stylesheet_directory_uri() . '/assets/img/placeholder_img_3x1.png'
);

echo Twig::render('archive.twig', $context);