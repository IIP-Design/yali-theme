<?php

use Yali\Twig as Twig;

// Post Object
global $post;


$post_data = Yali\API::get_post($post->ID);
$feat_img_obj = !empty($post_data['featured_media']) ? Yali\API::get_featImg_obj($post_data['featured_media']) : null;
$header_url = $feat_img_obj !== null ? $feat_img_obj['source_url'] : null;
// Reset post data back to single post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();


$category = $post_data['post_category_names'][0];
$parent_cat_id = !empty($category) ? $category->parent : '';
$parent_category_obj = !empty($parent_cat_id) ? Yali\API::get_category_info($parent_cat_id) : '';


$context = array(
  'post_data' => $post_data,
  'header_url' => $header_url,
  'category' => $category,
  'parent_category' => $parent_category_obj
);

// Render template passing in data array
echo Twig::render('single.twig', $context);
