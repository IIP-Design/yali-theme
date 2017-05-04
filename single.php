<?php

global $post;

$context = array();
$context['post_data'] = Yali::get_post($post->ID);

$context['header_menu'] = Yali::get_header_menu();
$context['footer_menu'] = Yali::get_footer_menu();

echo $twig->render('single.twig', $context);