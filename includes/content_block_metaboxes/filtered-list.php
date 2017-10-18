<?php

/*************************************************************************************************
*                                       FILTERED LIST                                    *
**************************************************************************************************/
$cb_box_filter = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_box_filter',
  'title'        => __( 'Filters', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));


$cb_box_filter->add_field( array(
	'name'    => 'Filters to show',
	'desc'    => '',
	'id'      => $prefix . 'list_filters',
  'type'    => 'multicheck_inline',
  //'select_all_button' => false,
	'options' => array(
		'type'      => 'Type',
		'subject'   => 'Subject',
    'series'    => 'Series',
    'language'  => 'Language',
    'sort'      => 'Sort',
	),
));

$cb_box_filter->add_field( array(
	'name'    => 'Content types to search',
	'desc'    => '',
	'id'      => $prefix . 'list_filters_types',
  'type'    => 'multicheck_inline',
  //'select_all_button' => false,
	'options' => array(
		'article'   => 'Article',
		'course'    => 'Course',
    'podcast'   => 'Podcast',
    'video'     => 'Video',
	),
) );
