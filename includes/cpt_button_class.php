<?php

namespace Yali;

use Twig_YALI_Extension;

class Custom_Button {

  public function __construct() {
      add_action( 'cmb2_admin_init',                          array($this, 'custom_button_values') );
      add_action( 'admin_enqueue_scripts',                    array($this, 'admin_enqueue_scripts') );
      add_filter( 'manage_edit-custom_button_columns',        array($this, 'edit_custom_button_post_columns') );
      add_filter( 'manage_custom_button_posts_custom_column', array($this, 'manage_custom_button_post_columns'), 10, 2 );
  }

  public function admin_enqueue_scripts() {
    wp_enqueue_script( 'cmb2-addon-js', get_stylesheet_directory_uri() . '/assets/admin/cmb2.js',array( 'jquery' ), '1.0.0', true );
  }

  /**
   * Register the Custom Button custom post type
   *
   * @return void
   */
  public static function register() {
    $labels = array(
      'name'                => _x('Custom Buttons', 'post type general name'),
      'singular_name'       => _x('Custom Buttons', 'post type singular name'),
      'add_new'             => _x('Add New', 'Custom Button'),
      'add_new_item'        => __('Add New Custom Button'),
      'edit_item'           => __('Edit Custom Button'),
      'new_item'            => __('New Custom Button'),
      'view_item'           => __('View Custom Button'),
      'search_items'        => __('Search Custom Buttons'),
      'not_found'           => __('No Custom Buttons found'),
      'not_found_in_trash'  => __('No Custom Buttons found in Trash'),
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
      'supports'            => 'title',
      'has_archive'         => true
    );

    register_post_type( 'custom_button', $args );
	}

  /**
   * Adds the custom button specific metaboxes to admin screen
   *
   * @return void
   */
  public function custom_button_values() {

    $prefix = 'yali_';

    $btn_box = new_cmb2_box( array(
      'id'           =>  $prefix . 'cust_btn',
      'title'        => __( 'Add button', 'yali' ),
      'object_types' => array( 'custom_button' ),
      'priority'     => 'low'
    ));


    $btn_box->add_field( array(
      'name' => 'Link',
      'id'   => $prefix . 'cust_btn_link',
      'type' => 'link_picker'
    ));

    $btn_box->add_field( array(
      'name'               => 'Background color',
      'desc'                => '',
      'id'                  => $prefix . 'cust_btn_bg_color',
      'type'                => 'colorpicker',
      'default'             => '#ffffff',
      'attributes'          => array(
        'data-colorpicker'  => json_encode( array(
            'border'        => false,
            'palettes'      => array( '#ffffff', '#eeeeee', '#f2d400', '#25ace2', '#174f9f', '#192856' )
        ))
      )
    ));

    $btn_box->add_field( array(
      'name'             => 'Alignment',
      'desc'             => '',
      'id'               => $prefix . 'cust_btn_h_alignment',
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
   * Adds custom column headers to custom button admin list
   *
   * @param [type] $columns
   * @return void
   */
  public function edit_custom_button_post_columns( $columns ) {
    $columns = array(
        'cb' => '<input type="checkbox" />',
        'title' => __('Custom Button'),
        'author' => __('Author'),
        'date' => __('Date'),
        'display_shortcode' => __('Display Shortcode')
    );

    return $columns;
  }

  public function manage_custom_button_post_columns($column, $post_id) {
    global $post;

    switch( $column ) {
      case 'display_shortcode':
        echo '<input style="width:100%" type="text" size="35" value="[custom_button id=\'' . $post_id .  '\' title=\'' . $post->post_title .  '\']" readonly/>';
        break;
      default:
        break;
    }
  }
}

new Custom_Button();
