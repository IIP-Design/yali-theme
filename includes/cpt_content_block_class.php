<?php

namespace Yali;

use Twig_YALI_Extension;

class Content_Block {

  public function __construct() {
    add_action( 'cmb2_admin_init',                            array( $this, 'content_block_fields' ) );
    add_action( 'admin_enqueue_scripts',                      array( $this, 'cmb2_toggle_metaboxes_JS' ) );
    add_action( 'admin_init',                                 array( $this, 'remove_yoast_filters' ), 20 );
    add_action( 'restrict_manage_posts',                      array( $this, 'add_block_type_filter' ) );
    add_filter( 'pre_get_posts',                              array( $this, 'limit_search_to_content_blocks' ) );
    add_action( 'pre_get_posts',                              array( $this, 'set_block_type_orderby' ) );
    add_filter( 'manage_edit-content_block_columns',          array( $this, 'set_columns' ) );
    add_filter( 'manage_edit-content_block_sortable_columns', array( $this, 'make_column_sortable' ) );
    add_action( 'manage_content_block_posts_custom_column',   array( $this, 'populate_columns' ), 10, 2 );
    add_filter( 'parse_query',                                array( $this, 'filter_blocks_by_type' ) );
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
      'name'                => _x( 'Content Blocks', 'post type general name', 'yali' ),
      'singular_name'       => _x( 'Content Block', 'post type singular name', 'yali' ),
      'add_new'             => _x( 'Add New', 'Content Block', 'yali' ),
      'add_new_item'        => __( 'Add New Content Block', 'yali' ),
      'edit_item'           => __( 'Edit Content Block', 'yali' ),
      'new_item'            => __( 'New Content Block', 'yali' ),
      'view_item'           => __( 'View Content Block', 'yali' ),
      'search_items'        => __( 'Search Content Blocks', 'yali' ),
      'not_found'           => __( 'No Content Block found', 'yali' ),
      'not_found_in_trash'  => __( 'No Content Blocks found in Trash', 'yali' ),
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
      'supports'            => array( 'title', 'thumbnail', 'excerpt' ),
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
  public function set_columns( $columns ) {
    $columns = array(
      'cb'                => '<input type="checkbox" />',
      'title'             => __('Content Block'),
      'block_type'        => __('Block Type'),
      'author'            => __('Author'),
      'date'              => __('Date'),
      'display_shortcode' => __('Display Shortcode')
    );

    return $columns;
  }

  // Add custom columns for blocktype and shortcode
  public function populate_columns( $column, $post_id ) {
    global $post;

    switch( $column ) {
      case 'block_type':
        $block_type = get_post_meta( $post_id, 'yali_cb_type', true );
        if ( is_string( $block_type ) )       
          echo ucwords( str_replace( '_', ' ', $block_type ) );
        else
          echo '';
        break;
      case 'display_shortcode':
        echo '<input style="width:100%" type="text" size="35" value="[content_block id=\'' . $post_id .  '\' title=\'' . $post->post_title .  '\']" readonly/>';
        break;        
      default: 
        break;
    }
  }

  // Make block type column sortable
  public function make_column_sortable( $columns ) {
    $columns['block_type'] = 'block_type';
    $columns['author'] = 'author';
    return $columns;
  }
  
  // Sort block type column alphabetically
  public function set_block_type_orderby( $query ) {
    if( ! is_admin() || ! $query->is_main_query() ) {
      return;
    }

    if ( 'block_type' === $query->get( 'orderby') ) {
      $query->set( 'orderby', 'meta_value' );
      $query->set( 'meta_key', 'yali_cb_type' );
    }
  }
  
  // Add drop down to filter content blocks by block type
  public function add_block_type_filter() {
    global $typenow;
    global $wp_query;
    
    if ( $typenow == 'content_block' ) {
      $filters = array( 
        'Accordion' => 'accordion',
        'Button Links' => 'button_links',
        'Call to Action' => 'cta',
        'Campaigns List' => 'campaigns_list',
        'Media Block' => 'media_block',
        'Page List' => 'page_list',
        'Post List' => 'post_list',
        'Post List w/ Filters' => 'filtered_list',
        'Social Icons' => 'social',
        'Text Block' => 'text_block' 
      );
      $current_filter = '';

      if( isset( $_GET['block_type'] ) ) {
        $current_filter = $_GET['block_type'];
      } ?>

      <select name="block_type" id="block_type">
        <option value="all" <?php selected( 'all', $current_filter ); ?>>
          <?php _e( 'All Block Types', 'yali' ); ?>
        </option>
        <?php foreach( $filters as $key => $value ) { ?>
          <option value="<?php echo esc_attr( $value );?>" <?php selected( $value, $current_filter ); ?>>
            <?php echo esc_attr( $key ); ?>
          </option>
        <?php } ?>
      </select><?php
    }
  }

  public function limit_search_to_content_blocks( $query ) {
    $post_type = $_GET['post_type'];

    if ( $query->is_search ) {
      if ( !empty( $post_type ) ) {
        $query->set( 'post_type', $post_type );
      }
    }

    return $query;
  }

  // Filter results by drop down selection
  public function filter_blocks_by_type( $query ) {
    global $pagenow;
    
    $post_type = isset( $_GET['post_type'] ) ? $_GET['post_type'] : '';

    if ( is_admin() && $pagenow == 'edit.php' && $post_type == 'content_block' && isset( $_GET['block_type'] ) && $_GET['block_type'] !='all' ) {
      $query->query_vars['meta_key'] = 'yali_cb_type';
      $query->query_vars['meta_value'] = $_GET['block_type'];
    }
  }
  
  // Remove Yoast post filter and readability dropdowns from content block admin page
  function remove_yoast_filters() {
    global $wpseo_meta_columns;
    global $typenow;
  
    if ( $wpseo_meta_columns && $typenow == 'content_block') {
      remove_action( 'restrict_manage_posts', array( $wpseo_meta_columns, 'posts_filter_dropdown' ) );
      remove_action( 'restrict_manage_posts', array( $wpseo_meta_columns, 'posts_filter_dropdown_readability' ) );
    }
  }
}

new Content_Block();
