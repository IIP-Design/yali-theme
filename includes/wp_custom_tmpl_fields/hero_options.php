<?php

// Add option to include page title as overlay in hero section otherwise default to
// under hero (in .ui.container)

add_action('cmb2_init', 'hero_title_option');
function hero_title_option() {

	$hero_title  = new_cmb2_box( array(
		'id'           =>  'hero_title',
    	'title'        => 'Display Title as Overlay in Hero Image Section?',
    	'object_types' => array( 'page', 'post'),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_in_rest' => true
	) );

	$hero_title->add_field( array(
		'name' => '',
		'id'   => 'hero_title_option',
		'desc' => 'Default display is below the hero image.',
		'type' => 'radio_inline',
		'options' => array(
			'yes'   => __( 'Yes' ),
			'no'    => __( 'No' ),
			'hide'	=> __( 'Hide Image' )
		),
		'default' => 'no'
	));


}