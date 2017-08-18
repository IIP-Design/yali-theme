<?php

use Yali\Twig as Twig;

// Post Object
global $post;
$pagename = get_query_var("pagename");

// Page data
$page_data = Yali\API::get_page($post->ID);
$feat_img_obj = !empty($page_data["featured_media"]) ? Yali\API::get_featImg_obj($page_data["featured_media"]) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj["source_url"] : null;
// Reset post data back to post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();

$img_id = get_post_thumbnail_id( $post->ID );
$srcset = wp_get_attachment_image_srcset($img_id, "full");
$sizes = wp_get_attachment_image_sizes($img_id, "full");


// Temp
/**
* data (page id, content block shortcode) from dev server otherwise
* from Shawn localhost
**/
$check_host = $_SERVER['SERVER_NAME'];
$social_block = ( $check_host == 'yali.dev.america.gov' ) ? do_shortcode("[content_block id='13313']") : do_shortcode("[content_block id='86']");
$campaigns = ( $check_host == 'yali.dev.america.gov' ) ? Yali\API::get_child_pages(13) : Yali\API::get_child_pages(8);

// Data array for twig
$context = array(
  "check_host"    => $check_host,
  "page_data"     => $page_data,
  "header_url"    => $header_url,  
  "feat_img"      => $feat_img_obj,
  "srcset"		  => $srcset,
  "sizes"		  => $sizes,
  "social_block"  => $social_block,
  "campaigns"     => $campaigns
);


echo Twig::render( array( "page-" . $pagename . ".twig", "page.twig" ), $context );