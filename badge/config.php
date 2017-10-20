<?php

/**
 * Configuration files that holds the image settings for each project
 * SD = Screendoor
 * Get data from Screendoor API:
 * http://dobtco.github.io/screendoor-api-docs/
 * Sample config:
 * 	'2916' =>  array ( 																						// Project Identifier (if Formidable, then use the form key)
 *		'project' 				=> '#Africa4Her 2016',										// project name
 *		'prefix'					=> 'yali_africa2016_',										// prefix to append to the saved image
 *		'src_path'				=> '/images/yali_africa4her_bkgrd.png',		// image src path
 *		'save_path'				=> '/generated-images/',									// folder to save image in
 *		'font'	  				=> 'Lato-Regular.ttf',										// default proj font family of dynamic text (file saved in fonts dir)
 *		'font_size'				=> 40,								    								// default font size of dynamic text
 *		'color'						=> '#333333',															// default font color of dynamic text
 *		'align'						=> 'center',						    							// default text align of dynamic text
 *		'line_max_chars' 	=> 31,																		// max number of characters per line before text wraps
 *		'line_height' 		=> 62,																		// height of text line (sapce between lines)
 *		'text'						=> array (																// text content
 *			array (
 *				'content' 		=> 'FIELD', 															// use 'FIELD' string for runtime content & provide Formidable field key
 *				'field_id' 		=> 35173, 																// Formidable field key
 *				'x'		  			=> 428,																		// x position of text
 *				'y'		  			=> 250,																		// y position of text
 *				'color'				=> '#218b43'															// overide default color
 *			),
 *			array (
 *				'content' 		=> 'My name is',
 *				'x'		  			=> 40,
 *				'y'		  			=> 75,
 *				'color'				=> '#314071'
 *			),
 *			array (
 *				'content' 		=> 'FIELD',
 *				'field_id' 		=> 35164,
 *				'x'		  			=> 428,
 *				'y'		  			=> 385,
 *				'color'				=> '#218b43'
 *			),
 *			array (
 *				'content' 		=> 'FIELD',
 *				'field_id' 		=> 35170,
 *				'x'		  			=> 428,
 *				'y'		  			=> 426 ,
 *				'color'				=> '#bf202a',
 *				'font'				=> 'AvenirNext-Bold.ttf',
 *				'font_size' 	=> 24
 *			)
 *		)
 *	)
 */

return array(
	'get_pledge' 	=>  array (   					// Form that is sending certificate -- MUST match form key
		'prefix'					=> 'yali_pledge_',
		'src_path'				=> 'images/yali_pledge_bkgrd.png',
		'save_path'				=> '../../../uploads/generated-images/',
		'font'	  				=> 'fonts/Futuri Condensed Extra Bold.ttf',
		'font_size'				=> 50,
		'color'						=> '#314071',
		'align'						=> 'left',
		'line_max_chars' 	=> 40,
		'line_height' 		=> 42,
		'text'						=> array (
			array (
				'content' 		=> 'My name is',     	 // Static content
				'x'		  			=> 50,
				'y'		  			=> 70
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'pledge_name', 			// Pledge name (formidable field key) -- MUST match
				'x'		  			=> 300,
				'y'		  			=> 68,
				'color'				=> '#58afd5'
			),
			array (
				'content' 		=> 'and I pledge to:',		// Static content
				'x'		  			=> 50,
				'y'		  			=> 150
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'pledge',
				'x'		  			=> 50,
				'y'		  			=> 220,
				'color'				=> '#58afd5'
			)
		)
	),
	'get_earthday' 	=>  array (   					// Form that is sending certificate -- MUST match form key
		'prefix'					=> 'yali_earthday_',
		'src_path'				=> 'images/yali_earth_day_bkgrd.png',
		'save_path'				=> '../../../uploads/generated-images/',
		'font'	  				=> 'fonts/Lato-Regular.ttf',
		'font_size'				=> 32,
		'color'						=> '#bbd485',
		'align'						=> 'left',
		'line_max_chars' 	=> 40,
		'line_height' 		=> 40,
		'text'						=> array (
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'first_name', 			// First name (formidable field key) -- MUST match
				'x'		  			=> 175,
				'y'		  			=> 360
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'last_name', 	// Last Name (formidable field key)  -- MUST match
				'x'		  			=> 175,
				'y'		  			=> 410
			),
			array (
				'content' 		=> 'FIELD',      // Country (formidable field key)  -- MUST match
				'field_id'		=> 'country',
				'align'				=> 'left',
				'color'				=> '#06693a',
				'font-size'		=> 20,
				'x'		  			=> 175,
				'y'		  			=> 460
			)
		)
	),
	'get_yalilearns2016' 	=>  array (   					// Form that is sending certificate -- MUST match form key
		'prefix'					=> 'yali_learns_',
		'src_path'				=> 'images/yali_learns_pledge_bkgrd.png',
		'save_path'				=> '../../../uploads/generated-images/',
		'font'	  				=> 'fonts/AvenirNextCondensed-Heavy.ttf',
		'font_size'				=> 44,
		'color'						=> '#218b43',
		'align'						=> 'center',
		'line_max_chars' 	=> 40,
		'line_height' 		=> 50,
		'text'						=> array (
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'challenge',      // challenge
				'x'		  			=> 428,
				'y'		  			=> 270,
				'color'				=> '#bf202a',
				'font_size'		=> 30,
				'font'				=> 'fonts/AvenirNext-Bold.ttf'
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'full_name', 			// Full name (formidable field key) -- MUST match
				'x'		  			=> 428,
				'y'		  			=> 350
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'country2', 	// Country (formidable field key)  -- MUST match
				'x'		  			=> 428,
				'y'		  			=> 410
			)
		)
	),
	'get_certificate2' 	=>  array (   					// Form that is sending certificate -- MUST match form key
		'prefix'					=> 'yali_courses_',
		'src_path'				=> 'images/yali_course_bkgrd.png',
		'save_path'				=> '../../../uploads/generated-images/',
		'font'	  				=> 'fonts/Lato-Regular.ttf',
		'font_size'				=> 50,
		'color'						=> '#003d7d',
		'align'						=> 'center',
		'line_max_chars' 	=> 40,
		'line_height' 		=> 60,
		'text'						=> array (
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'course_name2', 			// Course name (formidable field key) -- MUST match
				'x'		  			=> 550,
				'y'		  			=> 360
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'full_name_course2', 	// Name to appear on certificate (formidable field key)  -- MUST match
				'x'		  			=> 550,
				'y'		  			=> 580,
				'font_size'		=> 36
			),
			array (
				'content' 		=> date("F j, Y"),      // Date, static field
				'x'		  			=> 215,
				'y'		  			=> 670,
				'font_size' 	=> 20
			)
		)
	),
	'get_4all' 	=>  array (   					// Form that is sending certificate -- MUST match form key
		'prefix'					=> 'yali_4all_',
		'src_path'				=> 'images/yali_4all_bkgrd.png',
		'save_path'				=> '../../../uploads/generated-images/',
		'font'	  				=> 'fonts/avenir-light-webfont.ttf',
		'font_size'				=> 50,
		'color'						=> '#ffffff',
		'align'						=> 'center',
		'line_max_chars' 	=> 50,
		'line_height' 		=> 42,
		'text'						=> array (
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'full_name2', 			// Full name (formidable field key) -- MUST match
				'x'		  			=> 600,
				'y'		  			=> 400,
				'font_size'		=> 55
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'challenge2', // Challenge (formidable field key)  -- MUST match
				'x'		  			=> 285,
				'y'		  			=> 650
			),
			array (
				'content' 		=> 'FIELD',
				'field_id'		=> 'country3', 	// Country (formidable field key)  -- MUST match
				'x'		  			=> 925,
				'y'		  			=> 650
			)
		)
	)
);
