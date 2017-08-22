<?php

use Yali\Twig as Twig;

// Post Object
global $post;


$post_data = Yali\API::get_post($post->ID);
$feat_img_obj = !empty($post_data['featured_media']) ? Yali\API::get_featImg_obj($post_data['featured_media']) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj['source_url'] : null;
// Reset post data back to single post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();


$taxonomy_terms = wp_get_post_terms($post->ID, array('category', 'post_tag', 'series'));


// TEMP
$check_host = $_SERVER['SERVER_NAME'];
$social_block = ( $check_host == 'yali.dev.america.gov' ) ? do_shortcode("[content_block id='13313']") : do_shortcode("[content_block id='86']");


$context = array(
  'check_host'      => $check_host,
  'post_data'       => $post_data,
  'header_url'      => $header_url,
  'social_block'    => $social_block,
  'taxonomy_terms'  => $taxonomy_terms
);

// Render template passing in data array
echo Twig::render('single.twig', $context);
