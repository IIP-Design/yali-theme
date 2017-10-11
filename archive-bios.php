<?php

use Yali\Twig as Twig;

global $post;

$context = array(	
	'bios'       => Yali\API::get_all_bios()	
);

echo Twig::render('archive-bios.twig', $context);