<?php

function add_to_context( $data ) {
	$data['header_menu'] = new TimberMenu('Menu 1');
	$data['footer_menu'] = new TimberMenu('Footer Menu');
	$data['header_img'] = new TimberImage('http://yali.rest.dev/wp-content/uploads/sites/4/2014/07/yali_network_banner.png');
	$data['is_home'] = is_front_page();
	$data['is_blog'] = is_page(602);
	return $data;
}
add_filter('timber_context', 'add_to_context');