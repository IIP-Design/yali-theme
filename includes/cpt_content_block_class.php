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
        'social'         => __( 'Social Icons', 'yali' ),
        'post_list'      => __( 'Post List', 'yali' )
      )
	  ));

    $cb_box->add_field( array(
      'name' => 'Underline title?',
      'desc' => '',
      'id'   => $prefix . 'cb_title_underline',
      'type' => 'checkbox'
    ) );


    $cb_box->add_field( array(
      'name'             => 'Title alignment',
	    'desc'             => 'How should the block title be aligned?',
	    'id'               => $prefix . 'cb_title_alignment',
	    'type'             => 'select',
	    'default'          => 'left',
      'options'          => array(
        'left'           => __( 'Left', 'yali' ),
        'center'         => __( 'Center', 'yali' ),
        'right'          => __( 'Right', 'yali' )
      )
	  ));
    
    $cb_box->add_field( array(
      'name'            => 'Excerpt alignment',
	    'desc'            => 'How should the excerpt be aligned?',
	    'id'              => $prefix . 'cb_excerpt_alignment',
	    'type'            => 'select',
	    'default'         => 'left',
      'options'         => array(
        'left'          => __( 'Left', 'yali' ),
        'center'        => __( 'Center', 'yali' ),
        'right'         => __( 'Right', 'yali' )
      )
	  ));

    $cb_box->add_field( array(
      'name'            => 'Text alignment',
	    'desc'            => 'How should the remaining text be aligned?',
	    'id'              => $prefix . 'cb_text_alignment',
	    'type'            => 'select',
	    'default'         => 'left',
      'options'         => array(
        'left'          => __( 'Left', 'yali' ),
        'center'        => __( 'Center', 'yali' ),
        'right'         => __( 'Right', 'yali' )
      )
	  ));

    $cb_box->add_field( array(
      'name'               => 'Background color',
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

     ///*** Start Widget post group  ***///
    $post_group = $cb_box->add_field( array(
      'id'   => $prefix . 'cb_widget',
      'type' => 'group',
      'description'  => __( '', 'yali' ),
      'repeatable' => false, 
      'options' => array(
        'group_title'  => __( 'CDP Widget', 'yali' ),
      ), 
      'attributes' => array(
        'required'               => true, // Will be required only if visible.
        'data-conditional-id'    => $prefix . 'cb_type',
        'data-conditional-value' => 'post_list'
		  )
    ));
    
    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cb_box->add_group_field( $post_group, array(
      'name'             => 'Post Type',
	    'desc'             => '',
	    'id'               => 'cdp_module',
	    'type'             => 'select',
	    'default'          => 'article-feed',
      'options'          => array(
        'article-feed'   => __( 'Article Feed', 'yali' )
      )
	  ));

    $cb_box->add_group_field( $post_group, array(
      'name'             => 'Number of posts',
	    'id'               => 'cdp_num_posts',
	    'type'             => 'text_small',
      'default'           => 3
	  ));

    //@todo Fetch from API or taxonomy type
    global $cat_options;
    $categories = get_categories( array(
      'orderby' => 'name',
      'order'   => 'ASC'
    ));
   
    $cat_options['select'] = 'Select';
    foreach( $categories as $category ) {
      $cat_options[$category->name] = $category->name;
    }

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Category',
	    'desc'            => 'Select a category to display',
	    'id'              => 'cdp_category',
	    'type'            => 'select',
	    'default'         => 'select',
      'options'         => $cat_options
	  ));

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Post layout',
	    'desc'            => 'Default or Blog style',
	    'id'              => 'cdp_ui_layout',
	    'type'            => 'select',
	    'default'         => 'default',
      'options'         => array(
        'default'       => __( 'Default', 'yali' ),
        'blog'          => __( 'Blog', 'yali' )
      )
	  ));

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Post layout direction',
	    'id'              => 'cdp_ui_direction',
	    'type'            => 'select',
	    'default'         => 'row',
      'options'         => array(
        'row'           => __( 'Horizontal', 'yali' ),
        'column'        => __( 'Vertical', 'yali' )
      )
	  ));

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Image shape',
	    'id'              => 'cdp_image_shape',
	    'type'            => 'select',
	    'default'         => 'rectangle',
      'options'         => array(
        'rectangle'     => __( 'Rectangle', 'yali' ),
        'circle'        => __( 'Circle', 'yali' )
      )
	  )); 

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Image height',
	    'id'              => 'cdp_image_height',
	    'type'            => 'text_small',
      'default'         => 220
	  )); 

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Image border width',
	    'id'              => 'cdp_border_width',
	    'type'            => 'text_small',
      'default'         => 0
	  )); 

    $cb_box->add_group_field( $post_group, array(
      'name'               => 'Image border color',
	    'id'                 => 'cdp_border_color',
	    'type'               => 'colorpicker',
	    'default'            => '#192856',
      'attributes'         => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' ),
        ))
      )
	  ));

    $cb_box->add_group_field( $post_group, array(
      'name'            => 'Image border style',
	    'id'              => 'cdp_border_style',
	    'type'            => 'select',
	    'default'         => 'solid',
      'options'         => array(
        'solid'         => __( 'Solid', 'yali' ),
        'dashed'        => __( 'Dashed', 'yali' ),
        'dotted'        => __( 'Dotted', 'yali' ),
        'double'        => __( 'Double', 'yali' ),
        'groove'        => __( 'Groove', 'yali' ),
        'ridge'         => __( 'Ridge', 'yali' ),
        'inset'         => __( 'Inset', 'yali' ),
        'outset'        => __( 'Outset', 'yali' )
      )
	  ));  
   ///*** End Widget post group  ***///

    ///***  Button group  ***///
    $button_group = $cb_box->add_field( array(
      'id'                => $prefix . 'cb_button',
      'type'              => 'group',
      'description'       => __( '', 'yali' ),
      'repeatable'        => false, 
      'options'           => array(
        'group_title'     => __( 'Button', 'yali' )
      )
    ));

    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cb_box->add_group_field( $button_group, array(
      'name' => 'Link',
      'id'   => 'link',
      'type' => 'link_picker'
    ));

    $cb_box->add_group_field( $button_group, array(
      'name'               => 'Background color',
	    'desc'                => '',
	    'id'                  => 'bg_color',
	    'type'                => 'colorpicker',
	    'default'             => '#ffffff',
      'attributes'          => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
        ))
      )
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
        'right'          => __( 'Right', 'yali' )
      )
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
      )
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
