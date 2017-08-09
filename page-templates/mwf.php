<?php
/*
Template Name: Mandela Washington Fellowship
*/

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


/**************
REVISIT - compile shortcodes from cmb2 wysiwyg custom field
- use for IIP-Interactive Plugin for countdown/add to calendar
***************/
$countdown = do_shortcode($page_data['cmb2']['mwf_application']['mwf_application_date']);


// Data array for twig
$context = array(
  "page_data"   => $page_data,
  "header_url"  => $header_url,  
  "feat_img"    => $feat_img_obj,
  "srcset"		=> $srcset,
  "size"		=> $size,
  "countdown"   => $countdown
);


echo Twig::render( '/wp_custom_tmpls/mwf.twig', $context );