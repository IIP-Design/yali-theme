<?php

add_action( 'admin_menu', 'yali_customize_theme_submenu' );

// Add YALI theme submenu page 
function yali_customize_theme_submenu() { 
  add_submenu_page(
    'themes.php',
    __( 'YALI Theme', 'yali' ),
    __( 'YALI Theme', 'yali' ),
    'edit_themes',
    'edit-yali-theme',
    'yali_customize_theme_page'
  );
}

// Add submenu page title and initialize formidable section
function yali_customize_theme_page() {
  $title = __( 'Edit YALI Theme Settings', 'yali' );
  $html = "<h1 class='wp-heading-inline'>" . $title . "</h1><hr class='wp-header-end'>";

  echo $html;
  yali_customize_theme_form();
}

// Initalize admin page that customizes YALI theme
add_action( 'admin_init', 'yali_customize_theme_sections');


// Create form for customization input values
function yali_customize_theme_form() {
  ?>
  <div class="wrap">
    <form action="options.php" method="post">
      <?php
        do_settings_sections( 'edit-yali-theme' );
        settings_fields( 'edit-yali-theme' );
        submit_button();
      ?>
    </form>
  </div>
  <?php
}

// Create settings sections
function yali_customize_theme_sections(){
  add_settings_section(
      'yali-theme-join-form',                // Section ID
      __( 'Formidable Forms', 'yali' ),      // Section title
      'formidable_section_description',      // Section callback function
      'edit-yali-theme'                      // Settings page slug
  );
}

// Set description for the formidable form settings section
function formidable_section_description() {
  echo wpautop( _e( 'Use the field(s) below to enter Formidable shortcodes.', 'yali' ) );
}

function formidable_settings(){
  // Create join us form settings field
  add_settings_field(
    'yali-joinus-form-id',                         // Field ID
    __( 'Join the YALI Network:', 'yali' ),        // Field title 
    'joinus_input_markup',                         // Field callback function
    'edit-yali-theme',                             // Settings page slug
    'yali-theme-join-form',                        // Section ID
    array( 'label_for' => 'yali-joinus-form-id' )  // Display field title as label
  );

  // Register join us form settings
  register_setting(
    'edit-yali-theme',         // Options group
    'yali-joinus-form-id',     // Option name/database
    'sanitize_text_field'      // Sanitize input value
  );
}

// Init Register Settings
add_action( 'admin_init', 'formidable_settings' );

// HTML markup for the API key fields
function joinus_input_markup() {
  $formidable_id = get_option( 'yali-joinus-form-id' );

  $html = '<fieldset>';
    $html .= '<input ';
      $html .= 'id="yali-joinus-form-id" ';
      $html .= 'name="yali-joinus-form-id" ';
      $html .= 'placeholder="[formidable id=1]" ';
      $html .= 'type="text" ';
      $html .= 'value="' . $formidable_id;
    $html .= '">';
  $html .= '</fieldset>';

  echo $html;
}

?>