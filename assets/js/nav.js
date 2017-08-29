// DOM Elems
var burger = document.querySelector('.burger'),
	nav_siteurl = document.querySelectorAll('.nav_siteurl'),		
	nav_text = document.querySelector('.nav_siteurl span'),
	nav_menu = document.querySelectorAll('.nav_menu'),
	nav_item = document.querySelectorAll('.nav_menu_item:not(.nav_menu_item--search):not(.nav_menu_item--social)');

function highlightNavParent() {	
	if( document.querySelector('.current_submenu_page') ){
		let currentSubmenuPage = document.querySelector('.current_submenu_page');				
		let parentNavItem = currentSubmenuPage.parentElement.parentElement;		
		parentNavItem.querySelector('.nav_menu_item_title-wrapper').classList.add('current_page');
	}
}

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
	nav_item.forEach(item => {
		item.addEventListener('mouseover', function() {
			let menuDropdown = this.getElementsByClassName('menuDropdown')[0];
			menuDropdown.classList.remove('downArrow');
			menuDropdown.classList.add('upArrow');

		});

		item.addEventListener('mouseout', function() {
			let menuDropdown = this.getElementsByClassName('menuDropdown')[0];
			menuDropdown.classList.remove('upArrow');
			menuDropdown.classList.add('downArrow');
		});
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

			set_title_text();
		}, 250);		
	});
}

export function init ($) {
	// Init Semantic dropdown menu
	$('.ui.dropdown').dropdown({transition: 'drop'}).dropdown({on: 'hover'});

	highlightNavParent();
	set_title_text();
	mobile_menu();
	display_sub_menu();
	window_resize();	
}