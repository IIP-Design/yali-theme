<?php

// Display 1 - 4 button links (link to file, page, element on page)
$button_links = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_button_links',
  'title'        => __( 'Button Links', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

$button_links_group_field = $button_links->add_field( array(
	'id'		=>	'button_links_repeat_group',
	'type'  	=> 'group',
	'description'   => __( 'Add Button Link Item' ),
	'options'       => array(
	    'group_title'     => __( 'Button Link Item {#}', 'yali' ),
	    'add_button'      => __( 'Add Another Button Link Item', 'yali' ),
	    'remove_button'   => __( 'Remove Item', 'yali' ),
	    'sortable'        => true
	)
));

$button_links->add_group_field( $button_links_group_field, array(
 	'name'  	=> 'Add file to link to',
	'id'    	=> 'link_file',
	'type'  	=> 'file',
	'options'	=> array(
		'url'	=> false
	)
));

$button_links->add_group_field( $button_links_group_field, array(
	'name'                      => __( 'Add link for button', 'yali' ),
	'id'                        => $prefix . 'cdp_autocomplete_related',
	'type'                      => 'related_link',
	'desc'                      => __( '' ),
	'repeatable'                => false	
));