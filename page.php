<?php

global $post;
//var_dump($post);


$sb = dynamic_sidebar('header-right');

$context = array();
$context['title'] = $post->post_name;
$context['restdata'] = rest_get_page($post->ID);
$context['blog_list'] = is_page(602) ? rest_get_all_posts() : '';
$context['home_sidebar_right'] = $sb;


echo $twig->render('page.twig', $context );