<?php


$context = array();

// $context['home_sidebar_right'] = Yali::get_sidebar('header-right');
// $context['blog_sidebar'] = Yali::get_sidebar('primary-sidebar');

echo $twig->render('sidebar.twig', $context);