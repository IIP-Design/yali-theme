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
  
    /****************************************************************
      Include Content Block Metaboxes
    *****************************************************************/    
    foreach( glob(get_stylesheet_directory() . '/includes/content_block_metaboxes/*.php') as $block_file ) {
      require_once $block_file;
    }
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
     'order'   => 'ASC',
     'hide_empty' => '0'
    ));

    $cat_options['select'] = 'Select';
    foreach( $categories as $category ) {
      if( $category->name != 'Uncategorized' )
      $cat_options[$category->slug] = $category->name;
    }

    return $cat_options;
  }

  /**
   * Fetch Wordpress series
   * @todo fetch from CDP
   *
   * @return void
   */
  public function fetch_series() {
    $series_options =  array();
    $series = get_terms( 'series', array(
      'hide_empty' => false,
    ));

    $series_options['select'] = 'Select';
    foreach( $series as $s ) {
      $series_options[$s->slug] = $s->name;
    }

    return $series_options;
  }

    /**
   * Fetch Wordpress series
   * @todo fetch from CDP
   *
   * @return void
   */
  public function fetch_tags() {
    $tags_options =  array();
    $tags = get_tags();

    $tags_options['select'] = 'Select';
    foreach( $tags as $tag ) {
      $tags_options[$tag->slug] = $tag->name;
    }

    return $tags_options;
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
