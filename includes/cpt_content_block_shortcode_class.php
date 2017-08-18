<?php

namespace Yali;

class Content_Block_Shortcode {

  public static function register() {
    new self();
  }

  public function __construct() {
     add_shortcode( 'content_block', array($this, 'render_content_block') );
  }

  public function render_content_block ( $atts ) {
    // check for id
    $id = $atts['id'];
    $type = get_post_meta( $atts['id'], 'yali_cb_type', true );  
    return call_user_func( array($this, 'render_' . $type ), $id );
  }

  // CTA CONTENT BLOCK
  public function render_cta( $id ) {
    $meta = get_post_meta(  $id );
    $post = get_post( $id );

    // $header_url = $feat_img_obj['source_url'];
    // $img_id = get_post_thumbnail_id( $post->ID );
    // $srcset = wp_get_attachment_image_srcset( $img_id, 'full' );
    // $sizes = wp_get_attachment_image_sizes( $img_id, 'full' );
   
    $context = array(
      "title"             => $post->post_title,
      "title_underline"   => get_post_meta( $id, 'yali_cb_title_underline', true ),
      "title_alignment"   => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "block_bg_color"    => get_post_meta( $id, 'yali_cb_bg_color', true ),
      "excerpt"           => $post->post_excerpt,
      "excerpt_alignment" => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),
      "image"             => get_the_post_thumbnail( $id )
    );
    
    return Twig::render( 'content_blocks/cta-static.twig', $context );
  }

  // SOCIAL CONTENT BLOCK
  public function render_social( $id ) {
    $context = array(
      "title"           => "Stay connected with us:",
      "facebook"        => "https://www.facebook.com/YALINetwork",
      "twitter"         => "https://twitter.com/YALINetwork",
      "linkedin"        => "https://www.linkedin.com/groups/7425359/profile",
      "block_bg_color"  => get_post_meta( $id, 'yali_cb_bg_color', true ),
    );

    return Twig::render( 'content_blocks/social.twig', $context );
  }

  // WIDGET CONTENT BLOCK
  public function render_post_list( $id ) {
    
    $meta = get_post_meta(  $id );
    $post = get_post( $id );
    $widget = get_post_meta( $id, 'yali_cb_widget', true );
    $button = get_post_meta( $id, 'yali_cb_button', true );

    $context = array(
      "selector"          => 'feed' . $id,
      "title"             => $post->post_title,
      "title_underline"   => ( get_post_meta($id, 'yali_cb_title_underline', true) == 'on' ) ? 'cb_h2_underline': '',
      "title_alignment"   => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "block_bg_color"    => get_post_meta( $id, 'yali_cb_bg_color', true ),
      "excerpt"           => $post->post_excerpt,
      "excerpt_alignment" => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),
      "text_alignment"    => get_post_meta( $id, 'yali_cb_text_alignment', true )
    );

    if( $button && $button[0]['link'] ) {
      $link = $button[0]['link'];
      $context['btn_label'] = $link['text'];
      $context['btn_link'] = $link['url'];
      $context['btn_new_win'] = ($link['blank'] == 'true') ? 'target="_blank"' : '';
      $context['btn_bg_color'] = $button[0]['bg_color'];
      $context['btn_text_alignment'] = $button[0]['h_alignment'];
    }

    if( $widget && $widget[0]['cdp_module'] ) {
      $w = $widget[0];
 
      $cdp_widget = $widget[0]['cdp_module'];
      $context['cdp_widget'] = $w['cdp_module'];
      $context['cdp_num_posts'] = $w['cdp_num_posts'];
      $context['cdp_category'] = ( empty( $w['cdp_category']) || $w['cdp_category'] == 'select' ) ?  '' : $w['cdp_category'] ;
      $context['cdp_ui_layout'] = $w['cdp_ui_layout'];
      $context['cdp_ui_direction'] = $w['cdp_ui_direction'];
      $context['cdp_image_height'] = $w['cdp_image_height'] . 'px';
      $context['cdp_image_shape'] = $w['cdp_image_shape'];
      $context['cdp_border_width'] = $w['cdp_border_width'] . 'px';
      $context['cdp_border_color'] = $w['cdp_border_color'];
      $context['cdp_border_style'] = $w['cdp_border_style'];

      $path = "https://s3.amazonaws.com/iip-design-stage-modules/modules/cdp-module-{$cdp_widget}/cdp-module-";
      $context['widget_css'] = $path . $cdp_widget . '.min.css';
      $context['widget_js'] = $path . $cdp_widget . '.min.js';
    }
    // var_dump($$meta); die();
    return Twig::render( 'content_blocks/post-list.twig', $context );
  }
 
}