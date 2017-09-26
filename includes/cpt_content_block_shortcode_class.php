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

    $context = $this->fetch_base_config( $id, $post );
    $context = $this->fetch_btn_config( $context, $id, $meta );

    if( $meta["_thumbnail_id"][0] ) {
      $img_id = $meta["_thumbnail_id"][0];
      $context["header_url"] = wp_get_attachment_url( $img_id );
      $context["srcset"] = wp_get_attachment_image_srcset( $img_id, 'full' );
      $context["sizes"] = wp_get_attachment_image_sizes( $img_id, 'full' );
    }

    return Twig::render( 'content_blocks/cta.twig', $context );
  }

  // SOCIAL CONTENT BLOCK
  public function render_social( $id ) {
    $context = array(
      "title"           => get_post_meta( $id, 'yali_cb_social_links_title', true ),
      "facebook"        => get_post_meta( $id, 'yali_cb_social_links_facebook', true ),
      "twitter"         => get_post_meta( $id, 'yali_cb_social_links_twitter', true ),
      "linkedin"        => get_post_meta( $id, 'yali_cb_social_links_linkedin', true ),
      "block_bg_color"  => get_post_meta( $id, 'yali_cb_bg_color', true ),
    );

    return Twig::render( 'content_blocks/social.twig', $context );
  }


  // ACCORDION CONTENT BLOCK
  public function render_accordion( $id ) {
    $items = array();
    $meta_data = get_post_meta($id, 'accordion_repeat_group', true);

    foreach ($meta_data as $item => $item_value) {
      // Add p tags to tinymce content
      $item_value['item_content'] = wpautop($item_value['item_content']);
      array_push($items, $item_value);
    }

    $context = array(
      'headline' => get_post_meta($id, 'yali_cb_accordion_headline', true),
      'items_array' => $items
    );

    return Twig::render( 'content_blocks/accordion.twig', $context );
  }


  // POST LIST CONTENT BLOCK (CDP)
  public function render_post_list( $id ) {
    $meta = get_post_meta( $id );
    $post = get_post( $id );

    $context = $this->fetch_base_config( $id, $post );
    $context["selector"] = 'feed' . $id;
    $context = $this->fetch_module_config( $context, $meta );
    $context = $this->fetch_btn_config( $context, $id, $meta );
  
    return Twig::render( 'content_blocks/post-list.twig', $context );
  }
  
  private function fetch_base_config ( $id, $post ) {
    $context = array(
      "title"               => $post->post_title,
      "title_underline"     => ( get_post_meta($id, 'yali_cb_title_underline', true) == 'on' ) ? 'cb_h2_underline': '',
      "title_color"         => get_post_meta( $id, 'yali_cb_title_color', true ), 
      "title_alignment"     => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "block_bg_color"      => get_post_meta( $id, 'yali_cb_bg_color', true ),
      "excerpt"             => $post->post_excerpt,
      "excerpt_alignment"   => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),  
      "excerpt_color"       => get_post_meta( $id, 'yali_cb_excerpt_color', true ), 
      "excerpt_font_weight" => get_post_meta( $id, 'yali_cb_excerpt_font_weight', true ), 
      "text_alignment"      => get_post_meta( $id, 'yali_cb_text_alignment', true )
    );

    return $context;
  }

  private function fetch_module_config ( &$context, $meta ) {
    /*
    $module = $meta['yali_cdp_module'][0];
    if( !$module ) {
      return $context;
    }
    */

    if( !empty($meta['yali_cdp_module']) ) {
      $module = $meta['yali_cdp_module'][0];
    } else {
      return $context; 
    }

   
    $context['cdp_widget'] = $module;
    $context['cdp_num_posts'] = $meta['yali_cdp_num_posts'][0];
    $context['cdp_category'] = ( empty( $meta['yali_cdp_category'][0]) || $meta['yali_cdp_category'][0] == 'select' ) ?  '' : $meta['yali_cdp_category'][0] ;
    $context['cdp_ui_layout'] = $meta['yali_cdp_ui_layout'][0];
    $context['cdp_ui_direction'] = $meta['yali_cdp_ui_direction'][0];
    $context['cdp_image_height'] = $meta['yali_cdp_image_height'][0] . 'px';
    $context['cdp_image_shape'] = $meta['yali_cdp_image_shape'][0];
    $context['cdp_border_width'] = $meta['yali_cdp_border_width'][0] . 'px';
    $context['cdp_border_color'] = $meta['yali_cdp_border_color'][0];
    $context['cdp_border_style'] = $meta['yali_cdp_border_style'][0];

    $path = "https://s3.amazonaws.com/iip-design-stage-modules/modules/cdp-module-{$module}/cdp-module-";
    $context['widget_css'] = $path . $module . '.min.css';
    $context['widget_js'] = $path . $module . '.min.js';

    return $context;
  }

  private function fetch_btn_config ( &$context, $id, $meta ) {
      $button = get_post_meta( $id, 'yali_cb_box_btn_link', true);
      if( !$button ) {
        return $context;
      } 
      $context['btn_label'] = $button['text'];
      $context['btn_link'] = $button['url'];
      $context['btn_new_win'] = ($button['blank'] == 'true') ? 'target="_blank"' : '';
      $context['btn_bg_color'] = $meta['yali_cb_box_btn_bg_color'][0];
      $context['btn_label_color'] = ($context['btn_bg_color'] == '#f2d400') ? '#192856': '#ffffff';
      $context['btn_text_alignment'] = $meta['yali_cb_box_btn_h_alignment'][0];

      return $context;
  }
  
}