<?php

namespace Yali;

use Twig_YALI_Extension;

class Content_Block {

  public function __construct() {
      add_action( 'cmb2_admin_init',                          array($this, 'content_block_fields') );  
      add_action( 'admin_enqueue_scripts',                    array($this, 'cmb2_toggle_metaboxes_JS') );  
      add_filter( 'manage_edit-content_block_columns',        array($this, 'edit_content_block_post_columns') );
      add_filter( 'manage_content_block_posts_custom_column', array($this, 'manage_content_block_post_columns'), 10, 2 );  
  }

  //public function admin_enqueue_scripts() {
  public function cmb2_toggle_metaboxes_JS() {

    if( function_exists('get_current_screen') ) {      
      $screen = get_current_screen();      

      if( $screen->base === 'post' && $screen->post_type === 'content_block' ) {        
        wp_enqueue_script( 'cmb2-addon-js', get_stylesheet_directory_uri() . '/assets/admin/cmb2.js',array( 'jquery' ), '1.0.0', true );
      }      
    }  
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

    //******  Start general fields  ******//
    $cb_box = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_box',
      'title'        => __( 'General fields', 'yali' ),
      'object_types' => array( 'content_block' ),
      'priority'     => 'high',
      'closed'       => false
    ));

    $cb_box->add_field( array(
      'name'             => 'Block Type',
	    'desc'             => 'What type of content block',
	    'id'               => $prefix . 'cb_type',
	    'type'             => 'select',
	    'default'          => 'cta',
      'options'          => array(
        'cta'            => __( 'Call To Action', 'yali' ),
        'social'         => __( 'Social Icons', 'yali' ),
        'post_list'      => __( 'Post List', 'yali' ),
        'accordion'      => __( 'Accordion', 'yali' )
      )
	  ));

    $cb_box->add_field( array(
      'name' => 'Underline title?',
      'desc' => '',
      'id'   => $prefix . 'cb_title_underline',
      'type' => 'checkbox'
    ));


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
      'name'               => 'Title color',
	    'desc'                => '',
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
      'name'               => 'Excerpt color',
	    'desc'                => '',
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
    
    $cb_box->add_field( array(
      'name'            => 'Excerpt font weight',
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
    

    //******  Start cdp widget fields  ******//
    $cb_box_cdp = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_box_cdp',
      'title'        => __( 'Add CDP Widget', 'yali' ),
      'object_types' => array( 'content_block' ),
      'priority'     => 'low'      
    ));
    
    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cb_box_cdp->add_field( array(
      'name'             => 'Widget',
	    'desc'             => '',
	    'id'               => $prefix . 'cdp_module',
	    'type'             => 'select',
	    'default'          => 'article-feed',
      'options'          => array(
        'article-feed'   => __( 'Article Feed', 'yali' )
      )
	  ));

    $cb_box_cdp->add_field(  array(
      'name'             => 'Number of posts',
	    'id'               => $prefix . 'cdp_num_posts',
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

    $cb_box_cdp->add_field( array(
      'name'            => 'Category',
	    'desc'            => 'Select a category to display',
	    'id'              => $prefix . 'cdp_category',
	    'type'            => 'select',
	    'default'         => 'select',
      'options'         => $cat_options
	  ));

    $cb_box_cdp->add_field( array(
      'name'            => 'Post layout',
	    'desc'            => 'Default or Blog style',
	    'id'              => $prefix . 'cdp_ui_layout',
	    'type'            => 'select',
	    'default'         => 'default',
      'options'         => array(
        'default'       => __( 'Default', 'yali' ),
        'blog'          => __( 'Blog', 'yali' )
      )
	  ));

    $cb_box_cdp->add_field( array(
      'name'            => 'Post layout direction',
	    'id'              => $prefix . 'cdp_ui_direction',
	    'type'            => 'select',
	    'default'         => 'row',
      'options'         => array(
        'row'           => __( 'Horizontal', 'yali' ),
        'column'        => __( 'Vertical', 'yali' )
      )
	  ));

    $cb_box_cdp->add_field( array(
      'name'            => 'Image shape',
	    'id'              => $prefix . 'cdp_image_shape',
	    'type'            => 'select',
	    'default'         => 'rectangle',
      'options'         => array(
        'rectangle'     => __( 'Rectangle', 'yali' ),
        'circle'        => __( 'Circle', 'yali' )
      )
	  )); 

    $cb_box_cdp->add_field( array(
      'name'            => 'Image height',
	    'id'              => $prefix . 'cdp_image_height',
	    'type'            => 'text_small',
      'default'         => 220
	  )); 

    $cb_box_cdp->add_field( array(
      'name'            => 'Image border width',
	    'id'              => $prefix . 'cdp_border_width',
	    'type'            => 'text_small',
      'default'         => 0
	  )); 

    $cb_box_cdp->add_field( array(
      'name'               => 'Image border color',
	    'id'                 => $prefix . 'cdp_border_color',
	    'type'               => 'colorpicker',
	    'default'            => '#192856',
      'attributes'         => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' ),
        ))
      )
	  ));

    $cb_box_cdp->add_field( array(
      'name'            => 'Image border style',
	    'id'              => $prefix . 'cdp_border_style',
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
  
    //******  Start button fields  ******//
    $cb_box_btn = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_box_btn',
      'title'        => __( 'Add button', 'yali' ),
      'object_types' => array( 'content_block' ),
      'priority'     => 'low'
    ));
  
 
    $cb_box_btn->add_field( array(
      'name' => 'Link',
      'id'   =>  $prefix . 'cb_box_btn_link',
      'type' => 'link_picker'
    ));

    $cb_box_btn->add_field( array(
      'name'               => 'Background color',
	    'desc'                => '',
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

    $cb_box_btn->add_field( array(
      'name'             => 'Alignment',
	    'desc'             => '',
	    'id'               => $prefix . 'cb_box_btn_h_alignment',
	    'type'             => 'select',
	    'default'          => 'center',
      'options'          => array(
        'left'           => __( 'Left', 'yali' ),
        'center'         => __( 'Center', 'yali' ),
        'right'          => __( 'Right', 'yali' )
      )
	  ));    

    /*** Social Block - Link Fields ***/
    $cb_social_links = new_cmb2_box( array(
      'id'           =>  $prefix . 'cb_social_links',
      'title'        => __( 'Edit Social Media Links', 'yali' ),
      'object_types' => array( 'content_block' ),
      'priority'     => 'low'
    ));  

    $cb_social_links->add_field( array(
      'name'  => 'Title',
      'id'    => $prefix . 'cb_social_links_title',
      'type'  => 'text',
      'default' => 'Stay connected with us:'
    ));

    $cb_social_links->add_field( array(
      'name'  => 'Facebook',
      'id'    => $prefix . 'cb_social_links_facebook',
      'type'  => 'text',
      'default' => 'https://www.facebook.com/YALINetwork'
    ));

    $cb_social_links->add_field( array(
      'name'  => 'Twitter',
      'id'    => $prefix . 'cb_social_links_twitter',
      'type'  => 'text',
      'default' => 'https://twitter.com/YALINetwork'
    ));

    $cb_social_links->add_field( array(
      'name'  => 'LinkedIn',
      'id'    => $prefix . 'cb_social_links_linkedin',
      'type'  => 'text',
      'default' => 'https://www.linkedin.com/groups/7425359/profile'
    ));


    /*** Accordion Block - Fields ***/
    $accordion = new_cmb2_box( array(
      'id'           => $prefix . 'cb_accordion',
      'title'        => __( 'Add Accordion Style Content Block', 'yali' ),
      'object_types' => array('content_block'),
      'priority'     => 'low'
    ));

    $accordion->add_field( array(
      'name' => 'Accordion Headline (Optional)',
      'id'   => $prefix . 'cb_accordion_headline',
      'type' => 'text'
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
