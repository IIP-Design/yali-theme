<?php
/*
Template Name: Campaigns Template
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

$social_block = do_shortcode("[content_block id='14264']");

// Query for all Campaign Pages
$args = array(
  'post_type' => 'page',
  'meta_key' => 'campaign_page',
  'meta_value' => 'true'
);

$get_campaign_pages = new WP_Query($args);
wp_reset_postdata();

$campaign_pages = $get_campaign_pages->posts;
foreach ($campaign_pages as $item) {
  $item_id = $item->ID;

  if( has_post_thumbnail($item_id) ) {
    $image_arr = wp_get_attachment_image_src( get_post_thumbnail_id($item_id), 'full' );
    $image_src = $image_arr[0];
    $item->featured_image_src = $image_src;
  } else {
    return;
  }
}

// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

// Yali Learns - Campaign Materials Accordion
$campaign_materials_accordion = do_shortcode("[content_block id='13615' title='Yali Learns Campaign Materials']");

// Promo Items
$promo_data = get_post_meta($post->ID, 'campaigns_promo_repeat_group', true);

// Organize an Event Files
$orgevent_data = get_post_meta($post->ID, 'campaigns_orgevent_repeat_group', true);

// Alumni Vids
$alumni_vids = get_post_meta($post->ID, 'campaigns_alumnvids_repeat_group', true);
$alumni_vids_formatted = [];
if( !empty($alumni_vids) ) {
  foreach ($alumni_vids as $vid => $value) {
      $temp = [];
      $temp['english'] = wp_oembed_get($value['youtube_video']);
      $temp['french'] = wp_oembed_get($value['youtube_french_video']);

    array_push($alumni_vids_formatted, $temp);
  }
}

/********************************** 
    CAMPAIGN SPECIFIC BLOCKS 
***********************************/
// Africa4Her specific
$africa4her_course = do_shortcode("[content_block id='14592' title='Take the course']");
$africa4her_post_list = do_shortcode("[content_block id='14637' title='Learn more about the rights of women and girls']");

// YALIUnites
$yaliunites_course = do_shortcode("[content_block id='14706' title='Take the course']");
$yaliunites_post_list = do_shortcode("[content_block id='14666' title='What's the harm?']");

// YALIServes
$yaliserves_course = do_shortcode("");
$yaliserves_post_list = do_shortcode("[content_block id='14002' title='Make everyday Mandela Day']");

// YALIGoesGreen
$yaligoesgreen_course = do_shortcode("[content_block id='14730' title='Take the courses']");
$yaligoesgreen_post_list = do_shortcode("[content_block id='14725' title='Read about ways to go green in your community']");

// Data array for twig
$context = array(
  "pagename"    	  => $pagename,
  "page_data"   	  => $page_data,
  "header_url"  	  => $header_url,
  "feat_img"    	  => $feat_img_obj,
  "srcset"			    => $srcset,
  "size"			      => $sizes,
  "social_block"  	=> $social_block,
  "campaign_pages"	=> $campaign_pages,
  "promo_data"	 	  => $promo_data,
  "orgevent_data"	  => $orgevent_data,
  "alumni_vids"     => $alumni_vids_formatted,
  "campaign_materials_accordion"  => $campaign_materials_accordion,
  "formVar"         => $formVar,
  "africa4her_course" => $africa4her_course,
  "africa4her_post_list" => $africa4her_post_list,
  "yaliunites_course" => $yaliunites_course,
  "yaliunites_post_list"  => $yaliunites_post_list,
  "yaliserves_course" => $yaliserves_course,
  "yaliserves_post_list" => $yaliserves_post_list,
  "yaligoesgreen_course" => $yaligoesgreen_course,
  "yaligoesgreen_post_list" => $yaligoesgreen_post_list
);


echo Twig::render( 'pages/page-' . $pagename . '.twig', $context );
