<?php

use Yali\Twig as Twig;

global $post;

$queried_object = get_queried_object();
$filter = $queried_object->term_id;
$taxonomy = $queried_object->taxonomy;
if( $taxonomy ) {
	$term = $queried_object->name;
}

// A post list content block was created and referenced here
$filtered_post_block = do_shortcode("[content_block id='16219' taxonomy='$taxonomy' term='$term']");

// TEMP
$check_host = $_SERVER['SERVER_NAME'];

$formVar = do_shortcode('[formidable id=6]');

$context = array(
	'check_host'      		=> $check_host,
	'formVar'         		=> $formVar,
	'archive_query'   		=> $queried_object->name,
	'archive_type'        => ( $taxonomy == 'post_tag' ) ? 'tag' : $taxonomy,
	'archive_name'				=> $queried_object->name,
	'filter_slug'     		=> $queried_object->slug,
	'filtered_post_block' => $filtered_post_block, 
	'header_url'	  			=> get_stylesheet_directory_uri() . '/assets/img/placeholder_img_3x1.png'
);

echo Twig::render('archive.twig', $context);