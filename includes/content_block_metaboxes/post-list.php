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
    'recent'         => __( 'Displaying most recent or most recent in a category, series, or tag', 'america' ),
    'custom'         => __( 'Choosing specific posts and adding optional related link', 'america' )
  ),
  'desc'             =>  __( '', 'america' )
));

$cb_box_cdp->add_field(  array(
  'name'             => __( 'Content type(s) to display:', 'america' ),
  'id'               => $prefix . 'cdp_select_content_type',
  'type'             => 'radio_inline',
  'classes'          => 'cdp-select-posts-by-content-type',
  'show_option_none' => false,
  'default'          => 'all',
  'options'          => array(
    'all'            => __( 'All types', 'america' ),
    'article'        => __( 'Article', 'america' ),
    'courses'        => __( 'Course', 'america' ),
    'Podcast'        => __( 'Podcast', 'america' ),
    'Video'          => __( 'Video', 'america' )
  )
));

$cb_box_cdp->add_field( array(
	'name'    => 'Language(s) to display:',
	'desc'    => '',
	'id'      => $prefix . 'cdp_select_language',
  'type'    => 'radio_inline',
  'default' => 'en-us',
	'options' => array(
		'all'     => __( 'All languages', 'america' ),
		'en-us'   => __( 'English', 'america' ),
    'fr-fr'   => __( 'French', 'america' ),
    'pt-br'   => __( 'Portuguese', 'america' )
	),
));

$cb_box_cdp->add_field(  array(
  'name'             => __( 'Select posts by taxonomy:', 'america' ),
  'id'               => $prefix . 'cdp_select_taxonomy',
  'type'             => 'radio_inline',
  'classes'          => 'cdp-select-posts-by-taxonomy',
  'show_option_none' => false,
  'default'          => 'none',
  'options'          => array(
    'none'           => __( 'None', 'america' ),
    'category'       => __( 'Category', 'america' ),
    'series'         => __( 'Series', 'america' ),
    'tag'           => __( 'Tag', 'america' )
  ),
  'desc'             =>  __( 'Most recent post list in selected taxonomy', 'america' )
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

$cb_box_cdp->add_field( array(
  'name'                      => __( 'Post Series', 'america' ),
  'desc'                      => __( 'Series from which posts will be pulled', 'america' ),
  'id'                        => $prefix . 'cdp_series',
  'type'                      => 'select',
  'default'                   => 'select',
  'options'                   => $this->fetch_series()
));

$cb_box_cdp->add_field( array(
  'name'                      => __( 'Post Tags', 'america' ),
  'desc'                      => __( 'Tags from which posts will be pulled', 'america' ),
  'id'                        => $prefix . 'cdp_tag',
  'type'                      => 'select',
  'default'                   => 'select',
  'options'                   => $this->fetch_tags()
));

// Number of posts
$cb_box_cdp->add_field(  array(
  'name'                      => __( 'Number posts to show', 'america' ),
  'id'                        => $prefix . 'cdp_num_posts',
  'type'                      => 'text_small',
  'default'                   => 3
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

// Post list layout style
$cb_box_cdp->add_field( array(
  'name'    => __( 'Post list layout', 'america' ),
  'desc'    => 'Layout patterns for the list of posts',
  'id'      => $prefix . 'cdp_post_list_layout',
  'type'    => 'radio',
  'default'           => '3_column_grid',
  'options' => array(
    '3_column_grid'     => __( 'Three column grid of posts', 'america' ),
    'featured_vertical' => __( 'Featured post with a vertical list of additional post titles', 'america' ),
    'featured_sidebar'  => __( 'Featured post with a right sidebar of additional post titles (best with 6 to 8 posts)', 'america' ),
    'featured_block'    => __( 'Featured post with a right sidebar of two smaller featured posts', 'america' )
  ),
));

// Display as link or button
$cb_box_cdp->add_field( array(
  'name'    => __( 'Display related link as', 'america' ),
  'desc'    => '',
  'id'      => $prefix . 'cdp_autocomplete_links_display',
  'type'    => 'radio_inline',
  'select_all_button' => false,
  'default'         => 'display_as_link',
  'options' => array(
    'display_as_link' => 'Link',
    'display_as_button' => 'Button'
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