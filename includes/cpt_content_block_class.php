<?php

namespace Yali;

use Twig_YALI_Extension;

class Content_Block {

  public function __construct() {
      add_action( 'cmb2_admin_init',                          array($this, 'content_block_fields') );  
      add_action( 'admin_enqueue_scripts',                    array($this, 'admin_enqueue_scripts') );  
      add_filter( 'manage_edit-content_block_columns',        array($this, 'edit_content_block_post_columns') );
      add_filter( 'manage_content_block_posts_custom_column', array($this, 'manage_content_block_post_columns'), 10, 2 );  
  }

  public function admin_enqueue_scripts() {
    wp_enqueue_script( 'cmb2-addon-js', get_stylesheet_directory_uri() . '/assets/admin/cmb2.js',array( 'jquery' ), '1.0.0', true );
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
    

    /*************************************************************************************************
    *                                        GENERAL FIELDS                                          *
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
      'name'                => 'Block Type',
	    'desc'                => 'Type of content block',
	    'id'                  => $prefix . 'cb_type',
	    'type'                => 'select',
	    'default'             => 'post_list',
      'options'             => array(
        'cta'               => __( 'Call To Action', 'yali' ),
        'social'            => __( 'Social Icons', 'yali' ),
        'post_list'         => __( 'Post List', 'yali' ),
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
    
    // Underline title
    $cb_box->add_field( array(
      'name' => 'Underline title?',
      'desc' => '',
      'desc' => '',
      'id'   => $prefix . 'cb_title_underline',
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



    /*************************************************************************************************
    *                                        POST LIST                                               *
    **************************************************************************************************/
    $cb_box_cdp = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_box_cdp',
      'title'        => __( 'Post List', 'america' ),
      'object_types' => array( 'content_block' ),
      'priority'     => 'low'
    ));

    // Select posts by
    $cb_box_cdp->add_field(  array(
      'name'             => __( 'Select posts by:', 'america' ),
	    'id'               => $prefix . 'cdp_select_type_posts',
	    'type'             => 'radio',
      'default'          => 'recent',
      'classes'          => 'cdp-select-posts-by',
      'show_option_none' => false,
      'options'          => array(
        'recent'         => __( 'Displaying most recent or most recent in a category', 'america' ),
        'custom'         => __( 'Choosing specifc posts', 'america' ),
        'custom_link'    => __( 'Choosing specifc posts and adding a supplementary link', 'america' ),
      ),
      'desc'             =>  __( '', 'america' )
	  ));
    
    // Number of posts
    $cb_box_cdp->add_field(  array(
      'name'                      => 'Number posts to show',
	    'id'                        => $prefix . 'cdp_num_posts',
	    'type'                      => 'text_small',
      'default'                   => 3,
      'attributes'                => array(
        'data-conditional-id'     => $prefix . 'cdp_select_type_posts',
        'data-conditional-value'  => 'recent'
      )
	  ));

    // Category list
    $cb_box_cdp->add_field( array(
      'name'                      => 'Post Category',
	    'desc'                      => 'Category from which posts will be pulled',
	    'id'                        => $prefix . 'cdp_category',
	    'type'                      => 'select',
	    'default'                   => 'select',
      'options'                   => $this->fetch_categories(),
      'attributes'                => array(
        'data-conditional-id'     => $prefix . 'cdp_select_type_posts',
        'data-conditional-value'  => 'recent'
      )
    ));

    // By selecting posts (CDP autocomplete)
    $cb_box_cdp->add_field( array(
      'name'                      => __( 'Posts', 'america' ),
      'id'                        => $prefix . 'cdp_autocomplete',
      'type'                      => 'cdp_autocomplete',
      'repeatable'                => true,
      'text'                      => array(
        'add_row_text'            => 'Add Another Post',
      )
    ));

    // By selecting individual posts with external link (group)
    $cb_box_post_group = $cb_box_cdp->add_field( array(
      'id'          => 'cdp_autocomplete_post_link_group',
      'type'        => 'group',
      'description' => __( '', 'america' ),
      'options'     => array(
        'group_title'   => __( 'Post {#}', 'america' ), // since version 1.1.4, {#} gets replaced by row number
        'add_button'    => __( 'Add Another Post', 'america' ),
        'remove_button' => __( 'Remove Post', 'america' )
      )
    ));

    // Group : autocomplete 
    $cb_box_cdp->add_group_field( $cb_box_post_group, array(
      'name'  => __( 'Post', 'america' ),
      'id'    => $prefix . 'cdp_autocomplete_post_link',
      'type'  => 'cdp_autocomplete'
    )); 
    
    // Group : external link
    $cb_box_cdp->add_group_field( $cb_box_post_group, array(
      'name'  => __( 'Additional Link', 'america' ),
      'id'    => $prefix . 'cdp_post_link',
      'type'  => 'cdp_post_link'
    )); 
    
    // Tags, author and publish date
    $cb_box_cdp->add_field( array(
      'name'    => 'Post fields to show',
      'desc'    => 'Check fields to include',
      'id'      => $prefix . 'cdp_fields',
      'type'    => 'multicheck_inline',
      'select_all_button' => false,
      'options' => array(
        'tags' => 'Tags',
        'author' => 'Author',
        'date' => 'Publish Date',
      ),
    ));
    
    // Post layout
    $cb_box_cdp->add_field( array(
      'name'            => __( 'Post layout', 'america' ),
	    'desc'            => __( 'Default (image above) or blog style (image to the left)', 'america' ),
	    'id'              => $prefix . 'cdp_ui_layout',
	    'type'            => 'select',
	    'default'         => 'default',
      'options'         => array(
        'default'       => __( 'Default', 'america' ),
        'blog'          => __( 'Blog', 'america' )
      )
	  ));

    // Post layout direction
    $cb_box_cdp->add_field( array(
      'name'            => 'Post layout direction',
      'desc'            => '',
	    'id'              => $prefix . 'cdp_ui_direction',
	    'type'            => 'select',
	    'default'         => 'row',
      'options'         => array(
        'row'           => __( 'Horizontal', 'america' ),
        'column'        => __( 'Vertical', 'america' )
      )
	  ));

    // Post image config
    $cb_box_cdp->add_field( array(
      'name'  => __( 'Post Image', 'america' ),
      'id'    => $prefix . 'cdp_image',
      'type'  => 'cdp_image'
    )); 
    
  
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
  }  

  /**
   * Fetch Wordpress categories
   * @todo fetch from CDP
   *
   * @return void
   */
  public function fetch_categories() {
     $cat_options =  array();
     $categories = get_categories( array(
       'orderby' => 'name',
       'order'   => 'ASC'
     ));
    
     $cat_options['select'] = 'Select';
     foreach( $categories as $category ) {
       $cat_options[$category->name] = $category->name;
     }

     return $cat_options;
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
        echo '<input style="width:100%" type="text" size="35" value="[content_block id=\'' . $post_id .  '\' title=\'' . $post->post_title .  '\']" readonly/>';
        break;        
      default: 
        break;
    }
  }  
}

new Content_Block();
