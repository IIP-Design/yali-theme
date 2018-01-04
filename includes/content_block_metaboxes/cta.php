<?php 

/*************************************************************************************************
*                                       CTA BLOCK FIELDS                                     	 *
**************************************************************************************************/

$cta = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_cta',
  'title'        => __( 'CTA Button(s)', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

$cta_button_group = $cta->add_field( array(
  'id'    =>  $prefix . 'cta_button_repeat_group',
  'type'    => 'group',
  'description'   => __( 'Add buttons to be displayed on CTA content block' ),
  'options'       => array(
      'group_title'     => __( 'Button Item {#}', 'yali' ),
      'add_button'      => __( 'Add Another Button Item', 'yali' ),
      'remove_button'   => __( 'Remove Item', 'yali' ),
      'sortable'        => true
  )
));

$cta->add_group_field( $cta_button_group, array(
  'name' => 'Link',
  'id'   =>  $prefix . 'cta_button_link',
  'type' => 'link_picker'  
));

$cta->add_group_field( $cta_button_group, array(
  'name'               => 'Background color',
  'desc'                => 'Background color of button',
  'id'                  => $prefix . 'cta_button_bg_color',
  'type'                => 'colorpicker',
  'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

$cta->add_group_field( $cta_button_group, array(
  'name'               => 'Text Color',
  'desc'                => 'Color of text label for button',
  'id'                  => $prefix . 'cta_button_text_color',
  'type'                => 'colorpicker',
  'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));