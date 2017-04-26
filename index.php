<?php
	$context = Timber::get_context();
	$context['msg'] = 'Timber Homepage Message.';

	Timber::render('index.twig', $context);