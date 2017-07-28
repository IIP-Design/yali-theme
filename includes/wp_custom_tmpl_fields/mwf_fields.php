<?php
/*
* Add Custom Fields for Mandela Washington Fellowship Custom Template
* template file name:  mwf.php
*/

// Remove Default Meta Boxes
add_action('admin_head', 'mwf_remove_meta_boxes');
function mwf_remove_meta_boxes() {
	global $post;
	
	if(!empty($post)) {
		$pageTemplate = get_post_meta($post->ID, '_wp_page_template', true);		
		if( $pageTemplate == 'page-templates/mwf.php' ) {
			remove_post_type_support('page', 'editor');
			remove_meta_box('postexcerpt', 'page', 'normal');
		}
	}
}

// Move CMB2 Meta boxes to top of admin screen
add_action('edit_form_after_title', function() {
	global $post, $wp_meta_boxes;
	do_meta_boxes(get_current_screen(), 'advanced', $post);
	unset($wp_meta_boxes[get_post_type($post)]['advanced']);
});

// Add CMB2 Custom Fields
add_action('cmb2_init', 'mwf_fields');
function mwf_fields() {
	$prefix = 'mwf_';

	// Intro
	$mwf_intro = new_cmb2_box( array(
		'id'           =>  $prefix . 'intro',
    	'title'        => __( 'Enter Intro Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );

	$mwf_intro->add_field( array(    	
	    'id'      => $prefix . 'intro_content',
	    'type'    => 'wysiwyg',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

	// Section 1
    $mwf_section1 = new_cmb2_box( array(
		'id'           =>  $prefix . 'section1',
    	'title'        => __( 'Enter Section 1 Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );	
}