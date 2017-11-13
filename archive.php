<?php

use Yali\Twig as Twig;

global $post;

$queried_object = get_queried_object();

$filter = $queried_object->term_id;
$taxonomy = $queried_object->taxonomy;
if( isset($taxonomy) ) {
	$term = $queried_object->slug; // $queried_object->name;
}

// A post list content block was created and referenced here
// Need to do this differently as it is referecing a hard coded value
$filtered_post_block = do_shortcode("[content_block id='16219' taxonomy='$taxonomy' term='$term']"); // dev: 13979, prod: 16219

// TEMP
$check_host = $_SERVER['SERVER_NAME'];

$formVar = do_shortcode('[formidable id=6]');

$context = array(
	'check_host'      		=> $check_host,
	'formVar'         		=> $formVar,
	'archive_query'   		=> $queried_object->name,
	'archive_type'        => ( $taxonomy == 'post_tag' ) ? 'tag' : $taxonomy,
	'archive_name'				=> $queried_object->name,
	'archive_slug'     		=> $queried_object->slug,
	'filtered_post_block' => $filtered_post_block, 
	'header_url'	  			=> get_stylesheet_directory_uri() . '/assets/img/default_background.jpg'
);

echo Twig::render('archive.twig', $context);