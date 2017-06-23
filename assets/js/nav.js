// DOM Elems
var burger = document.querySelector('.burger'),
	nav_siteurl = document.querySelectorAll('.nav_siteurl'),		
	nav_text = document.querySelector('.nav_siteurl span'),
	nav_menu = document.querySelectorAll('.nav_menu'),
	nav_item = document.querySelectorAll('.nav_menu_item:not(.nav_menu_item--search):not(.nav_menu_item--social)'),
	nav_search = document.querySelector('.search-icon_wrapper i'),
	search_input = document.querySelector('.search_wrapper input'),
	search_icon_wrapper = document.querySelector('.search-icon_wrapper');

function mobile_menu() {
	burger.addEventListener('click', function() {				
		this.classList.toggle('active');

		[...nav_siteurl, ...nav_menu].forEach(item => {
			item.classList.toggle('mobile');			
		});					
	});	
}

function set_title_text() {
	if( window.innerWidth > 767 ) {
		nav_text.innerHTML = 'Young African Leaders Initiative';
	} else {
		if( localStorage.session !== 'new' || localStorage.scrolled == 'true' ) nav_text.innerHTML = 'YALI';		
	}
}

function display_sub_menu () {
	Array.from(nav_item).forEach(item => {
		item.addEventListener('click', function() {
			// Remove any existing active classes and highlight clicked menu item
			if( document.querySelector('.nav_menu_item .active') !== null ) document.querySelector('.nav_menu_item .active').classList.remove('active');
			this.getElementsByClassName('nav_menu_item_title-wrapper')[0].classList.toggle('active');
			
			// Toggle dropdown arrows
			var current_upArrow = document.querySelector('.nav_menu_item .upArrow');		
			var menuDropdown = this.getElementsByClassName('menuDropdown')[0];
			if(  menuDropdown.classList.contains('downArrow') ) {
				if( current_upArrow !== null ) {
					current_upArrow.classList.remove('upArrow');
					current_upArrow.classList.add('downArrow');
				}
				menuDropdown.classList.remove('downArrow');
				menuDropdown.classList.add('upArrow');
			} else {
				menuDropdown.classList.remove('upArrow');
				menuDropdown.classList.add('downArrow');				
			}
		});
	});

	// Remove Up Arrow on off clicks				
	document.addEventListener('click', function(e) {
		if( !nav_menu[0].contains(e.target) ) {								
			var current_upArrow = document.querySelector('.nav_menu_item .upArrow');				
			if( current_upArrow !== null ) {
				current_upArrow.classList.remove('upArrow');
				current_upArrow.classList.add('downArrow');
			}				
		}
	});		
}

function display_search_input() {
	nav_search.addEventListener('click', function() {
		
		search_input.classList.toggle('hide');
		search_icon_wrapper.classList.toggle('search_displaying');

		if( this.classList.contains('search') ) {			
			this.classList.remove('search');
			this.classList.add('remove');			
		}

		else if( this.classList.contains('remove') ) {			
			this.classList.remove('remove');
			this.classList.add('search');	
		}
		
	});
}

function window_resize() {
	var resized;
	window.addEventListener('resize', () => {
		clearTimeout(resized);
		resized = setTimeout(function() {
			if( window.innerWidth > 933 ) {
				[...nav_siteurl, ...nav_menu].forEach(item => {
					if( item.classList.contains('mobile' ) ) item.classList.remove('mobile');
				});	
				
				if( burger.classList.contains('active') ) burger.classList.remove('active');
			}

			else {
				if( nav_search.classList.contains('remove') ) {
					nav_search.classList.remove('remove');
					nav_search.classList.add('search');
					search_input.classList.add('hide');
					search_icon_wrapper.classList.remove('search_displaying');
				}
			}

			set_title_text();
		}, 250);		
	});
}

export function init ($) {
	// Init Semantic dropdown menu
	$('.ui.dropdown').dropdown();		

	set_title_text();
	mobile_menu();
	display_sub_menu();
	display_search_input();
	window_resize();	
}