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
	'options' => array(
		'type'      => 'Type',
		'subject'   => 'Subject',
    'series'    => 'Series',
    'language'  => 'Language',
    'sort'      => 'Sort',
	),
));

$cb_box_filter->add_field( array(
	'name'    => 'Language selection',
	'desc'    => '',
	'id'      => $prefix . 'cb_lang_selection',
  'type'    => 'radio',
  'default' => 'en-us',
	'options' => array(
		'en-us'   => __( 'English' ),
    'fr-fr'   => __( 'French' ),
    'pt-br'   => __( 'Portuguese' )
	),
));

$cb_box_filter->add_field( array(
	'name'    => 'Content types to search',
	'desc'    => '',
	'id'      => $prefix . 'list_filters_types',
  'type'    => 'multicheck_inline',
	'options' => array(
		'article'   => 'Article',
		'courses'   => 'Course',
    'Podcast'   => 'Podcast',
    'Video'     => 'Video',
	),
) );

$cb_box_filter->add_field(  array(
  'name'             => 'Post date display',
  'desc'             =>  '',
  'id'               => $prefix . 'filtered_list_date_display',
  'type'             => 'radio_inline',
  'default'          => 'show',
  'options'          => array(
    'show'         	 => 'Show post dates',
    'hide'         	 => 'Hide post dates'
  )
));