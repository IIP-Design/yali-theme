<?php

global $post;

$context = array();
$context['title'] = $post->post_name;
$context['restdata'] = rest_get_post($post->ID);

$context['header_menu'] = rest_get_header_menu();
$context['footer_menu'] = rest_get_footer_menu();

echo $twig->render('single.twig', $context);
