<?php

add_action('wp_enqueue_scripts', function(){ wp_enqueue_script('iip_interactive_script'); });

add_action('admin_enqueue_scripts', function() {
  wp_dequeue_script('iip_interactive_script_admin');
  wp_enqueue_script('edit-iip-interactive-admin', get_stylesheet_directory_uri() . '/includes/edit-iip-interactive-plugin/edit-iip-interactive-admin.js', array('jquery', 'jquery-ui-datepicker') );
});

add_action('init', function() { 
  remove_shortcode('iip_countdown');
    
  add_shortcode('iip_countdown', 'iip_countdown_shortcode_edit');
  function iip_countdown_shortcode_edit($atts, $content=null) {
      
      extract(shortcode_atts(
              array(
                    'date' => '',
                    'time' => '',
                    'text' => 'true',
                    'width' => '500',
                    'zone' => ''
                    ), $atts
              ));

      wp_enqueue_script('iip_interactive_script');
      
      $datetime = $date . ' ' . $time;
      $timestring = __('l, F jS, Y', 'iip-interactive') . ' ' . __('\a\t', 'iip-interactive') . ' ' . __('g:i A T', 'iip-interactive');

      date_default_timezone_set('America/New_York');  //Edit - Shawn 4/9/17
      $display = date_i18n( $timestring, strtotime($datetime) );
      
      $shortcode = '<div class="iip_countdown"><input type="hidden" id="countdatetime" value="'.$date.' '.$time.' ' . $zone . '" /><div id="clockwrap"><div id="clockdiv" style="width:'.$width.'px">';
      if ( $text === 'true' ) $shortcode .= '<h1>'.$display.'</h1>';
      $shortcode .= '<div><span class="days"></span><div class="smalltext">'. __('Days', 'iip-interactive') . '</div></div> ';
      $shortcode .= '<div><span class="hours"></span><div class="smalltext">'. __('Hours', 'iip-interactive') . '</div></div> ';
      $shortcode .= '<div><span class="minutes"></span><div class="smalltext">'. __('Minutes', 'iip-interactive') . '</div></div> ';
      $shortcode .= '<div><span class="seconds"></span><div class="smalltext">'. __('Seconds', 'iip-interactive') . '</div></div>';
      $shortcode .= '</div></div></div>';

      return $shortcode;
  }

});