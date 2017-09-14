<?php

namespace Yali;

class Custom_Button_Shortcode {

  public static function register() {
    new self();
  }

  public function __construct() {
     add_shortcode( 'custom_button', array($this, 'render_custom_button') );
  }

  // Custom Button
  public function render_custom_button( $atts ) {
    $id = $atts['id'];
    $meta = get_post_meta( $id );
    $post = get_post( $id );
    $context = $this->fetch_btn_config( $context, $id, $meta );

    return Twig::render( 'partials/button.twig', $context );
  }

  private function fetch_btn_config ( &$context, $id, $meta ) {
    $button = get_post_meta( $id, 'yali_cust_btn_link', true);


    $context['btn_label'] = $button['text'];
    $context['btn_link'] = $button['url'];
    $context['btn_new_win'] = ($button['blank'] == 'true') ? 'target="_blank"' : '';
    $context['btn_bg_color'] = $meta['yali_cust_btn_bg_color'][0];
    $context['btn_label_color'] = ($context['btn_bg_color'] == '#f2d400') ? '#192856': '#ffffff';
    $context['btn_text_alignment'] = $meta['yali_cust_btn_h_alignment'][0];

    return $context;
  }

}
