<?php
/*
* Add Custom Fields for Campaigns Template
* template file:  /page-templates/campaigns-template.php
*/

add_action('cmb2_init', 'campaigns_template_fields');
function campaigns_template_fields() {

	$prefix = 'campaigns_';

	$campaigns_promo = new_cmb2_box( array(
		'id'           =>  $prefix . 'promo',
		'title'        => __( 'Campaigns Promotion Share Content Images', 'campaigns' ),
		'object_types' => array( 'page' ),
		'context'      => 'normal',
		'priority'     => 'low',
		'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/campaigns-template.php'),
		'show_in_rest' => true
	));

	/*************************
	 Promo Images
	**************************/
	$campaigns_group_field_promo = $campaigns_promo->add_field( array(
		'id'		=>	'campaigns_promo_repeat_group',
		'type'  	=> 'group',
		'description'   => __( 'Add Promotion Images and Text Item' ),
		'options'       => array(
		    'group_title'     => __( 'Image {#}', 'campaigns' ),
		    'add_button'      => __( 'Add Another Image', 'campaigns' ),
		    'remove_button'   => __( 'Remove Image', 'campaigns' ),
		    'sortable'        => true
		)
	));

	$campaigns_promo->add_group_field( $campaigns_group_field_promo, array(
	 	'name'  	=> 'Add Image',
		'id'    	=> 'image_url',
		'type'  	=> 'file',
		'options'	=> array(
			'url'	=> false
		)
	));

	$campaigns_promo->add_group_field( $campaigns_group_field_promo, array(
	 	'name'  => 'Image text',
		'id'    => 'image_text',
		'type'  => 'textarea'
	));

	/*************************
	 Organize Event
	**************************/
	$campaigns_orgevent = new_cmb2_box( array(
		'id'           =>  $prefix . 'orgevent',
		'title'        => __( 'Files for Organize an Event', 'campaigns' ),
		'object_types' => array( 'page' ),
		'context'      => 'normal',
		'priority'     => 'low',
		'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/campaigns-template.php'),
		'show_in_rest' => true
	));

	$campaigns_group_field_orgevent = $campaigns_orgevent->add_field( array(
		'id'		=>	'campaigns_orgevent_repeat_group',
		'type'  	=> 'group',
		'description'   => __( 'Add Files for Organize an Event Content' ),
		'options'       => array(
		    'group_title'     => __( 'File {#}', 'campaigns' ),
		    'add_button'      => __( 'Add Another File', 'campaigns' ),
		    'remove_button'   => __( 'Remove File', 'campaigns' ),
		    'sortable'        => true
		)
	));

	$campaigns_orgevent->add_group_field( $campaigns_group_field_orgevent, array(
	 	'name'  	=> 'Add File',
		'id'    	=> 'file_url',
		'type'  	=> 'file',
		'options'	=> array(
			'url'	=> true
		)
	));

	$campaigns_orgevent->add_group_field( $campaigns_group_field_orgevent, array(
	 	'name'  => 'File Name Text',
		'id'    => 'file_name',
		'type'  => 'text'
	));

	/*************************
	 Alumni Videos
	**************************/
	$campaigns_alumnvids = new_cmb2_box( array(
		'id'           =>  $prefix . 'alumnvids',
		'title'        => __( 'Alumni Videos', 'campaigns' ),
		'object_types' => array( 'page' ),
		'context'      => 'normal',
		'priority'     => 'low',
		'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/campaigns-template.php'),
		'show_in_rest' => true
	));

	$campaigns_group_field_alumnvids = $campaigns_alumnvids->add_field( array(
		'id'		=>	'campaigns_alumnvids_repeat_group',
		'type'  	=> 'group',
		'description'   => __( 'Add Alumni Youtube Video Embed Links' ),
		'options'       => array(
		    'group_title'     => __( 'Video {#}', 'campaigns' ),
		    'add_button'      => __( 'Add Another Video', 'campaigns' ),
		    'remove_button'   => __( 'Remove Video', 'campaigns' ),
		    'sortable'        => true
		)
	));

	$campaigns_alumnvids->add_group_field( $campaigns_group_field_alumnvids, array(
		'name'  => 'Add Youtube Video URL Link',
		'id'    => 'youtube_video',
		'type'  => 'oembed'
	));

	$campaigns_alumnvids->add_group_field( $campaigns_group_field_alumnvids, array(
		'name'  => 'Add FRENCH Youtube Video URL Link',
		'id'    => 'youtube_french_video',
		'type'  => 'oembed'
	));
}	