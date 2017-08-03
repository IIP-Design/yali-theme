<?php
/*
Template Name: Regional Leadership Center
*/

// Using custom wordpress template so content block (RLC Participants, Related Content sections) 
// data can be passed to $context array
// (content block data not added below)

use Yali\Twig as Twig;

// Post Object
global $post;
$pagename = get_query_var('pagename');

// Page data
$page_data = Yali\API::get_page($post->ID);
$feat_img_obj = !empty($page_data['featured_media']) ? Yali\API::get_featImg_obj($page_data['featured_media']) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj['source_url'] : null;

$img_id = get_post_thumbnail_id( $post->ID );
$srcset = wp_get_attachment_image_srcset($img_id, 'full');
$size = wp_get_attachment_image_sizes($img_id, 'full');

// Data array for twig
$context = array(
  "page_data"   => $page_data,
  "header_url"  => $header_url,  
  "feat_img"    => $feat_img_obj,
  "srcset"		=> $srcset,
  "size"		=> $size
);


echo Twig::render( '/wp_custom_tmpls/regional-leadership-centers.twig', $context );