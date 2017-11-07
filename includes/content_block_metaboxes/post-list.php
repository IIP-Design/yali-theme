<?php

/*************************************************************************************************
 *                                        POST LIST                                              *
 *************************************************************************************************/
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
    'custom'         => __( 'Choosing specifc posts and adding optional related link', 'america' )
  ),
  'desc'             =>  __( '', 'america' )
));

// Number of posts
$cb_box_cdp->add_field(  array(
  'name'                      => __( 'Number posts to show', 'america' ),
  'id'                        => $prefix . 'cdp_num_posts',
  'type'                      => 'text_small',
  'default'                   => 3
));

// Category list
$cb_box_cdp->add_field( array(
  'name'                      => __( 'Post Category', 'america' ),
  'desc'                      => __( 'Category from which posts will be pulled', 'america' ),
  'id'                        => $prefix . 'cdp_category',
  'type'                      => 'select',
  'default'                   => 'select',
  'options'                   => $this->fetch_categories()
));

// By selecting posts (CDP autocomplete)
$cb_box_cdp->add_field( array(
  'name'                      => __( 'Posts', 'america' ),
  'id'                        => $prefix . 'cdp_autocomplete',
  'type'                      => 'cdp_autocomplete',
  'desc'                      => __( '(Start typing title))', 'america' ),
  'repeatable'                => true,
  'text'                      => array(
    'add_row_text'            => 'Add Another Post',
  )
));

$cb_box_cdp->add_field( array(
  'name'                      => __( 'Related Links', 'america' ),
  'id'                        => $prefix . 'cdp_autocomplete_related',
  'type'                      => 'related_link',
  'desc'                      => __( 'Each link selected below will appear underneath its associated post above. For example, put the link that you want to appear under the first post (number 1 above) in the number 1 slot.', 'america' ),
  'repeatable'                => true,
  'text'                      => array(
    'add_row_text'            => 'Add Another Related Link',
  )
));

// Display as link or button
$cb_box_cdp->add_field( array(
  'name'    => __( 'Display related link as', 'america' ),
  'desc'    => '',
  'id'      => $prefix . 'cdp_autocomplete_links_display',
  'type'    => 'radio_inline',
  'select_all_button' => false,
  'default'         => 'link',
  'options' => array(
    'link' => 'Link',
    'button' => 'Button'
  ),
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