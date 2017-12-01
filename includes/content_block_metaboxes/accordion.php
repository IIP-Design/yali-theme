<?php

/*************************************************************************************************
 *                                        ACCORDION                                              *
 *************************************************************************************************/

$accordion = new_cmb2_box( array(
  'id'           => $prefix . 'cb_accordion',
  'title'        => __( 'Accordion', 'yali' ),
  'object_types' => array('content_block'),
  'priority'     => 'low'
));

$accordion->add_field( array(
  'name' => 'Accordion Headline (Optional)',
  'id'   => $prefix . 'cb_accordion_headline',
  'type' => 'text'
));

$accordion->add_field( array(
  'name' => 'Accordion Headline Alignment (Optional)',
  'id'   => $prefix . 'cb_accordion_headline_alignment',
  'type' => 'select',
  'default' => 'center',
  'options'          => array(
    'left'           => __( 'Left', 'yali' ),
    'center'         => __( 'Center', 'yali' ),
    'right'          => __( 'Right', 'yali' )
  )
));

$accordion_group_field_id = $accordion->add_field( array(
  'id'            => 'accordion_repeat_group',
  'type'          => 'group',
  'description'   => __( 'Add Content Items for Accordion Display' ),
  'options'       => array(
    'group_title'     => __( 'Item {#}', 'yali' ),
    'add_button'      => __( 'Add Another Item', 'yali' ),
    'remove_button'   => __( 'Remove Item', 'yali' ),
    'sortable'        => true
  ),
));

$accordion->add_group_field( $accordion_group_field_id, array(
  'name'  => 'Item Title',
  'id'    => 'item_title',
  'type'  => 'text'
));

$accordion->add_group_field( $accordion_group_field_id, array(
  'name'    => 'Item Content',
  'id'      => 'item_content',
  'type'    => 'wysiwyg'
));