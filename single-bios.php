<?php

use Yali\Twig as Twig;

// Post Object
global $post;

$post_data = Yali\API::get_bio($post->ID);
$feat_img_obj = !empty($post_data["featured_media"]) ? Yali\API::get_featImg_obj($post_data["featured_media"]) : null;
$bio_image = $feat_img_obj !== null ? $feat_img_obj["source_url"] : null;
// Reset post data back to post query - above get_featImg_obj API request modifies $post global var
wp_reset_postdata();

$context = array(  
  'post_data'	=> $post_data,
  'bio_image'	=> $bio_image
);

// Render template passing in data array
echo Twig::render('single-bios.twig', $context);