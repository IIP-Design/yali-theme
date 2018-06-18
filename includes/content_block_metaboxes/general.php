<?php

/*************************************************************************************************
*                                       GENERAL FIELDS                                           *
**************************************************************************************************/
$cb_box = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_box',
  'title'        => __( 'General Fields', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'high',
  'closed'       => false
));

// Add Content Block Title
$cb_box->add_field(  array(
  'name'    => __( 'Block Title', 'yali' ),
  'id'      => $prefix . 'block_title',
  'type'    => 'text' ,
  'desc'    => 'Block title that displays. If nothing is entered then the page title will display'
));

$cb_box->add_field(  array(
  'name'    => __( 'Block Title Size', 'yali' ),
  'id'      => $prefix . 'cb_block_title_size',
  'type'    => 'radio_inline',
  'desc'    => 'Block title size',
  'options' => array(
		'h2'    => __( 'Heading 2', 'yali' ),
		'h3'    => __( 'Heading 3', 'yali' ),
		'h4'    => __( 'Heading 4', 'yali' ),
		'h5'    => __( 'Heading 5', 'yali' )
	),
	'default' => 'h2'
));

// Content block type
$cb_box->add_field( array(
  'name'             => 'Block Type',
    'desc'           => 'Content block type',
    'id'             => $prefix . 'cb_type',
    'type'           => 'select',
    'default'        => 'post_list',
  'options'          => array(
    'accordion'      => __( 'Accordion', 'yali' ),
    'button_links'   => __( 'Button Links', 'yali' ),
    'campaigns_list' => __( 'Campaigns List', 'yali' ),
    'cta'            => __( 'Call To Action', 'yali' ),
    'media_block'    => __( 'Media Block', 'yali' ),
    'page_list'      => __( 'Page List', 'yali' ),
    'post_list'      => __( 'Post List', 'yali' ),
    'filtered_list'  => __( 'Post List with Filters', 'yali' ),
    'social'         => __( 'Social Icons', 'yali' ),
    'text_block'     => __( 'Text Block', 'yali' )
  )
));

 // Content block background color
 $cb_box->add_field( array(
  'name'                => 'Block Background color',
    'desc'              => '',
    'id'                => $prefix . 'cb_bg_color',
    'type'              => 'colorpicker',
    'default'           => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

// Full screen width
$cb_box->add_field( array(
  'name'    => 'Full Screen Width?',
  'id'      => $prefix . 'cb_layout_width',
  'desc'    => '',
  'type'    => 'radio_inline',
  'options' => array(
		'yes'   => __( 'Yes', 'yali' ),
		'no'    => __( 'No', 'yali' )
	),
	'default' => 'yes'
));

// Show block title
$cb_box->add_field( array(
  'name'    => 'Show block title?',
  'id'      => $prefix . 'cb_show_title',
  'desc'    => '',
  'type'    => 'radio_inline',
  'options' => array(
		'yes'   => __( 'Yes', 'yali' ),
		'no'    => __( 'No', 'yali' )
	),
	'default' => 'yes'
));

// Underline title
$cb_box->add_field( array(
  'name'    => 'Underline title?',
  'id'      => $prefix . 'cb_title_underline',
  'desc'    => '',
  'type'    => 'radio_inline',
  'options' => array(
		'yes'   => __( 'Yes', 'yali' ),
		'no'    => __( 'No', 'yali' )
	),
	'default' => 'yes'
));

// Title alignment
$cb_box->add_field( array(
  'name'             => 'Title alignment',
    'desc'           => 'Horizontal alignment of title within block',
    'id'             => $prefix . 'cb_title_alignment',
    'type'           => 'select',
    'default'        => 'left',
  'options'          => array(
    'left'           => __( 'Left', 'yali' ),
    'center'         => __( 'Center', 'yali' ),
    'right'          => __( 'Right', 'yali' )
  )
));

// Title color
$cb_box->add_field( array(
  'name'               => 'Title color',
    'desc'             => 'Content block title font color',
    'id'               => $prefix . 'cb_title_color',
    'type'             => 'colorpicker',
    'default'           => '#192856',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#192856' )
    ))
  )
  ));

// Excerpt alignment
$cb_box->add_field( array(
  'name'            => 'Excerpt alignment',
    'desc'          => 'Horizontal alignment of excerpt within block',
    'id'            => $prefix . 'cb_excerpt_alignment',
    'type'          => 'select',
    'default'       => 'left',
  'options'         => array(
    'left'          => __( 'Left', 'yali' ),
    'center'        => __( 'Center', 'yali' ),
    'right'         => __( 'Right', 'yali' )
  )
));

// Excerpt color
$cb_box->add_field( array(
  'name'                => 'Excerpt color',
    'desc'                => 'Content block excerpt font color',
    'id'                  => $prefix . 'cb_excerpt_color',
    'type'                => 'colorpicker',
    'default'             => '#192856',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#192856' )
    ))
  )
));

// Excerpt font weight
$cb_box->add_field( array(
  'name'            => 'Excerpt font weight',
  'desc'            => 'Excerpt font color',
    'id'              => $prefix . 'cb_excerpt_font_weight',
    'type'            => 'select',
    'default'         => 'Normal',
  'options'         => array(
    '300'           => __( 'Light', 'yali' ),
    '400'           => __( 'Normal', 'yali' ),
    '500'           => __( 'Bold', 'yali' ),
    '700'           => __( 'Heavy', 'yali' )
  )
));

// Remaining text alignment
$cb_box->add_field( array(
  'name'            => 'Text alignment',
    'desc'            => 'Horizontal alignment of remaining text within block',
    'id'              => $prefix . 'cb_text_alignment',
    'type'            => 'select',
    'default'         => 'left',
  'options'         => array(
    'left'          => __( 'Left', 'yali' ),
    'center'        => __( 'Center', 'yali' ),
    'right'         => __( 'Right', 'yali' )
  )
));
