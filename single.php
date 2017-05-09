<?php

// Post Object
global $post;

// Main data array to pass to template
$context = array();

// Populate array w/ elements needed for page
$context['post_data'] = Yali::get_post($post->ID);
$context['header_menu'] = Yali::get_header_menu();
$context['footer_menu'] = Yali::get_footer_menu();
$context['sidebar'] = Yali::get_sidebar('primary-sidebar');
$context['tags'] = get_the_tags($post->ID);
$context['categories'] = get_the_category($post->ID);


// Render template passing in data array
echo $twig->render('single.twig', $context);