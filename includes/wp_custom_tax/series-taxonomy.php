<?php 
if ( ! function_exists( 'series_taxonomy' ) ) {
	// Register Series Taxonomy
	function series_taxonomy() {

		$labels = array(
			'name'                       => _x( 'Series', 'Taxonomy General Name', 'text_domain' ),
			'singular_name'              => _x( 'Series', 'Taxonomy Singular Name', 'text_domain' ),
			'menu_name'                  => __( 'Series', 'text_domain' ),
			'all_items'                  => __( 'All Series', 'text_domain' ),
			'parent_item'                => __( 'Parent Series', 'text_domain' ),
			'parent_item_colon'          => __( 'Parent Series:', 'text_domain' ),
			'new_item_name'              => __( 'New Series', 'text_domain' ),
			'add_new_item'               => __( 'Add New Series', 'text_domain' ),
			'edit_item'                  => __( 'Edit Series', 'text_domain' ),
			'update_item'                => __( 'Update Series', 'text_domain' ),
			'view_item'                  => __( 'View Series', 'text_domain' ),
			'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
			'add_or_remove_items'        => __( 'Add or remove items', 'text_domain' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
			'popular_items'              => __( 'Popular Series Items', 'text_domain' ),
			'search_items'               => __( 'Search Series Items', 'text_domain' ),
			'not_found'                  => __( 'Not Found', 'text_domain' ),
			'no_terms'                   => __( 'No Series items', 'text_domain' ),
			'items_list'                 => __( 'Series Items list', 'text_domain' ),
			'items_list_navigation'      => __( 'Series Items list navigation', 'text_domain' ),
		);
		$rewrite = array(
			'slug'       				 => 'series',
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
		register_taxonomy( 'series', array( 'post' ), $args );

	}
	add_action( 'init', 'series_taxonomy', 0 );
}