<?php
	$context = array();
	$context['sidebar'] = dynamic_sidebar('header-right');
	Timber::render('sidebar.twig', $context);