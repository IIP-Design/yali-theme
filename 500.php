<?php

use Yali\Twig as Twig;

$context = array(
	'background_img' => get_stylesheet_directory_uri() . '/assets/img/error/error_bkgnd.png'
);


echo Twig::render( array( "pages/500.twig", "page.twig" ), $context );
