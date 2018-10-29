<?php

namespace Yali;

class Content_Block_Shortcode {

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
   *  'name'                 => 'Block Type',
	 *  'desc'                 => 'Type of content block',
	 * 'id'                    => $prefix . 'cb_type',
	 *  'type'                 => 'select',
	 * 'default'               => 'left',
   *  'options'              => array(
   *     'cta'               => __( 'Call To Action', 'yali' ),
   *     'social'            => __( 'Social Icons', 'yali' ),
   *     'post_list'         => __( 'Standard Post List', 'yali' ),
   *     'my_block'          => __( 'My Block', 'yali' )
   *    )
	 * ));
   *
   *
   * @param [array] $atts Attributes from content block
   * @return void
   */
  public function render_content_block ( $atts ) {
    // check for content block id
    $type = get_post_meta( $atts['id'], 'yali_cb_type', true );
    if( empty($type) ) {
      return;
    }

    return call_user_func( array($this, 'render_' . $type ), $atts );
  }

  // CTA CONTENT BLOCK
  public function render_cta( $atts ) {
    $id = $atts['id'];
    $meta = get_post_meta(  $id );
    $post = get_post( $id );

    $context = $this->fetch_base_config( $id, $post );

    if( !empty($meta["_thumbnail_id"]) ) {
      $img_id = $meta["_thumbnail_id"][0];
      $context["header_url"] = wp_get_attachment_url( $img_id );
      $context["srcset"] = wp_get_attachment_image_srcset( $img_id, 'full' );
      $context["sizes"] = wp_get_attachment_image_sizes( $img_id, 'full' );
    }

    $context["cb_layout_width"] = get_post_meta( $id, 'yali_cb_layout_width' );
    $context["cta_buttons"] = get_post_meta( $id, 'yali_cta_button_repeat_group', true );

    foreach ($context["cta_buttons"] as &$button) {
      $button["yali_cta_button_link"]["url"] = $this->filter_link($button["yali_cta_button_link"]["url"]);
    }
    unset($button);

    return Twig::render( 'content_blocks/cta.twig', $context );
  }

  // SOCIAL CONTENT BLOCK
  public function render_social( $atts ) {
    $id = $atts['id'];
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
  public function render_accordion( $atts ) {
    global $wp_embed;

    $id = $atts['id'];
    $items = array();
    $meta_data = get_post_meta($id, 'accordion_repeat_group', true);

    foreach ($meta_data as $item => $item_value) {
      // Add p tags to tinymce content
      $item_value['item_content'] = $this->filter_link( $item_value['item_content'] );
      $item_value['item_content'] = wpautop($item_value['item_content']);
      $item_value['item_content'] = do_shortcode($item_value['item_content']);
      $item_value['item_content'] = $wp_embed->autoembed( $item_value['item_content'] );
      $item_value['item_content'] = $wp_embed->run_shortcode( $item_value['item_content'] );
      array_push($items, $item_value);
    }

    $post = get_post($id);
    $slug = $post->post_name;

    $context = array(
      'id'  => $slug,
      'headline' => get_post_meta($id, 'yali_cb_accordion_headline', true),
      'headline_alignment' => get_post_meta($id, 'yali_cb_accordion_headline_alignment', true),
      'font_color' => get_post_meta($id, 'yali_cb_accordion_font_color', true),
      'items_array' => $items
    );

    return Twig::render( 'content_blocks/accordion.twig', $context );
  }


  // PAGE LIST CONTENT BLOCK
  public function render_page_list( $atts ) {
    $id = $atts['id'];
    $meta = get_post_meta( $id );
    $context = $this->fetch_base_config( $id, get_post($id) );
    $context = $this->fetch_btn_config( $context, $id, $meta );

    // Pages to be included
    $page_list = array();
    $all_pages = get_post_meta($id, 'cb_pages_list_repeat_group', true);

    foreach ($all_pages as $page) {
      // Get page ID from meta select dropdown
      $page_id = $page['yali_select_page'];

      // Get page data
      $listed_page = get_page($page_id);

      // Get page imgage and add as prop to page object
      $page_img = get_the_post_thumbnail_url($page_id, 'full');
      if( !empty($page_img) ) {
        $listed_page->page_img = $page_img;
      }

      // Get page link and add as prop to page object
      $page_link = get_permalink($page_id);
      $listed_page->page_link = $this->filter_link($page_link);

      // Get related link and text add as prop to page object
      $related_link = $page['yali_related_link']['link'];
      $listed_page->related_link = $this->filter_link($related_link);

      $related_link_text = $page['yali_related_link']['label'];
      $listed_page->related_link_text = $related_link_text;

      $context['links'] = get_post_meta( $id, 'yali_button_links_repeat_group', true );

      array_push($page_list, $listed_page);
    }

    $context['page_list'] = $page_list;
    $context['page_list_layout'] = get_post_meta( $id, 'yali_cdp_page_list_layout', true);
    $context['selector'] = 'cb-' . get_the_ID();
    $context['num_pages'] = count($page_list);

    return Twig::render( 'content_blocks/page-list.twig', $context );
  }


  // POST LIST CONTENT BLOCK (CDP)
  public function render_post_list( $atts ) {
    $id = $atts['id'];
    $meta = get_post_meta( $id );
    $post = get_post( $id );

    $context              = $this->fetch_base_config( $id, $post );
    $context['selector']  = 'feed' . $id;
    $context              = $this->fetch_module_config( $context, $id );
    $context              = $this->fetch_btn_config( $context, $id, $meta );
    $context['post_list_layout'] = get_post_meta( $id, 'yali_cdp_post_list_layout', true);

    //$this->debug($context );
    return Twig::render( 'content_blocks/post-list.twig', $context );
  }


  // FILTERED POST LIST CONTENT BLOCK (CDP)
  public function render_filtered_list( $atts ) {
    $id                     = $atts['id'];
    $context                = $this->fetch_base_config( $id, get_post( $id ) );
    $context['selector']    = 'feed' . $id;
    $context['cdp_indexes'] = cdp_get_option('cdp_indexes');
    $context['filters']     = $this->fetch_filters( $atts );  // get_post_meta( $id, 'yali_list_filters', true);
    $context['lang_key'] = get_post_meta( $id, 'yali_cb_lang_selection', true);
    $context['types']       = $this->convert_to_str( get_post_meta( $id, 'yali_list_filters_types', true) );
    $context['date_display'] = get_post_meta( $id, 'yali_filtered_list_date_display', true);
    $context                = $this->fetch_btn_config( $context, $id, get_post_meta( $id ) );

    switch ( $context['lang_key'] ) {
      case 'en-us' :
        $context['lang_value'] = 'English';
        break;
      case 'fr-fr' :
        $context['lang_value'] = 'French';
        break;
      case 'pt-br' :
        $context['lang_value'] = 'Portuguese';
        break;
    }

    return Twig::render( 'content_blocks/post-filtered-list.twig', $context );
  }


  // MEDIA CONTENT BLOCK
  public function render_media_block( $atts ) {
    global $wp_embed;

    $id = $atts['id'];
    $context = $this->fetch_base_config( $id, $post );
    $context['media_items'] = get_post_meta( $id, 'media_block_repeat_group', true );
    $context['text_color'] = get_post_meta( $id, 'block_text_color', true );
    $context['intro'] = wpautop(get_post_meta( $id, 'intro_content', true ));
    $context['intro'] = $wp_embed->autoembed( $context['intro'] );
    $context['intro'] = $wp_embed->run_shortcode( $context['intro'] );
    $context['outro'] = wpautop(get_post_meta( $id, 'outro_content', true ));
    $context['outro'] = $wp_embed->autoembed( $context['outro'] );
    $context['outro'] = $wp_embed->run_shortcode( $context['outro'] );

    return Twig::render( 'content_blocks/media-block.twig', $context );
  }


  // BUTTON LINKS CONTENT BLOCK
  public function render_button_links( $atts ) {
    $id = $atts['id'];
    $context['headline'] = get_post_meta( $id, 'yali_button_links_headline', true );
    $context['links'] = get_post_meta( $id, 'yali_button_links_repeat_group', true );

    foreach ($context['links'] as &$button) {
      $button['yali_button_link']['url'] = $this->filter_link($button['yali_button_link']['url']);
    }
    unset($button);

    return Twig::render( 'content_blocks/button-links.twig', $context );
  }


  // TEXT CONTENT BLOCK
  public function render_text_block( $atts ) {
    global $wp_embed;

    $id = $atts['id'];
    $context = $this->fetch_base_config( $id, get_post($id) );

    $text_content = get_post_meta( $id, 'yali_text_block_content', true );
    $text_content = $this->filter_link( $text_content );
    $text_content = wpautop($text_content);
    $text_content = $wp_embed->autoembed( $text_content );
    $text_content = $wp_embed->run_shortcode( $text_content );
    $context['text_content'] = do_shortcode($text_content);
    $context['font_color'] = get_post_meta( $id, 'yali_text_block_font_color', true );

    return Twig::render( 'content_blocks/text_block.twig', $context );
  }


  // CAMPAIGNS LIST CONTENT BLOCK
  public function render_campaigns_list( $atts ) {
    $id = $atts['id'];
    $context = $this->fetch_base_config( $id, get_post($id) );

    // Campaigns to be included
    $campaign_pages = array();
    $campaigns_list = get_post_meta($id, 'campaigns_list_repeat_group', true);

    foreach ($campaigns_list as $campaign) {
      // Get Campaign ID from meta select dropdown
      $campaign_id = $campaign['yali_select_campaign'];
      // Get campaign page data
      $campaign_page = get_page($campaign_id);

      // Add campaign page img from page custom field
      // add prop to campaign page obj
      $campaign_img = get_post_meta($campaign_id, 'campaigns_list_img', true);
      if( !empty($campaign_img) ) {
        $campaign_page->campaign_img = $campaign_img;
      }

      // Get campaign page link and add to page obj as prop
      $campaign_page_link = get_permalink($campaign_id);
      $campaign_page->campaign_page_link = $this->filter_link($campaign_page_link);

      array_push($campaign_pages, $campaign_page);
    }

    $context['campaign_pages'] = $campaign_pages;

    return Twig::render( 'content_blocks/campaigns-list.twig', $context );
  }


  // Helpers
   /**
   * Wrapper function around cmb2_get_option
   * @since  0.1.0
   * @param  string $key     Options array key
   * @param  mixed  $default Optional default value
   * @return mixed           Option value
   */


  private function fetch_base_config ( $id, $post ) {
    //$this->debug( get_post_meta( $id));

    $block_title = get_post_meta( $id, 'yali_block_title', true);

    $context = array(
      "title"               => empty( $block_title ) ? $post->post_title : $block_title,
      "title_size"          => get_post_meta($id, 'yali_cb_block_title_size', true),
      "show_title"          => get_post_meta($id, 'yali_cb_show_title', true),
      "title_underline"     => ( get_post_meta($id, 'yali_cb_title_underline', true) == 'yes' ) ? 'cb_h2_underline': '',
      "title_color"         => get_post_meta( $id, 'yali_cb_title_color', true ),
      "title_alignment"     => get_post_meta( $id, 'yali_cb_title_alignment', true ),
      "full_screen_width"   => get_post_meta( $id, 'yali_cb_layout_width', true ),
      "block_bg_color"      => get_post_meta( $id, 'yali_cb_bg_color', true ),
      "excerpt"             => $post->post_excerpt,
      "excerpt_alignment"   => get_post_meta( $id, 'yali_cb_excerpt_alignment', true ),
      "excerpt_color"       => get_post_meta( $id, 'yali_cb_excerpt_color', true ),
      "excerpt_font_weight" => get_post_meta( $id, 'yali_cb_excerpt_font_weight', true ),
      "text_alignment"      => get_post_meta( $id, 'yali_cb_text_alignment', true )
    );

    return $context;
  }

  private function fetch_module_config ( &$context, $id ) {
    //$this->debug( get_post_meta( $id));exit;

    $module                                     = 'article-feed';
    $category_field                             = get_post_meta( $id, 'yali_cdp_category', true);
    if ($category_field) {
      $cat = get_category_by_slug($category_field);
      if ($cat) $category_field = wp_slash($cat->name);
    }
    $series_field                               = get_post_meta( $id, 'yali_cdp_series', true);
    if ($series_field) {
      $term = get_term_by('slug', $series_field, 'series');
      if ($term) $series_field = wp_slash($term->name);
    }
    $tag_field                                  = get_post_meta( $id, 'yali_cdp_tag', true);
    if ($tag_field) {
      $term = get_term_by('slug', $tag_field, 'post_tag');
      if ($term) $tag_field = wp_slash($term->name);
    }

    $context['cdp_widget']                      = $module;
    $context['cdp_indexes']                     = cdp_get_option('cdp_indexes');
    $context['cdp_post_select_by']              = get_post_meta( $id, 'yali_cdp_select_type_posts', true );
    $context['cdp_content_type']      = get_post_meta( $id, 'yali_cdp_select_content_type', true );
    $context['cdp_language']      = get_post_meta( $id, 'yali_cdp_select_language', true );
    $context['cdp_taxonomy_select_by']          = get_post_meta( $id, 'yali_cdp_select_taxonomy', true );

    $context['cdp_post_ids']                    = get_post_meta( $id, 'yali_cdp_autocomplete', true );
    $context['cdp_posts_related']               = $this->filter_cdp_posts_related( get_post_meta( $id, 'yali_cdp_autocomplete_related', true ) );
    $context['cdp_posts_related_link_display']  = get_post_meta( $id, 'yali_cdp_autocomplete_links_display', true );
    $context['cdp_post_meta_fields_to_show']    = get_post_meta( $id, 'yali_cdp_fields', true );
    $context['cdp_num_posts']                   = get_post_meta( $id, 'yali_cdp_num_posts', true );

    $context['cdp_category']                    = ( empty($category_field) || $category_field == 'select' ) ?  '' : $category_field;
    $context['cdp_series']                      = ( empty($series_field) || $series_field == 'select' ) ?  '' : $series_field;
    $context['cdp_tag']                         = ( empty($tag_field) || $tag_field == 'select' ) ?  '' : $tag_field;

    $context['cdp_ui_layout']                   = get_post_meta( $id, 'yali_cdp_ui_layout', true);
    $context['cdp_ui_direction']                = get_post_meta( $id, 'yali_cdp_ui_direction', true);
    $context['cdp_image']                       = get_post_meta( $id, 'yali_cdp_image', true);

    //$this->debug($context);exit;

    return $context;
  }

  private function filter_link( $link ) {
    return apply_filters( 'btn_link_domain_mapping', $link );
  }

  private function filter_cdp_posts_related( $cdp_posts_related ) {
    $cpr = array();
    if( is_array( $cdp_posts_related ) ) {
      foreach( $cdp_posts_related as $cdp_post ) {
        $cdp_post['link'] = $this->filter_link( $cdp_post['link'] );
        $cpr[] = $cdp_post;
      }
      $cdp_posts_related = $cpr;
    }
    return $cdp_posts_related;
  }

  private function fetch_btn_config ( &$context, $id, $meta ) {
    $button = get_post_meta( $id, 'yali_cb_box_btn_link', true );

    if( !$button ) {
      return $context;
    }
    $context['btn_label']           = $button['text'];
    $context['btn_link']            = $this->filter_link( $button['url'] );
    $context['btn_new_win']         = ($button['blank'] == 'true') ? 'target="_blank"' : '';
    $context['btn_bg_color']        = $meta['yali_cb_box_btn_bg_color'][0];
    $context['btn_label_color']     = ($context['btn_bg_color'] == '#f2d400') ? '#192856': '#ffffff';
    $context['btn_text_alignment']  = $meta['yali_cb_box_btn_h_alignment'][0];

    return $context;
  }

  // private function get_relative_link( $url ) {
  //   $current_host = $_SERVER['HTTP_HOST'];
  //   $button_host = parse_url( $url, PHP_URL_HOST );
  //   if( $current_host === $button_host ) {
  //     return parse_url( $url, PHP_URL_PATH );
  //   }
  //   return  $url;
  // }

  private function convert_to_str( $value ) {
    if( gettype($value) === 'array' ) {
      return implode(',', $value);
    }
    return $value;
  }

  /**
   * Removes filter from filter group if on an archive page
   * For example, if on the YALI Voices series page, remove series
   * filter menu and limit search to series: YALI Voices
   *
   * @param [array] $atts Shortcode attributes
   * @return updatedFilters Array with applicable filter removed
   */
  private function fetch_filters( $atts ) {
    $filters = get_post_meta( $atts['id'], 'yali_list_filters', true);
    if( !isset($atts['taxonomy']) ) {
      return $filters;
    }
    $taxonomy = $atts['taxonomy'];
    $updatedFilters = array_filter( $filters, function($filter) use ($taxonomy) {
      return $filter !== $taxonomy;
    });

    return $updatedFilters;
  }

  private function debug( $obj ) {
    echo '<pre>';
    print_r( $obj );
    echo '</pre>';
  }

}
