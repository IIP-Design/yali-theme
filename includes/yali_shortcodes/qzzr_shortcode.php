<?php
// Qzzr Shortcode
add_shortcode('qzzr', 'qzzr_embed');
function qzzr_embed( $atts ) {
	extract( 
		shortcode_atts( 
			array(
				'id' => '',
				'title' => ''
			), 
		$atts ) 
	);

	$qzzr_html = '<div class="quizz-container" data-width="100%" data-iframe-title="' . $title . '" data-height="auto" data-quiz="' . $id . '"></div>';

	wp_enqueue_script('qzzr_js','https://dcc4iyjchzom0.cloudfront.net/widget/loader.js', '', '', true);

	return $qzzr_html;
}