<?php

$cb_box_cdp = new_cmb2_box( array(
  'id'           =>  $prefix . 'cb_box_cdp',
  'title'        => __( 'Post List', 'america' ),
  'object_types' => array( 'content_block' ),
  'priority'     => 'low'
));

// Select posts by
$cb_box_cdp->add_field(  array(
  'name'             => __( 'Select posts by:', 'america' ),
  'id'               => $prefix . 'cdp_select_type_posts',
  'type'             => 'radio',
  'default'          => 'recent',
  'classes'          => 'cdp-select-posts-by',
  'show_option_none' => false,
  'options'          => array(
    'recent'         => __( 'Displaying most recent or most recent in a category', 'america' ),
    'custom'         => __( 'Choosing specifc posts', 'america' ),
    'custom_link'    => __( 'Choosing specifc posts and adding a supplementary link', 'america' ),
  ),
  'desc'             =>  __( '', 'america' )
));

// Number of posts
$cb_box_cdp->add_field(  array(
  'name'                      => 'Number posts to show',
  'id'                        => $prefix . 'cdp_num_posts',
  'type'                      => 'text_small',
  'default'                   => 3,
  'attributes'                => array(
    'data-conditional-id'     => $prefix . 'cdp_select_type_posts',
    'data-conditional-value'  => 'recent'
  )
));

// Category list
$cb_box_cdp->add_field( array(
  'name'                      => 'Post Category',
  'desc'                      => 'Category from which posts will be pulled',
  'id'                        => $prefix . 'cdp_category',
  'type'                      => 'select',
  'default'                   => 'select',
  'options'                   => $this->fetch_categories(),
  'attributes'                => array(
    'data-conditional-id'     => $prefix . 'cdp_select_type_posts',
    'data-conditional-value'  => 'recent'
  )
));

// By selecting posts (CDP autocomplete)
$cb_box_cdp->add_field( array(
  'name'                      => __( 'Posts', 'america' ),
  'id'                        => $prefix . 'cdp_autocomplete',
  'type'                      => 'cdp_autocomplete',
  'repeatable'                => true,
  'text'                      => array(
    'add_row_text'            => 'Add Another Post',
  )
));

// By selecting individual posts with external link (group)
$cb_box_post_group = $cb_box_cdp->add_field( array(
  'id'          => 'cdp_autocomplete_post_link_group',
  'type'        => 'group',
  'description' => __( '', 'america' ),
  'options'     => array(
    'group_title'   => __( 'Post {#}', 'america' ), // since version 1.1.4, {#} gets replaced by row number
    'add_button'    => __( 'Add Another Post', 'america' ),
    'remove_button' => __( 'Remove Post', 'america' )
  )
));

// Group : autocomplete 
$cb_box_cdp->add_group_field( $cb_box_post_group, array(
  'name'  => __( 'Post', 'america' ),
  'id'    => $prefix . 'cdp_autocomplete_post_link',
  'type'  => 'cdp_autocomplete'
)); 

// Group : external link
$cb_box_cdp->add_group_field( $cb_box_post_group, array(
  'name'  => __( 'Additional Link', 'america' ),
  'id'    => $prefix . 'cdp_post_link',
  'type'  => 'cdp_post_link'
)); 

// Tags, author and publish date
$cb_box_cdp->add_field( array(
  'name'    => 'Post fields to show',
  'desc'    => 'Check fields to include',
  'id'      => $prefix . 'cdp_fields',
  'type'    => 'multicheck_inline',
  'select_all_button' => false,
  'options' => array(
    'tags' => 'Tags',
    'author' => 'Author',
    'date' => 'Publish Date',
  ),
));

// Post layout
$cb_box_cdp->add_field( array(
  'name'            => __( 'Post layout', 'america' ),
  'desc'            => __( 'Default (image above) or blog style (image to the left)', 'america' ),
  'id'              => $prefix . 'cdp_ui_layout',
  'type'            => 'select',
  'default'         => 'default',
  'options'         => array(
    'default'       => __( 'Default', 'america' ),
    'blog'          => __( 'Blog', 'america' )
  )
));

// Post layout direction
$cb_box_cdp->add_field( array(
  'name'            => 'Post layout direction',
  'desc'            => '',
  'id'              => $prefix . 'cdp_ui_direction',
  'type'            => 'select',
  'default'         => 'row',
  'options'         => array(
    'row'           => __( 'Horizontal', 'america' ),
    'column'        => __( 'Vertical', 'america' )
  )
));

// Post image config
$cb_box_cdp->add_field( array(
  'name'  => __( 'Post Image', 'america' ),
  'id'    => $prefix . 'cdp_image',
  'type'  => 'cdp_image'
));