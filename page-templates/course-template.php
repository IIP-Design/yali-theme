<?php
/*
Template Name: Course Template
*/

use Yali\Twig as Twig;

// Post Object
global $post;
$pagename = get_query_var('pagename');

$check_host = $_SERVER['SERVER_NAME'];

// Page data
$page_data = Yali\API::get_page($post->ID);
$feat_img_obj = !empty($page_data["featured_media"]) ? Yali\API::get_featImg_obj($page_data["featured_media"]) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj["source_url"] : null;
// Reset post data back to post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();

$img_id = get_post_thumbnail_id( $post->ID );
$srcset = wp_get_attachment_image_srcset($img_id, "full");
$sizes = wp_get_attachment_image_sizes($img_id, "full");

// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

$course_language = get_post_meta($post->ID, '_yali_course_lang_indicator', true);

// Data array for twig
$context = array(
  'pagename'    	  => $pagename,
  'page_data'   	  => $page_data,
  'header_url'  	  => $header_url,
  'feat_img'    	  => $feat_img_obj,
  'srcset'			    => $srcset,
  'size'			      => $sizes,
  'formVar'         => $formVar,
  'course_language' => $course_language
);


echo Twig::render( 'pages/course.twig', $context );
