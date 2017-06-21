// DOM Elems
var burger = document.querySelector('.burger'),
	nav_siteurl = document.querySelectorAll('.nav_siteurl'),		
	nav_text = document.querySelector('.nav_siteurl span'),
	nav_menu = document.querySelectorAll('.nav_menu'),
	nav_item = document.querySelectorAll('.nav_menu_item');	

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

function window_resize() {
	var resized;
	window.addEventListener('resize', () => {
		clearTimeout(resized);
		resized = setTimeout(function() {
			if( window.innerWidth > 932 ) {
				[...nav_siteurl, ...nav_menu].forEach(item => {
					if( item.classList.contains('mobile' ) ) item.classList.remove('mobile');
				});	
				
				if( burger.classList.contains('active') ) burger.classList.remove('active');
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
	window_resize();
}