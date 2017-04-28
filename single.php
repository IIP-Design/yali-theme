<?php

global $post;

$context = array();
$context['title'] = $post->post_name;
$context['restdata'] = rest_get_post($post->ID);

echo $twig->render('single.twig', $context);
