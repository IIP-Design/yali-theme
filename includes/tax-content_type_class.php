<?php

namespace Yali;

class Content_Type_Tax {

	public static function register() {
		$labels = array(
			'name'                       => _x( 'Content Type', 'Taxonomy General Name', 'text_domain' ),
			'singular_name'              => _x( 'Content Type', 'Taxonomy Singular Name', 'text_domain' ),
			'menu_name'                  => __( 'Content Types', 'text_domain' ),
			'all_items'                  => __( 'All Content Types', 'text_domain' ),
			'parent_item'                => __( 'Parent Content Type', 'text_domain' ),
			'parent_item_colon'          => __( 'Parent Content Type:', 'text_domain' ),
			'new_item_name'              => __( 'New Content Type', 'text_domain' ),
			'add_new_item'               => __( 'Add New Content Type', 'text_domain' ),
			'edit_item'                  => __( 'Edit Content Type', 'text_domain' ),
			'update_item'                => __( 'Update Content Type', 'text_domain' ),
			'view_item'                  => __( 'View Content Type', 'text_domain' ),
			'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
			'add_or_remove_items'        => __( 'Add or remove items', 'text_domain' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
			'popular_items'              => __( 'Popular Content Type Items', 'text_domain' ),
			'search_items'               => __( 'Search Content Type Items', 'text_domain' ),
			'not_found'                  => __( 'Not Found', 'text_domain' ),
			'no_terms'                   => __( 'No Content Type items', 'text_domain' ),
			'items_list'                 => __( 'Content Type Items list', 'text_domain' ),
			'items_list_navigation'      => __( 'Content Type Items list navigation', 'text_domain' ),
		);		
		
		$rewrite = array(
			'slug'       				 => 'content-type',
			'with_front' 				 => true,
			'hierarchical'   			 => true,
		);
		
		$args = array(
			'labels'                     => $labels,
			'hierarchical'               => true,
			'public'                     => true,
			'show_ui'                    => true,
			'show_admin_column'          => true,
			'show_in_nav_menus'          => true,
			'show_tagcloud'              => true,			
			'rewrite'    				 => $rewrite,
			'show_in_rest'               => true,			
		);
		
		register_taxonomy( 'content_type', array( 'post' ), $args );	
	}
}