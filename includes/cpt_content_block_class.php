<?php

namespace Yali;

class Content_BLock {

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
      'supports'            => array('title','editor','author','thumbnail','excerpt','custom-fields','post-formats'),
      'has_archive'         => true
    );

    register_post_type('content_blocks',$args);
	}

}