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
    	'name'    => 'Enter Paragraph 1 Text',
	    'id'      => $prefix . 'intro_content_txt1',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    $mwf_intro->add_field( array(    	
    	'name'    => 'Enter Paragraph 2 Text (Optional)',
	    'id'      => $prefix . 'intro_content_txt2',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    $mwf_intro->add_field( array(    	
    	'name'    => 'Enter Paragraph 3 Text (Optional)',
	    'id'      => $prefix . 'intro_content_txt3',
	    'type'    => 'textarea',
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

	$mwf_section1->add_field( array(    	
    	'name'    => 'Enter Section 1 Title',
	    'id'      => $prefix . 'section1_title',
	    'type'    => 'text'	    
    ) );

	$mwf_section1->add_field( array(    	
    	'name'    => 'Enter Paragraph 1 Text',
	    'id'      => $prefix . 'section1_content_txt1',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );	

	$mwf_section1->add_field( array(    	
    	'name'    => 'Enter Paragraph 2 Text (Optional)',
	    'id'      => $prefix . 'section1_content_txt2',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

	$mwf_section1->add_field( array(    	
    	'name'    => 'Enter Paragraph 3 Text (Optional)',
	    'id'      => $prefix . 'section1_content_txt3',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    // Section 2
    $mwf_section2 = new_cmb2_box( array(
		'id'           =>  $prefix . 'section2',
    	'title'        => __( 'Enter Section 2 Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );

	$mwf_section2->add_field( array(    	
    	'name'    => 'Enter Section 2 Title',
	    'id'      => $prefix . 'section2_title',
	    'type'    => 'text'	    
    ) );

	$mwf_section2->add_field( array(    	
    	'name'    => 'Enter Paragraph 1 Text',
	    'id'      => $prefix . 'section2_content_txt1',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );	

	$mwf_section2->add_field( array(    	
    	'name'    => 'Enter Paragraph 2 Text (Optional)',
	    'id'      => $prefix . 'section2_content_txt2',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

	$mwf_section2->add_field( array(    	
    	'name'    => 'Enter Paragraph 3 Text (Optional)',
	    'id'      => $prefix . 'section2_content_txt3',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    // Application Section
    $mwf_application = new_cmb2_box( array(
		'id'           =>  $prefix . 'application',
    	'title'        => __( 'Enter Application Content', 'mwf' ),
    	'object_types' => array( 'page' ),
    	'context'      => 'advanced',
    	'priority'     => 'high',
    	'show_on'      => array('key' => 'page-template', 'value' => 'page-templates/mwf.php'),
    	'show_in_rest' => true
	) );

	$mwf_application->add_field( array(    	
    	'name'    => 'Upload Application Instructions PDF',
	    'id'      => $prefix . 'application_instructions_pdf',
	    'type'    => 'file'	    
    ) );

    $mwf_application->add_field( array(    	
    	'name'    => 'Set Application Date, Time and Add To Calendar',
	    'id'      => $prefix . 'application_date',
	    'type'    => 'wysiwyg'
    ) );

    $mwf_application->add_field( array(    	
    	'name'    => 'Choose Application Open Date',
	    'id'      => $prefix . 'application_open_date',
	    'type'    => 'text_date_timestamp'	    
    ) );

    $mwf_application->add_field( array(    	
    	'name'    => 'Choose Application Open Time',
	    'id'      => $prefix . 'application_open_time',
	    'type'    => 'text_time',
	    'time_format' => 'g:ia'    
    ) );

	$mwf_application->add_field( array(    	
    	'name'    => 'Enter Application Section Title',
	    'id'      => $prefix . 'application_title',
	    'type'    => 'text'	    
    ) );

    $mwf_application->add_field( array(
    	'name'    => 'Application Process Timeline',
	    'id'      => $prefix . 'application_process_timeline',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    $mwf_application->add_field( array(
    	'name'    => 'Application Selection Process',
	    'id'      => $prefix . 'application_selection_process',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );

    $mwf_application->add_field( array(
    	'name'    => 'Who Is Eligible to Apply Section',
	    'id'      => $prefix . 'application_eligibility',
	    'type'    => 'wysiwyg'	    
    ) );

    $mwf_application->add_field( array(
    	'name'    => 'Criteria Selection Section',
	    'id'      => $prefix . 'application_criteria',
	    'type'    => 'wysiwyg'	    
    ) );

    $mwf_application->add_field( array(
    	'name'    => 'Application Information',
	    'id'      => $prefix . 'application_info',
	    'type'    => 'textarea',
	    'options' => array( 'textarea_rows' => 10, )
    ) );
}