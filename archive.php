<?php


$page_num = blog_list_pagination_num();

$queried_object = get_queried_object();
// var_dump($queried_object);

$filter = $queried_object->term_taxonomy_id;
$taxonomy = $queried_object->taxonomy;

$context['header_menu'] = Yali::get_header_menu();
$context['footer_menu'] = Yali::get_footer_menu();
$context['blog_sidebar'] = Yali::get_sidebar('primary-sidebar');

$context['archive_query'] = $queried_object->name;
$context['blog_list'] = !empty($page_num) ? Yali::get_paginated_archive_posts($filter, $taxonomy, $page_num) : Yali::get_archive_posts($filter, $taxonomy);
$context['taxonomy'] = ( $taxonomy == 'post_tag' ) ? 'tag' : $taxonomy;
$context['filter_slug'] = $queried_object->slug;

echo $twig->render('archive.twig', $context);