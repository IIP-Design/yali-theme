<?php

use Yali\Twig as Twig;

// Post Object
global $post;


$post_data = Yali\API::get_post($post->ID);
$feat_img_obj = !empty($post_data['featured_media']) ? Yali\API::get_featImg_obj($post_data['featured_media']) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj['source_url'] : null;
// Reset post data back to single post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();

// Get all post taxonomy & remove default 'Uncategorized' category
$taxonomy_terms = wp_get_post_terms($post->ID, array('category', 'post_tag', 'series'));
foreach($taxonomy_terms as $indx => $obj) {
	if( $obj->name == 'Uncategorized' ){
		unset($taxonomy_terms[$indx]);
	}
}

// TEMP
$check_host = $_SERVER['SERVER_NAME'];
$social_block = do_shortcode("[content_block id='13313']");

$formVar = do_shortcode('[formidable id=6]');
$related_content_display = get_post_meta($post->ID, 'related_content_option', true);

$context = array(
  'check_host'      => $check_host,
  'formVar'       	=> $formVar,
	'related_content_display' => $related_content_display,
  'post_data'       => $post_data,
  'header_url'      => $header_url,
  'social_block'    => $social_block,
  'taxonomy_terms'  => $taxonomy_terms
);

// Render template passing in data array
echo Twig::render('single.twig', $context);
