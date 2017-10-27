<?php

use Yali\Twig as Twig;

//global $query_string;
global $wp_query;

$search_term = get_search_query();
$search_results = $wp_query->posts;


var_dump($wp_query);


// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

// Data array for twig
$context = array(
  'formVar'       => $formVar,
  'search_term'   => $search_term,
  'search_results' => $search_results
);

echo Twig::render( array( 'search-results.twig' ), $context );