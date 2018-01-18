<?php

/*************************************************************************************************
 *                                        CAMPAIGNS LIST CONTENT BLOCK                           *
 *************************************************************************************************/
// Query Campaign Pages
$args = array(
	'post_type' => 'page',
	'meta_key' => 'campaign_page',
	'meta_value' => 'true',
	'posts_per_page' => '-1'
);

$campaign_pages = new WP_Query($args);
wp_reset_postdata();

$campaigns_select_menu = array();

foreach ($campaign_pages->posts as $campaign) {	
	$campaigns_select_menu[$campaign->ID] = $campaign->post_title;
}

// Campaigns List Metabox
$campaigns_list = new_cmb2_box( array(
	'id'           => $prefix . 'cb_campaigns_list',
	'title'        => __( 'Campaign List', 'yali' ),
	'object_types' => array('content_block'),
	'priority'     => 'low'
));

$campaigns_list_group = $campaigns_list->add_field( array(
	'id' => 'campaigns_list_repeat_group',
	'type' => 'group',
	'description'   => __( 'Select Campaigns To be Displayed' ),
  	'options'       => array(
		'group_title'     => __( 'Campaign {#}', 'yali' ),
		'add_button'      => __( 'Add Another Campaign', 'yali' ),
		'remove_button'   => __( 'Remove Campaign', 'yali' ),
		'sortable'        => true
	),
));

$campaigns_list->add_group_field($campaigns_list_group, array(
	'name' => 'Select Campaign',
	'id'  => $prefix . 'select_campaign',
	'type' => 'select',
	'default' => 'center',
	'options' => $campaigns_select_menu
));




