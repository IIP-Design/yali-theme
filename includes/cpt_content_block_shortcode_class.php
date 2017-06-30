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
   
    $context = array(
      "title"             => $post->post_title,
      "title_underline"   => get_post_meta( $id, 'yali_cb_title_underline', true ),
      "title_alignment"   => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "block_bg_color"    => get_post_meta( $id, 'yali_cb_bg_color', true ),
      "excerpt"           => $post->post_excerpt,
      "excerpt_alignment" => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),
      "image"             => get_the_post_thumbnail( $id ),
      "widget"            => get_post_meta( $id, 'yali_cb_widget', true ),
    );
    
    return Twig::render( 'content_blocks/cta.twig', $context );
  }

  // SOCIAL CONTENT BLOCK
  public function render_social( $id ) {
    $context = array(
      "title" => "Stay connected with us:",
      "facebook" => "https://www.facebook.com/YALINetwork",
      "twitter" => "https://twitter.com/YALINetwork",
      "linkedin" => "https://www.linkedin.com/groups/7425359/profile",
      "bg-color" => "#25ACE2"
    );

    return Twig::render( 'content_blocks/social.twig', $context );
  }
 
}

