<?php

use Yali\Twig as Twig;

// Post Object
global $post;
// echo '<pre>';
// var_dump($post);
// echo '</pre>';
$page_header = get_the_post_thumbnail( $post->ID );
$page_title = $post->post_title;
$page_content = do_shortcode( $post->post_content );

$context = array(
  "page_header" => $page_header,
  "page_title" => $page_title,
  "page_content" => $page_content
);

echo Twig::render( 'front-page.twig', $context );