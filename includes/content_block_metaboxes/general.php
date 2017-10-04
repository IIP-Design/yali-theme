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

// Content block type
$cb_box->add_field( array(
  'name'             => 'Block Type',
    'desc'             => 'What type of content block',
    'id'               => $prefix . 'cb_type',
    'type'             => 'select',
    'default'          => 'cta',
  'options'          => array(
    'cta'            => __( 'Call To Action', 'yali' ),
    'social'         => __( 'Social Icons', 'yali' ),
    'post_list'      => __( 'Post List', 'yali' ),
    'accordion'      => __( 'Accordion', 'yali' )
  )
));

 // Content block background color
 $cb_box->add_field( array(
  'name'                => 'Block Background color',
    'desc'                => '',
    'id'                  => $prefix . 'cb_bg_color',
    'type'                => 'colorpicker',
    'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

// Full screen width 
$cb_box->add_field( array(
  'name' => 'Full Screen Width?',      
  'id'   => $prefix . 'cb_layout_width',
  'desc' => '',
  'default' => true,
  'type' => 'checkbox'
));

// Underline title
$cb_box->add_field( array(
  'name' => 'Underline title?',      
  'id'   => $prefix . 'cb_title_underline',
  'desc' => '',
  'type' => 'checkbox'
));

// Title alignment
$cb_box->add_field( array(
  'name'             => 'Title alignment',
    'desc'             => 'Horizontal alignment of title within block',
    'id'               => $prefix . 'cb_title_alignment',
    'type'             => 'select',
    'default'          => 'left',
  'options'          => array(
    'left'           => __( 'Left', 'yali' ),
    'center'         => __( 'Center', 'yali' ),
    'right'          => __( 'Right', 'yali' )
  )
));

// Title color
$cb_box->add_field( array(
  'name'               => 'Title color',
    'desc'                => 'Content block title font color',
    'id'                  => $prefix . 'cb_title_color',
    'type'                => 'colorpicker',
    'default'             => '#192856',
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
    'desc'            => 'Horizontal alignment of excerpt within block',
    'id'              => $prefix . 'cb_excerpt_alignment',
    'type'            => 'select',
    'default'         => 'left',
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
