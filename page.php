<?php
use Yali\Twig as Twig;

// Post Object
global $post;

$context = array();
Twig::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
