<?php

namespace Yali;

class Bio {

	public function __construct() {
		add_action( 'cmb2_admin_init', array($this, 'content_block_fields') );
	}

	public static function register() {
		$labels = array(
			'name'                  => 'Bios',
			'singular_name'         => 'Bio',
			'add_new_item'          => 'Add New Bio',
			'edit_item'             => 'Edit Bio',
			'new_item'              => 'New Bio',
			'view_item'             => 'View Bio',
			'search_items'          => 'Search Bios',
			'not_found'             => 'No bios found.',
			'not_found_in_trash'    => 'No bios found in the trash.',
			'parent_item_colon'     => 'Parent Bio:',
			'all_items'             => 'All Bios',
			'archives'              => 'Bios',
			'insert_into_item'      => 'Insert into bio',
			'uploaded_to_this_item' => 'Uploaded to this bio',
			'filter_items_list'     => 'Filter bios list',
			'items_list_navigation' => 'Bios list navigation',
			'items_list'            => 'Bios list'
		);

		$args = array(
			'labels'              => $labels,
			'menu_icon'    		  => 'dashicons-id-alt',
			'public'              => true,
	    'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_rest'        => true,
			'query_var'           => true,			
			'rewrite'      		  	=> true,
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'menu_position'       => 5,
			'supports'            => array('title','thumbnail', 'excerpt', 'editor'),
			'has_archive'         => true
		);
		
		register_post_type( 'bio', $args );
	}

	public function content_block_fields() {

		$prefix = 'yali_';

		$bio_box = new_cmb2_box( array(
			'id'           => $prefix . 'bio_box',
			'title'        => __( 'Bio Fields', 'yali' ),
			'object_types' => array( 'bios' )
		) );

		$bio_box->add_field( array(
			'id'   => $prefix . 'bio_title',
			'name' => __( 'Title', 'yali' ),
			'type' => 'text'
		));		
	}
}

new Bio();
