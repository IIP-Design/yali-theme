<?php

use Yali\Twig as Twig;

global $post;

$queried_object = get_queried_object();
$filter = $queried_object->term_id;
$taxonomy = $queried_object->taxonomy;


// TEMP
$check_host = $_SERVER['SERVER_NAME'];

$context = array(
	'check_host'      => $check_host,
	'archive_query'   => $queried_object->name,
	'taxonomy'        => ( $taxonomy == 'post_tag' ) ? 'tag' : $taxonomy,
	'filter_slug'     => $queried_object->slug,
	'blog_list'       => Yali\API::get_archive_posts($filter, $taxonomy)
);

echo Twig::render('archive.twig', $context);