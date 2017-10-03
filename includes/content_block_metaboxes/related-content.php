<?php

$cb_related = new_cmb2_box( array(
	'id'           =>  $prefix . 'cb_related_content',
	'title'        => __( 'Related Content List', '' ),
	'object_types' => array( 'content_block' ),
	'priority'     => 'low'
));

$cb_related->add_field( array(
	'name'		=> 'Post Category',
	'desc'		=> 'Category from which posts will be pulled',
	'id'		=> $prefix . 'related_content_category',
	'type'		=> 'select',
	'default'	=> 'select',
	'options'	=> $this->fetch_categories()	
));

// $cb_related->add_field( array(
// 	'name'		=> 'Choose Menu Filter',
// 	'desc'		=> 'Choose simple (Articles, Podcasts, Videos, Courses) or advanced filter (All Content and filters)',
// 	'id'		=> $prefix . 'related_content_filter',
// 	'type'		=> 'select',	
// 	'options'  	=> array(
// 		'simple'   => __('Simple Filter', 'yali'),
// 		'advanced' => __('Advanced Filter', 'yali')
// 	)
// ) );
