<?php

// Add option to exclude given post/page from getting indexed by CDP

add_action('cmb2_init', 'donot_index_option');
function donot_index_option() {

	$donot_index  = new_cmb2_box( array(
		'id'           => 'donot_index',
    'title'        => 'Do Not Index',
    'object_types' => array( 'page', 'post' ),
    'context'      => 'side',
    'priority'     => 'high',
    'show_in_rest' => true
	) );

	$donot_index->add_field( array(
		'name' => '',
		'id'   => 'donot_index_option',
		'desc' => 'Don\'t index this post into the CDP.',
		'type' => 'checkbox',
	));


}
