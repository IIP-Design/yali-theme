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
  'name' => 'Headline (Optional)',
  'id'   => $prefix . 'cb_text_block_headline',
  'type' => 'text'
));

$text_block->add_field( array(
	'name'    => 'Content',
	'id'      => 'text_block_content',
	'type'    => 'wysiwyg'
));