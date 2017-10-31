<?php

use Yali\Twig as Twig;

// global $query_string;
global $wp_query;

$search_term = get_search_query();
$search_results = $wp_query->posts;

// Formate search results to include an excerpt derived from post/page content
// exclusive of shortcodes, images
foreach ($search_results as $post) {
	$content = $post->post_content;
	$post->yali_excerpt = formatted_excerpt($content);
}

function formatted_excerpt($post_content) {
	$word_length = 35;
	
	$excerpt = $post_content;
	$excerpt = strip_tags(strip_shortcodes($excerpt));

	$words = explode(' ', $excerpt, $word_length + 1);

	if( count($words) > $word_length ) {
		array_pop($words);
		array_push($words, '...');		
	}

	$the_excerpt = implode(' ', $words);
	return $the_excerpt;
}

// 'Join the Network' Form
$formVar = do_shortcode('[formidable id=6]');

// Data array for twig
$context = array(
  'formVar'       => $formVar,
  'search_term'   => $search_term,
  'search_results' => $search_results
);

echo Twig::render( array( 'search-results.twig' ), $context );