<?php

// Add option to toggle related content post list on or off

add_action('cmb2_init', 'related_content_option');
function related_content_option() {

	$related_content  = new_cmb2_box( array(
		'id'           =>  'related_content',
    	'title'        => __( 'Related content', 'default-post' ),
    	'object_types' => array( 'post' ),
    	'context'      => 'normal',
    	'priority'     => 'high',
    	'show_in_rest' => true
	) );

	$related_content->add_field( array(
		'name' => '',
		'id'   => 'related_content_option',
		'desc' => 'Show additional content related to this story.',
		'type' => 'radio_inline',
		'options' => array(
			'yes'   => __( 'Yes', 'default-post' ),
			'no'    => __( 'No', 'default-post' )
		),
		'default' => 'no'
	));


}
