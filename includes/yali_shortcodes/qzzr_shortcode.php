<?php
// Qzzr Shortcode
add_shortcode('qzzr', 'qzzr_embed');
function qzzr_embed( $atts ) {
	extract( 
		shortcode_atts( 
			array(
				'quiz_id' => '',
				'quiz_title' => ''
			), 
		$atts ) 
	);

	$qzzr_html = '<div class="quizz-container" data-width="100%" data-iframe-title="' . $quiz_title . '" data-height="auto" data-quiz="' . $quiz_id . '"></div>';

	wp_enqueue_script('qzzr_js','http://dcc4iyjchzom0.cloudfront.net/widget/loader.js', '', '', true);

	return $qzzr_html;
}