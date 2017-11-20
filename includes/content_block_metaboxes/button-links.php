<?php

// Display 1 - 4 button links (link to file, page, element on page)
$button_links = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_button_links',
  'title'        => __( 'Button Links', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

$button_links->add_field( array(
	'name'    => 'Button Links Block Headline',
	'id'      => $prefix . 'button_links_headline',
	'description' => __('Add headline to be displayed above button links (Optional)'),
	'type'    => 'text'
));

$button_links_group_field = $button_links->add_field( array(
	'id'		=>	$prefix . 'button_links_repeat_group',
	'type'  	=> 'group',
	'description'   => __( 'Add Button Link Items - Add either a file or a link for button, include button text' ),
	'options'       => array(
	    'group_title'     => __( 'Button Link Item {#}', 'yali' ),
	    'add_button'      => __( 'Add Another Button Link Item', 'yali' ),
	    'remove_button'   => __( 'Remove Item', 'yali' ),
	    'sortable'        => true
	)
));

$button_links->add_group_field( $button_links_group_field, array(
 	'name'  	=> 'Add text for button file display',
	'id'    	=> $prefix . 'button_file_text',
	'type'  	=> 'text',	
));

$button_links->add_group_field( $button_links_group_field, array(
 	'name'  	=> 'Add file to link to',
	'id'    	=> $prefix . 'button_file',	
	'type'  	=> 'file',
	'options'	=> array(
		'url'	=> false
	)
));

$button_links->add_group_field( $button_links_group_field, array(
	'name'                      => __( 'Add link for button', 'yali' ),
	'id'                        => $prefix . 'button_link',
	'type'                      => 'link_picker',
	'desc'                      => __( '' ),
	'repeatable'                => false	
));

$button_links->add_group_field( $button_links_group_field, array(
	'name'                      => __( 'Check if link is on same page', 'yali' ),
	'desc'                      => __( 'adds a class to scroll to link if link is on same page' ),
	'id'                        => $prefix . 'button_link_scroll',
	'type'                      => 'checkbox',	
));