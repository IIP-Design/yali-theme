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

  public function render_cta( $id ) {
    $meta = get_post_meta(  $id );
    $post = get_post( $id );
   
    $context = array(
      "title"             => $post->post_title,
      "title_alignment"   => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "excerpt"           => $post->post_excerpt,
      "excerpt_alignment" => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),
      "image"             => get_the_post_thumbnail( $id )
    );
    
    return Twig::render( 'content_blocks/cta.twig', $context );
  }

  public function render_social( $id ) {
    return Twig::render( 'content_blocks/social.twig', array() );
  }
 
}

  // $post = get_post( $id );
  //   $excerpt = $post->post_excerpt;
  //   $result = '<h1>Life is good!</h1>'; 
