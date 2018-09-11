<?php

// Media Block
// Ex. Usage: /unites/ page, 'Share your knowlege'/'Promote YALIUnites'

$media_block = new_cmb2_box( array(
	'id'           =>  $prefix . 'cb_media',
	'title'        => __( 'Media Block', 'yali' ),
	'object_types' => array( 'content_block' ),	
	'priority' => 'low'
));

$media_block->add_field( array(
  'name'               => 'Text Color',
  'desc'                => 'Color of text for the block',
  'id'                  => 'block_text_color',
  'type'                => 'colorpicker',
  'default'             => '#192856',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

$media_block_group_field = $media_block->add_field( array(
	'id'		=>	'media_block_repeat_group',
	'type'  	=> 'group',
	'description'   => __( 'Add Media Items and Text Content' ),
	'options'       => array(
	    'group_title'     => __( 'Media Item {#}', 'yali' ),
	    'add_button'      => __( 'Add Another Item', 'yali' ),
	    'remove_button'   => __( 'Remove Item', 'yali' ),
	    'sortable'        => true
	)
));

$media_block->add_group_field( $media_block_group_field, array(
 	'name'  	=> 'Add Media File',
	'id'    	=> 'media_file',
	'type'  	=> 'file',
	'options'	=> array(
		'url'	=> false
	)
));

$media_block->add_group_field( $media_block_group_field, array(
 	'name'  => 'Media File Button Text',
	'id'    => 'media_file_btn_text',
	'description' => __('If file, add text for file button display (Optional)'),
	'type'  => 'text'
));

$media_block->add_group_field( $media_block_group_field, array(
  'name'               => 'Background color',
  'desc'                => 'Background color of button',
  'id'                  => 'button_bg_color',
  'type'                => 'colorpicker',
  'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

$media_block->add_group_field( $media_block_group_field, array(
  'name'               => 'Text Color',
  'desc'                => 'Color of text label for button',
  'id'                  => 'button_text_color',
  'type'                => 'colorpicker',
  'default'             => '#ffffff',
  'attributes'          => array(
    'data-colorpicker'  => json_encode( array(
        'border'        => false,
        'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
    ))
  )
));

$media_block->add_group_field( $media_block_group_field, array(
 	'name'  => 'Media File Excerpt',
	'id'    => 'media_file_excerpt',
	'description' => __('If image, add content to display under image file (Optional)'),
	'type'  => 'textarea'
));

$media_block->add_field( array(
  'name'    => 'Media Block Intro Content',
  'id'      => 'intro_content',
  'description' => __('Add content to display under title (Optional)'),
  'type'    => 'wysiwyg'
));

$media_block->add_field( array(
  'name'    => 'Media Block Outro Content',
  'id'      => 'outro_content',
  'description' => __('Add content to display below all media files (Optional)'),
  'type'    => 'wysiwyg'
));