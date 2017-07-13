<?php

use Yali\Twig as Twig;

// Post Object
global $post;

$post_data = Yali\API::get_post($post->ID);
$tags = get_the_tags($post->ID);
$categories = get_the_category($post->ID);

$context = array(
  'post_data' => $post_data,
  'tags' => $tags,
  'categories' => $categories
);

// Render template passing in data array
echo Twig::render('single.twig', $context);
