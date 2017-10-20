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

// Temp
/**
* data (page id, content block shortcode) from dev server otherwise
* from Shawn localhost
**/
// Data for certain pages or shared
$social_block = do_shortcode("[content_block id='13313']");

$formVar = do_shortcode('[formidable id=6]');

// Yali Learns - Campaign Materials Accordion
$campaign_materials_accordion = do_shortcode("[content_block id='13615' title='Yali Learns Campaign Materials']");

// Data array for twig
$context = array(
  "check_host"    => $check_host,
  "pagename"      => $pagename,
  "page_data"     => $page_data,
  "header_url"    => $header_url,
  "feat_img"      => $feat_img_obj,
  "srcset"		    => $srcset,
  "sizes"		      => $sizes,
  "social_block"  => $social_block,
  "formVar"       => $formVar,
  'category_list' => $categories,
  'series_list'   => $series,
  'campaign_materials_accordion'  => $campaign_materials_accordion
);

echo Twig::render( array( "pages/page-" . $pagename . ".twig", "page.twig" ), $context );
