<?php

namespace Yali;

use Twig_YALI_Extension;

class Content_Block {

  public function __construct() {
      add_action( 'cmb2_admin_init',                          array($this, 'content_block_fields') );  
      add_filter( 'manage_edit-content_block_columns',        array($this, 'edit_content_block_post_columns') );
      add_filter( 'manage_content_block_posts_custom_column', array($this, 'manage_content_block_post_columns'), 10, 2 );  
  }
  
  /**
   * Register the Content Block custom post type
   *
   * @return void
   */
  public static function register() {
    $labels = array(
      'name'                => _x('Content Blocks', 'post type general name'),
      'singular_name'       => _x('Content Block', 'post type singular name'),
      'add_new'             => _x('Add New', 'Content Block'),
      'add_new_item'        => __('Add New Content Block'),
      'edit_item'           => __('Edit Content Block'),
      'new_item'            => __('New Content Block'),
      'view_item'           => __('View Content Block'),
      'search_items'        => __('Search Content Blocks'),
      'not_found'           =>  __('No Content Block found'),
      'not_found_in_trash'  => __('No Content Blocks found in Trash'),
      'parent_item_colon'   => ''
    );

    $args = array(
      'labels'              => $labels,
      'public'              => true,
      'publicly_queryable'  => true,
      'show_ui'             => true,
      'show_in_rest'        => true,
      'query_var'           => true,
      'rewrite'             => true,
      'capability_type'     => 'post',
      'hierarchical'        => false,
      'menu_position'       => 5,
      'supports'            => array('title','thumbnail','excerpt'),
      'has_archive'         => true
    );

    register_post_type( 'content_block', $args );
	}

  /**
   * Adds the content block specific metaboxs to admin screen
   *
   * @return void
   */
  public function content_block_fields() {

    $prefix = 'yali_';
    
    $cb_box = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_box',
      'title'        => __( 'Content Block Fields', 'yali' ),
      'object_types' => array( 'content_block' )
    ));

    $cb_box->add_field( array(
      'name'             => 'Type',
	    'desc'             => 'What type of content block',
	    'id'               => $prefix . 'cb_type',
	    'type'             => 'select',
	    'default'          => 'left',
      'options'          => array(
        'cta'            => __( 'Call To Action', 'yali' ),
        'social'         => __( 'Social Icons', 'yali' )
      )
	  ));

    $cb_box->add_field( array(
      'name'             => 'Title Alignment',
	    'desc'             => 'How should the block title be aligned?',
	    'id'               => $prefix . 'cb_title_alignment',
	    'type'             => 'select',
	    'default'          => 'left',
      'options'          => array(
        'left'           => __( 'Left', 'yali' ),
        'center'         => __( 'Center', 'yali' ),
        'right'          => __( 'Right', 'yali' ),
      )
	  ));
    
    $cb_box->add_field( array(
      'name'            => 'Excerpt Alignment',
	    'desc'            => 'How should the excerpt be aligned?',
	    'id'              => $prefix . 'cb_excerpt_alignment',
	    'type'            => 'select',
	    'default'         => 'left',
      'options'         => array(
        'left'          => __( 'Left', 'yali' ),
        'center'        => __( 'Center', 'yali' ),
        'right'         => __( 'Right', 'yali' ),
      ),
	  ));

    $cb_box->add_field( array(
      'name'               => 'Background Color',
	    'desc'                => '',
	    'id'                  => $prefix . 'cb_bg_color',
	    'type'                => 'colorpicker',
	    'default'             => '#ffffff',
      'attributes'          => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' ),
        )),
      ),
	  ));

    $button_group = $cb_box->add_field( array(
      'id'                => $prefix . 'cb_button',
      'type'              => 'group',
      'description'       => __( '', 'yali' ),
      'repeatable'        => false, 
      'options'           => array(
        'group_title'   => __( 'Button', 'yali' ),
      )
    ));

    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cb_box->add_group_field( $button_group, array(
      'name' => 'Label',
      'id'   => 'label',
      'type' => 'text'
    ));

    $cb_box->add_group_field( $button_group, array(
      'name' => 'Link',
      'id'   => 'link',
      'type' => 'text'
    ));

    $cb_box->add_group_field( $button_group, array(
      'name'               => 'Background Color',
	    'desc'                => '',
	    'id'                  => 'bg_color',
	    'type'                => 'colorpicker',
	    'default'             => '#ffffff',
      'attributes'          => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' ),
        )),
      ),
	  ));

    $cb_box->add_group_field( $button_group, array(
      'name'             => 'Alignment',
	    'desc'             => '',
	    'id'               => 'h_alignment',
	    'type'             => 'select',
	    'default'          => 'left',
      'options'          => array(
        'left'           => __( 'Left', 'yali' ),
        'center'         => __( 'Center', 'yali' ),
        'right'          => __( 'Right', 'yali' ),
      ),
	  ));

    $cb_box->add_group_field( $button_group, array(
      'name'             => 'Button position',
	    'desc'             => '',
	    'id'               => 'position',
	    'type'             => 'select',
	    'default'          => 'after',
      'options'          => array(
        'before'         => __( 'Before content', 'yali' ),
        'after'          => __( 'After content', 'yali' )
      ),
	  ));

  }

  /**
   * Adds custom column headers to content block admin list
   *
   * @param [type] $columns
   * @return void
   */
  public function edit_content_block_post_columns( $columns ) {
    $columns = array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Content Block'),
        'author' => __('Author'),
        'date' => __('Date'),
        'display_shortcode' => __('Display Shortcode')
    );

    return $columns;
  }

  public function manage_content_block_post_columns($column, $post_id) {
    global $post;

    switch( $column ) {
      case 'display_shortcode':
        echo '<input type="text" size="35" value="[content_block id=\'' . $post_id .  '\']" readonly/>';
        break;        
      default: 
        break;
    }
  }  
}

new Content_Block();
