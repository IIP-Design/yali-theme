<?php

$cb_social_links = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_social_links',
  'title'        => __( 'Social Media Links', 'yali' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));  

$cb_social_links->add_field( array(
  'name'    => 'Title',
  'id'      => $prefix . 'cb_social_links_title',
  'type'    => 'text',
  'default' => 'Stay connected with us:'
));

$cb_social_links->add_field( array(
  'name'    => 'Facebook',
  'id'      => $prefix . 'cb_social_links_facebook',
  'type'    => 'text',
  'default' => 'https://www.facebook.com/YALINetwork'
));

$cb_social_links->add_field( array(
  'name'    => 'Twitter',
  'id'      => $prefix . 'cb_social_links_twitter',
  'type'    => 'text',
  'default' => 'https://twitter.com/YALINetwork'
));

$cb_social_links->add_field( array(
  'name'    => 'LinkedIn',
  'id'      => $prefix . 'cb_social_links_linkedin',
  'type'    => 'text',
  'default' => 'https://www.linkedin.com/groups/7425359/profile'
));