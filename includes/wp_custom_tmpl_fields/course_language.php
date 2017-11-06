<?php

// Adds option to select course language so course template knows which template header to select

add_action('cmb2_init', 'course_lang_indicator');
function course_lang_indicator() {
	$prefix = '_yali_';

	$course_lang = new_cmb2_box( array(
		'id'           => 'course_lang',
    'title'        => 'What language is this course in?',
    'object_types' => array( 'page'),
    'show_on'      => array( 'key' => 'page-template', 'value' => 'page-templates/course-template.php'),
    'context'      => 'side',
    'priority'     => 'high',
    'show_in_rest' => true
	) );

	$course_lang->add_field( array(
		'name' => '',
		'id'   => $prefix . 'course_lang_indicator',
		'type' => 'radio',
		'options' => array(
			'en'   => __( 'English' ),
			'fr'   => __( 'French' ),
      'pt'   => __( 'Portuguese' ),
			'es'	 => __( 'Spanish' )
		),
		'default' => 'en'
	));
}
