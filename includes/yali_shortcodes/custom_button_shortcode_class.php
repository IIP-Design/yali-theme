<?php

namespace Yali;

class Custom_Button_Shortcode {

  public static function register() {
    new self();
  }

  public function __construct() {
     add_shortcode( 'custom_button', array($this, 'render_custom_button') );
  }

  // Renders custom button
  public function render_custom_button( $atts ) {
    $atts = shortcode_atts( array(
      'btn_label'           => '',
      'btn_link'            => '',
      'btn_tab'             => '',
      'btn_color'           => '',
      'btn_align'           => '',
      'btn_size'            => ''
    ), $atts, 'render_custom_button' );

    if ( $atts['btn_color'] == '#f2d400' ) {
      $atts['btn_label_color'] = '#192856';
    } elseif ( $atts['btn_color'] == '#eeeeee') {
      $atts['btn_label_color'] = '#192856';
    } else {
      $atts['btn_label_color'] = '#ffffff';
    }

    if ( $atts['btn_tab'] == 'true') $atts['btn_target'] = 'target="_blank"';

    if ( $atts['btn_size'] == 'small') $atts['btn_width'] = '; min-width: 10em';

    return Twig::render( 'partials/button.twig', $atts );
  }

}
