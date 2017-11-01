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
			remove_post_type_support('page', 'editor');;
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

	// Intro Content
	$mwf_introduction = new_cmb2_box( array(
		'id'           =>  $prefix . 'introduction',
    	'title'        => __( 'Enter Intro Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );

	$mwf_introduction->add_field( array(    	
    	'name'    => 'Intro Content',
	    'id'      => $prefix . 'introduction_content',
	    'type'    => 'wysiwyg',	    
    ) );

    // About the Fellowhsip
    $mwf_introduction = new_cmb2_box( array(
        'id'           =>  $prefix . 'about',
        'title'        => __( 'Enter About the Fellowship Content', 'mwf' ),
        'object_types' => array( 'page' ),
        'context'      => 'advanced',
        'priority'     => 'high',
        'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
        'show_in_rest' => true
    ) );

    $mwf_introduction->add_field( array(        
        'name'    => 'About Content',
        'id'      => $prefix . 'about_fellowship',
        'type'    => 'wysiwyg',     
    ) );

    // Application Section
 //    $mwf_application = new_cmb2_box( array(
	// 	'id'           =>  $prefix . 'application',
 //    	'title'        => __( 'Enter Application Content', 'mwf' ),
 //    	'object_types' => array( 'page' ),
 //    	'context'      => 'advanced',
 //    	'priority'     => 'high',
 //    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
 //    	'show_in_rest' => true
	// ) );

	// $mwf_application->add_field( array(    	
 //    	'name'    => 'Upload Application Instructions PDF',
	//     'id'      => $prefix . 'application_instructions_pdf',
	//     'type'    => 'file'	    
 //    ) );

 //    $mwf_application->add_field( array(    	
 //    	'name'    => 'Set Application Date, Time and Add To Calendar',
	//     'id'      => $prefix . 'application_date',
	//     'type'    => 'wysiwyg'
 //    ) );

	// $mwf_application->add_field( array( 
 //    	'name'    => 'Enter Application Section Title',
	//     'id'      => $prefix . 'application_title',
	//     'type'    => 'text'	    
 //    ) );

 //    $mwf_application->add_field( array(
 //    	'name'    => 'Application Process Timeline',
	//     'id'      => $prefix . 'application_process_timeline',
	//     'type'    => 'textarea',
	//     'options' => array( 'textarea_rows' => 10, )
 //    ) );

 //    $mwf_application->add_field( array(
 //    	'name'    => 'Application Selection Process',
	//     'id'      => $prefix . 'application_selection_process',
	//     'type'    => 'textarea',
	//     'options' => array( 'textarea_rows' => 10, )
 //    ) );

 //    $mwf_application->add_field( array(
 //    	'name'    => 'Who Is Eligible to Apply Section',
	//     'id'      => $prefix . 'application_eligibility',
	//     'type'    => 'wysiwyg'	    
 //    ) );

 //    $mwf_application->add_field( array(
 //    	'name'    => 'Criteria Selection Section',
	//     'id'      => $prefix . 'application_criteria',
	//     'type'    => 'wysiwyg'	    
 //    ) );

 //    $mwf_application->add_field( array(
 //    	'name'    => 'Application Information',
	//     'id'      => $prefix . 'application_info',
	//     'type'    => 'textarea',
	//     'options' => array( 'textarea_rows' => 10, )
 //    ) );

    // Additional Content Section
    $mwf_addtl = new_cmb2_box( array(
		'id'           =>  $prefix . 'addtl',
    	'title'        => __( 'Enter Additional Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );

	$mwf_addtl->add_field( array(
    	'name'    => 'Add Additional Content',
	    'id'      => $prefix . 'addtl_content',
	    'type'    => 'wysiwyg'	    
    ) );
}