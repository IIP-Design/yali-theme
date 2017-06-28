<?php
use Yali\Twig as Twig;

// Post Object
global $post;
// echo '<pre>';
// var_dump($post);
// echo '</pre>';
$page_title = do_shortcode( $post->post_title );
$page_content = do_shortcode( $post->post_content );

$context = array(
  "page_title" => $page_title,
  "page_content" => $page_content,
  "pagename" => get_query_var('pagename')
);

echo Twig::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
