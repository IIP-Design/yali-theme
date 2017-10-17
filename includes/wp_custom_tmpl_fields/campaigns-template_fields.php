<?php
/*
* Add Custom Fields for Campaigns Template
* template file:  /page-templates/campaigns-template.php
*/

add_action('cmb2_init', 'campaigns_template_fields');
function campaigns_template_fields() {

	$prefix = 'campaigns_';

	$campaigns = new_cmb2_box( array(
		'id'           =>  $prefix . 'promo',
		'title'        => __( 'Campaigns Promotion Share Content Images', 'campaigns' ),
		'object_types' => array( 'page' ),
		'context'      => 'normal',
		'priority'     => 'low',
		'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/campaigns-template.php'),
		'show_in_rest' => true
	));

	$campaigns_group_field_promo = $campaigns->add_field( array(
		'id'		=>	'campaigns_promo_repeat_group',
		'type'  	=> 'group',
		'description'   => __( 'Add Promotion Images and Text Item' ),
		'options'       => array(
		    'group_title'     => __( 'Image {#}', 'campaigns' ),
		    'add_button'      => __( 'Add Another Image', 'campaigns' ),
		    'remove_button'   => __( 'Remove Image', 'campaigns' ),
		    'sortable'        => true
		 ),
	));

	$campaigns->add_group_field( $campaigns_group_field_promo, array(
	 	'name'  	=> 'Add Image',
		'id'    	=> 'image_url',
		'type'  	=> 'file',
		'options'	=> array(
			'url'	=> false
		)
	));

	$campaigns->add_group_field( $campaigns_group_field_promo, array(
	 	'name'  => 'Image text',
		'id'    => 'image_text',
		'type'  => 'textarea'
	));

}	