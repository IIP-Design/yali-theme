<?php

use Yali\Twig as Twig;

// Post Object
global $post;

$page_data = Yali\API::get_page($post->ID);
$feat_img_obj = Yali\API::get_featImg_obj($page_data['featured_media']);
$header_url = $feat_img_obj['source_url'];

$img_id = get_post_thumbnail_id( $post->ID );
$srcset = wp_get_attachment_image_srcset( $img_id, 'full' );
$sizes = wp_get_attachment_image_sizes( $img_id, 'full' );

$check_host = $_SERVER['SERVER_NAME'];

$formidable_id = get_option( 'yali-joinus-form-id' );
$formVar = do_shortcode( $formidable_id );

$context = array(
  "check_host"  => $check_host,
  "page_data"   => $page_data,
  "header_url"  => $header_url,
  "feat_img"    => $feat_img_obj,
  "srcset"      => $srcset,
  "sizes"       => $sizes,
  "formVar"     => $formVar
);

echo Twig::render( 'front-page.twig', $context );
