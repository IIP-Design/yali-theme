<?php
	$context = Timber::get_context();

	$context['sidebar'] = Timber::get_sidebar('sidebar.php');
	$context['post'] = new TimberPost();
	$context['posts'] = Timber::get_posts([
		'post_type' => 'post',
		'posts_per_page' => 2
	]);
	$context['blog_list'] = Timber::get_posts([
		'post_type' => 'post',
		'posts_per_page' => 10		
	]);
	$context['pagination'] = Timber::get_pagination();
	
	$renderPage = is_page(602) ? 'blog.twig' : 'page.twig';
	
	Timber::render($renderPage, $context);
