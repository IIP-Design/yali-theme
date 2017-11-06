<?php
if (!defined('WPINC')) {
  die;
}

// include dependencies
include_once (ABSPATH . 'wp-admin/includes/plugin.php');
include_once (WP_PLUGIN_DIR . '/wp-elasticsearch-feeder/wp-es-feeder.php');

// required for this to execute correctly
$required_plugin = 'wp-elasticsearch-feeder/wp-es-feeder.php';

// check if the feeder exists, if it does create the controller route
if ( is_plugin_active($required_plugin) ) {
  class WP_ES_FEEDER_EXT_BIO_Controller extends WP_ES_FEEDER_REST_Controller {

    public function get_item( $request ) {
      $id = (int) $request[ 'id' ];
      $post = get_post( $id );

      if ( empty( $post ) ) {
        return rest_ensure_response( array ());
      }

      $response = $this->prepare_item_for_response( $post, $request );

      return $response;
    }
    
    public function prepare_item_for_response( $post, $request ) { 
     
      $document = array();
   
      $document['id'] = (int)$post->ID;
      $document['site'] = $this->index_name;
      $document['type'] = $this->type;
      $document['title'] = $post->post_title;
      $document['excerpt'] = $post->post_excerpt;
      $document['slug'] = $post->post_name;
      $document['published'] = get_the_date('c', $post->ID);
      $document['modified'] = get_the_modified_date('c', $post->ID);
      $document['language'] = ES_API_HELPER::get_language( $post->ID );

      if ( isset( $post->post_content ) ) {
        $document[ 'content' ] = ES_API_HELPER::render_vs_shortcodes( $post );
      }

      $feature_image_exists = has_post_thumbnail($post->ID);
      if ($feature_image_exists) {
        $document['featured_image'] = ES_API_HELPER::get_featured_image(get_post_thumbnail_id($post->ID));
      }
      else {
        $document['featured_image'] = new stdClass();
      }

      return rest_ensure_response($document);
    }

    function debug( $obj ) {
      echo '<pre>';
      print_r($obj);
      echo '</pre>';
    }
  }


  function register_bio_post_type_rest_routes() { 
    $controller = new WP_ES_FEEDER_EXT_BIO_Controller('bio');
    $controller->register_routes();
  }

  add_action( 'rest_api_init', 'register_bio_post_type_rest_routes', 5 );
}
