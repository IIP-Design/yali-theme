<?php

add_action( 'admin_menu', 'yali_theme_submenu' );

//Add YALI Theme Submenu Page 
function yali_theme_submenu() { 
  add_submenu_page(
    'themes.php',
    'YALI Theme',
    'YALI Theme',
    'edit_themes',
    'edit-yali-theme',
    'edit_yali_theme_page'
  );
}

function edit_yali_theme_page() {
  echo "<h1>Edit YALI Theme Settings</h1>";
  do_settings_sections( 'edit-yali-theme' );
}

//Admin Init
add_action( 'admin_init', 'yali_theme_init');

function yali_theme_init(){
  /* Add New Option */
  add_option('formidable_shortcode_setting',1);

  /* Register Settings */
  register_setting(
      'wp_options',             // Options group
      'formidable-shortcode-settings',      // Option name/database
      'my_settings_sanitize' // sanitize callback function
  );

  /* Create settings section */
  add_settings_section(
      'yali-theme-join-form',                               // Section ID
      'Formidable Join Form',                               // Section title
      'add_settings_join_description',                      // Section callback function
      'edit-yali-theme'                                     // Settings page slug
  );

  /* Create settings field */
  add_settings_field(
      'join-form-field-id',                                 // Field ID
      'Join the YALI Network',                             // Field title 
      'formidable_form_id_input',                           // Field callback function
      'edit-yali-theme',                                    // Settings page slug
      'yali-theme-join-form'                                // Section ID
  );
}

/* Description for Settings Section */
function add_settings_join_description() {
    echo wpautop( "Use the field(s) below to enter Formidable shortcodes." );
  }

/* Settings Field Callback */
function formidable_form_id_input() {
  ?>
  <form method="post" action="options.php">
    <label for="formidable-shortcode-text">
        <input id="formidable-shortcode-text" type="text" name="formidable_shortcode_setting" value="<?php echo get_option( 'formidable_shortcode_setting' ); ?>">
    </label>

    <p>
      <input type="submit" name="Submit" class="button-primary" value="Save Changes" />
    </p>
  </form>
    <?php
}


?>