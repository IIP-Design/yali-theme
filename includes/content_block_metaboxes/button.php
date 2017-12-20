<?php

/*************************************************************************************************
*                                       CONTENT BLOCK BUTTON                                     *
**************************************************************************************************/
$cb_box_btn = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_box_btn',
  'title'        => __( 'Button', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

// Link
$cb_box_btn->add_field( array(
  'name' => 'Link',
  'id'   =>  $prefix . 'cb_box_btn_link',
  'type' => 'link_picker'
));

  // Button background color
$cb_box_btn->add_field( array(
  'name'               => 'Background color',
  'desc'                => 'Background color of button',
  'id'                  => $prefix . 'cb_box_btn_bg_color',
  'type'                => 'colorpicker',
  'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

// Horizontal alignment of button within block
$cb_box_btn->add_field( array(
  'name'             => 'Alignment',
  'desc'             => 'Horizontal alignment of button within block',
  'id'               => $prefix . 'cb_box_btn_h_alignment',
  'type'             => 'select',
  'default'          => 'center',
  'options'          => array(
    'left'           => __( 'Left', 'yali' ),
    'center'         => __( 'Center', 'yali' ),
    'right'          => __( 'Right', 'yali' )
  )
));
