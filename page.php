<?php

use Yali\Twig as Twig;

// Post Object
global $post;
$pagename = get_query_var("pagename");

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

// Taxonomy data
$categories = Yali\API::get_category_list();
$series = get_terms('series');

// Data for certain pages or shared
$social_block = do_shortcode("[content_block id='14264']");
$courses_faq = do_shortcode("[content_block id='13942']");
$featured_course = do_shortcode("[content_block id='13772']");

// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

// Hero Title Display
$hero_title_display = get_post_meta($post->ID, 'hero_title_option', true);

// Do not index to CDP option
$donot_index = get_post_meta($post->ID, 'donot_index_option', true);


if( $pagename === 'action' ) {
  $campaigns = ( $check_host == 'yali.dev.america.gov' || $check_host == 'yalibeta.edit.america.gov' || $check_host == 'yali.state.gov' ) ? Yali\API::get_child_pages(13240) : Yali\API::get_child_pages(8);
  wp_reset_postdata();
}

// Data array for twig
$context = array(
  'check_host'    => $check_host,
  'pagename'      => $pagename,
  'page_data'     => $page_data,
  'header_url'    => $header_url,
  'feat_img'      => $feat_img_obj,
  'srcset'		    => $srcset,
  'sizes'		      => $sizes,
  'hero_title_display' => $hero_title_display,
  'donot_index'   => $donot_index,
  'social_block'  => $social_block,
  'formVar'       => $formVar,
  'category_list' => $categories,
  'series_list'   => $series,
  'courses_faq'   => $courses_faq,
  'featured_course' => $featured_course,
  'campaign_materials_accordion'  => $campaign_materials_accordion,
  'campaigns'       => ( $pagename === 'action' ) ? $campaigns : null
);

echo Twig::render( array( "pages/page-" . $pagename . ".twig", "page.twig" ), $context );
