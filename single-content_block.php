<?php

use Yali\Twig as Twig;

// Post Object
global $post;

$post_data = Yali\API::get_contentblock($post->ID);
$content_block = do_shortcode($post_data['display_shortcode']);


$context = array(  
  'post_data'       => $post_data,
  'content_block'   => $content_block
);

// Render template passing in data array
echo Twig::render('single-content_block.twig', $context);