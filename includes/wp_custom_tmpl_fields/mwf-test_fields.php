<?php
/*
* Add Custom Fields for MWF Test Custom Template
* template file name:  mwf-test.php
*/

add_action('admin_head', 'mwf_test_remove_meta_boxes');
function mwf_test_remove_meta_boxes() {
	global $post;
	
	if(!empty($post)) {
		$pageTemplate = get_post_meta($post->ID, '_wp_page_template', true);		
		if( $pageTemplate == 'page-templates/mwf-test.php' ) {
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
add_action('cmb2_init', 'mwf_test_fields');
function mwf_test_fields() {
	$prefix = 'mwf_test_';

	// Intro
	$mwf_intro = new_cmb2_box( array(
		'id'           =>  $prefix . 'intro',
    	'title'        => __( 'Enter Intro Content', 'mwf-test' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf-test.php'),
    	'show_in_rest' => true
	) );

	$mwf_intro->add_field( array(    	
    	'name'    => 'Add Intro Content',
	    'id'      => $prefix . 'intro_content',
	    'type'    => 'wysiwyg',	    
    ) );


    // Application Section
    $mwf_application = new_cmb2_box( array(
		'id'           =>  $prefix . 'application',
    	'title'        => __( 'Enter Application Content', 'mwf-test' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf-test.php'),
    	'show_in_rest' => true
	) );

	$mwf_application->add_field( array(    	
    	'name'    => 'Upload Application Instructions PDF',
	    'id'      => $prefix . 'application_instructions_pdf',
	    'type'    => 'file'	    
    ) );

    $mwf_application->add_field( array(    	
    	'name'    => 'Add Application Content',
	    'id'      => $prefix . 'application_content',
	    'type'    => 'wysiwyg'
    ) );


    // Additional Content Section
    $mwf_addtl = new_cmb2_box( array(
		'id'           =>  $prefix . 'addtl',
    	'title'        => __( 'Enter Additional Content', 'mwf-test' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf-test.php'),
    	'show_in_rest' => true
	) );

	$mwf_addtl->add_field( array(    	
    	'name'    => 'Add Application Content',
	    'id'      => $prefix . 'addtl_content',
	    'type'    => 'wysiwyg'
    ) );

}