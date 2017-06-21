<?php

use Yali\Twig as Twig;

// Post Object
global $post;

$header_url = get_the_post_thumbnail_url( $post->ID );
$title = $post->post_title;
$content = do_shortcode( $post->post_content );

$context = array(
  "header_url"  => $header_url,
  "title"       => $title,
  "content"     => $content
);

echo Twig::render( 'front-page.twig', $context );