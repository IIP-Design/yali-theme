<?php

namespace Yali;

class Bios {

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
			'rewrite'      		  => array( 'slug' => 'bios', 'with_front' => false ),
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'menu_position'       => 5,
			'supports'            => array('title','thumbnail','editor')
		);
		
		register_post_type( 'bios', $args );
	}

	public function content_block_fields() {

		$prefix = 'yali_';

		$bio_box = new_cmb2_box( array(
			'id'           => $prefix . 'bio_box',
			'title'        => __( 'Bio Fields', 'yali' ),
			'object_types' => array( 'bios' )
		) );

		$bio_box->add_field( array(
			'id'   => $prefix . 'bio_position',
			'name' => __( 'Position', 'yali' ),
			'type' => 'text'
		) );

		$bio_box->add_field( array(
			'id'   => $prefix . 'bio_organization',
			'name' => __( 'Organization', 'yali' ),
			'type' => 'text'
		) );

		$bio_box->add_field( array(
			'id'         => $prefix . 'bio_contact',
			'name'       => __( 'Best Ways to Contact Me', 'yali' ),
			'type'       => 'text',
			'repeatable' => true,
			'attributes' => array(
				'placeholder' => 'Enter an email address or social media profile URL'
			),
			'options'    => array(
				'add_row_text' => __( 'Add contact method', 'yali' )
			)
		) );
	}
}

new Bios();
