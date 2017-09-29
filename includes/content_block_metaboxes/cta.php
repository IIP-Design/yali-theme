<?php

$cb_cta_width = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_cta_width',
  'title'        => __( 'CTA Layout Width', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

// CTA Layout Width - Full window width otherwise default to .ui.container width
$cb_cta_width->add_field( array(
  'name' => 'Full Screen Width?',      
  'id'   => $prefix . 'cb_cta_layout_width',
  'desc' => '',
  'type' => 'checkbox'
) );