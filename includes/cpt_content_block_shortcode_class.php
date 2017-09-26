<?php

namespace Yali;

class Content_Block_Shortcode {

  const WIDGET_ROOT = 'https://s3.amazonaws.com/iip-design-stage-modules/modules/';

  public static function register() {
    new self();
  }

  public function __construct() {
     add_shortcode( 'content_block', array($this, 'render_content_block') );
  }

  /**
   * Takes in attributes from content bloack and calls the applicable content block render method
   * The render method called is generated from appending the content block type to the 'render_' prefix
   * For example, to render the 'cta' or Call to action block, the function appends 'cta to 'render_'
   * and call the render_cta method.  To add a new content type, add it to the options attribute in
   * 'Type of content block' CMB2 field under the General Box in the content_Block class:
   * 
   *  $cb_box->add_field( array(
   *  'name'                => 'Block Type',
	 *  'desc'                => 'Type of content block',
	 * 'id'                  => $prefix . 'cb_type',
	 *  'type'                => 'select',
	 * 'default'             => 'left',
   *  'options'             => array(
   *     'cta'               => __( 'Call To Action', 'yali' ),
   *     'social'            => __( 'Social Icons', 'yali' ),
   *     'post_list'         => __( 'Standard Post List', 'yali' ),
   *     'my_block'            => __( 'My Block', 'yali' )
   *    )
	 * ));
   * 
   *
   * @param [array] $atts Attributes from content block
   * @return void
   */
  public function render_content_block ( $atts ) {
    // check for content block id
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
      "title"           => "Stay connected with us:",
      "facebook"        => "https://www.facebook.com/YALINetwork",
      "twitter"         => "https://twitter.com/YALINetwork",
      "linkedin"        => "https://www.linkedin.com/groups/7425359/profile",
      "block_bg_color"  => get_post_meta( $id, 'yali_cb_bg_color', true ),
    );

    return Twig::render( 'content_blocks/social.twig', $context );
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
    $module = 'article-feed';
      
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

    $path = self::WIDGET_ROOT . "cdp-module-{$module}/cdp-module-";
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