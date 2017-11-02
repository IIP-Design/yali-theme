<?php

// Add option to exclude given post/page from getting indexed by CDP

add_action('cmb2_init', 'donot_index_option');
function donot_index_option() {
	$prefix = '_iip_';

	$donot_index  = new_cmb2_box( array(
		'id'           => 'donot_index',
    'title'        => 'Index Post to CDP',
    'object_types' => array( 'page', 'post' ),
    'context'      => 'side',
    'priority'     => 'high',
    'show_in_rest' => true
	) );

	$donot_index->add_field( array(
		'name' => '',
		'id'   => $prefix . 'index_post_to_cdp_option',
		'desc' => '',
		'type'    => 'radio_inline',
		'default' => 'yes',
		'show_option_none' => false,
		'options' => array(
			'yes' => __( 'Yes', 'yali' ),
			'no'  => __( 'No', 'yali' )
		)
	));


}
