<?php

namespace Yali;

class Customize_Theme {

  // Initialize customize theme class
  public static function init() {
    new self();
  }
  
  // Initalize admin page that customizes YALI theme
  public function __construct() {
    add_action( 'admin_menu', array( $this, 'add_customize_theme_submenu' ) );
    add_action( 'admin_init', array( $this, 'add_submenu_sections') );
    add_action( 'admin_init', array( $this, 'formidable_settings' ) );
  }

  // Add YALI theme submenu page 
  function add_customize_theme_submenu() { 
    add_submenu_page(
      'themes.php',
      __( 'YALI Theme', 'yali' ),
      __( 'YALI Theme', 'yali' ),
      'edit_themes',
      'edit-yali-theme',
      array( $this, 'populate_submenu_form' )
    );
  }

  // Create form for customization input values
  function populate_submenu_form() {
    ?>
    <div class="wrap">
      <h1 class='wp-heading-inline'><?php _e( 'Edit YALI Theme Settings', 'yali' ) ?></h1>
      <hr class='wp-header-end'>
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
  function add_submenu_sections(){
    add_settings_section(
        'formidable-forms',                                // Section ID
        __( 'Formidable Forms', 'yali' ),                  // Section title
        array( $this, 'formidable_section_description' ),  // Section callback function
        'edit-yali-theme'                                  // Settings page slug
    );
  }

  // Set description for the formidable form settings section
  function formidable_section_description() {
    _e( 'Use the field(s) below to enter Formidable shortcodes.', 'yali' );
  }

  function formidable_settings(){
    // Create join us form settings field
    add_settings_field(
      'yali-joinus-form-id',                         // Field ID
      __( 'Join the YALI Network:', 'yali' ),        // Field title 
      array( $this, 'joinus_input_markup' ),         // Field callback function
      'edit-yali-theme',                             // Settings page slug
      'formidable-forms',                            // Section ID
      array( 'label_for' => 'yali-joinus-form-id' )  // Display field title as label
    );

    // Register join us form settings
    register_setting(
      'edit-yali-theme',         // Options group
      'yali-joinus-form-id',     // Option name/database
      'sanitize_text_field'      // Sanitize input value
    );
  }

  // HTML markup for the formidable join us form id
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

}