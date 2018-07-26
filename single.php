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
$series_slug;
$category_slug;
$tag_slug;
$select_by_taxonomy;
$series_slug_name;
$category_slug_name;
$tag_slug_name;

foreach($taxonomy_terms as $indx => $obj) {
  if( $obj->name == 'Uncategorized' ){
    unset($taxonomy_terms[$indx]);
  }

  if ( $obj->taxonomy === 'series' && !$series_slug ) {
    $series_slug = $obj->slug;
    $series_slug_name = $obj->name;
    $select_by_taxonomy = $obj->taxonomy;
    break;
  } elseif ( $obj->taxonomy === 'category' && $obj->name !== 'Uncategorized' && !$category_slug ) {
    $category_slug = $obj->slug;
    $category_slug_name = $obj->name;
    $select_by_taxonomy = $obj->taxonomy;
  } elseif ( $obj->taxonomy === 'post_tag' && !$tag_slug && !$select_by_taxonomy ) {
    $tag_slug = $obj->slug;
    $tag_slug_name = $obj->name;
    $select_by_taxonomy = 'tag';
  }
}

// Get search indices
$search_indexes = YaliSite::cdp_get_option('cdp_indexes');

// TEMP
$check_host = $_SERVER['SERVER_NAME'];
$social_block = do_shortcode("[content_block id='14264']");

$formVar = do_shortcode('[formidable id=6]');
$related_content_display = get_post_meta($post->ID, 'related_content_option', true);

// Hero Title Display
$hero_title_display = get_post_meta($post->ID, '_yali_hero_title_option', true);
if( empty($hero_title_display) ) {
  update_post_meta($post->ID, '_yali_hero_title_option', 'hide');
  $hero_title_display = get_post_meta($post->ID, '_yali_hero_title_option', true);
}
$hero_subtitle = get_post_meta($post->ID, '_yali_hero_subtitle_option', true);
$hero_attribution_display = get_post_meta($post->ID, '_yali_hero_attribution_option', true );
$hero_attribution_value = get_post_meta($feat_img_obj['id'], '_attribution', true );

$context = array(
  'check_host'      => $check_host,
  'formVar'       	=> $formVar,
	'related_content_display' => $related_content_display,
	'hero_title_display' => $hero_title_display,
	'hero_subtitle' 	=> $hero_subtitle,
  'hero_attribution_display' =>$hero_attribution_display,
  'hero_attribution_value' => $hero_attribution_value,
  'post_data'       => $post_data,
  'header_url'      => $header_url,
  'social_block'    => $social_block,
  'taxonomy_terms'  => $taxonomy_terms,
  'selector'				=> 'feed' . $post->ID,
  'select_by_taxonomy' => $select_by_taxonomy,
  'series_slug'			=> $series_slug,
  'category_slug'		=> $category_slug,
  'tag_slug'				=> $tag_slug,
  'series_slug_name'			=> $series_slug_name,
  'category_slug_name'		=> $category_slug_name,
  'tag_slug_name'				=> $tag_slug_name,
  'search_indexes'	=> $search_indexes
);

// Render template passing in data array
echo Twig::render('single.twig', $context);
