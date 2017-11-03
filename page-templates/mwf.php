<?php
/*
Template Name: Mandela Washington Fellowship
*/

use Yali\Twig as Twig;

$check_host = $_SERVER['SERVER_NAME'];

// Post Object
global $post;
$pagename = get_query_var('pagename');

// Page data
$page_data = Yali\API::get_page($post->ID);

// Featured Image
$feat_img_obj = !empty($page_data['featured_media']) ? Yali\API::get_featImg_obj($page_data['featured_media']) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj['source_url'] : null;
// Reset post data back to post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();

$img_id = get_post_thumbnail_id( $post->ID );
$srcset = wp_get_attachment_image_srcset($img_id, 'full');
$size = wp_get_attachment_image_sizes($img_id, 'full');

// Custom Fields Content
$intro = wpautop($page_data['cmb2']['mwf_introduction']['mwf_introduction_content']);
$formatted_intro = do_shortcode($intro);
$about = wpautop($page_data['cmb2']['mwf_about']['mwf_about_fellowship']);
$formatted_about = do_shortcode($about);
$addtl_content = do_shortcode($page_data['cmb2']['mwf_addtl']['mwf_addtl_content']);

// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

// Data array for twig
$context = array(
  "check_host"    => $check_host,
  "pagename"      => $pagename,
  "page_data"     => $page_data,
  "header_url"    => $header_url,
  "feat_img"      => $feat_img_obj,
  "srcset"		    => $srcset,
  "size"		      => $size,
  "intro"		      => $formatted_intro,
  "about"         => $formatted_about,
  "addtl_content" => $addtl_content,
  'formVar'       => $formVar
);


echo Twig::render( 'pages/mwf.twig', $context );
