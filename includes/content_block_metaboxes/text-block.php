<?php

/*************************************************************************************************
 *                                        TEXT CONTENT BLOCK                                     *
 *************************************************************************************************/

$text_block = new_cmb2_box( array(
  'id'           => $prefix . 'cb_text_block',
  'title'        => __( 'Text Content Block', 'yali' ),
  'object_types' => array('content_block'),
  'priority'     => 'low'
));

$text_block->add_field( array(
  'name'                => 'Select Font Color',
    'desc'              => '',
    'id'                => $prefix . 'text_block_font_color',
    'type'              => 'colorpicker',
    'default'           => '#192856',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

$text_block->add_field( array(
	'name'    => 'Content',
	'id'      => $prefix . 'text_block_content',
	'type'    => 'wysiwyg'
));

