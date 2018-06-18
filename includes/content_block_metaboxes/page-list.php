<?php

/*************************************************************************************************
 *                                        PAGE LIST                                              *
 *************************************************************************************************/
 // Query Pages
 $args = array(
 	'post_type' => 'page',
  'meta_query' => array(
    array(
      'key' => '_wp_page_template',
      'value' => 'page-templates/course-template.php',
      'compare' => '!='
    )
  ),
 	'posts_per_page' => '-1'
 );

 $all_pages = new WP_Query($args);
 wp_reset_postdata();

 $pages_select_menu = array();

 foreach ($all_pages->posts as $page) {
 	$pages_select_menu[$page->ID] = $page->post_title;
 }

// Page List Metabox
$cb_pages_list = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_pages_list',
  'title'        => __( 'Pages List', 'america' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

$cb_pages_list_group = $cb_pages_list->add_field( array(
	'id' => 'cb_pages_list_repeat_group',
	'type' => 'group',
	'description'   => __( 'Select Pages To be Displayed' ),
  	'options'       => array(
		'group_title'     => __( 'Page {#}', 'yali' ),
		'add_button'      => __( 'Add Another Page', 'yali' ),
		'remove_button'   => __( 'Remove Page', 'yali' ),
		'sortable'        => true
	),
));

$cb_pages_list->add_group_field($cb_pages_list_group, array(
	'name' => 'Select Page',
	'id'  => $prefix . 'select_page',
	'type' => 'select',
	'default' => 'center',
	'options' => $pages_select_menu
));

$cb_pages_list->add_group_field($cb_pages_list_group, array(
	'name' => 'Related Link',
	'id'  => $prefix . 'related_link',
	'type' => 'related_link',
	'options' => $pages_select_menu
));
