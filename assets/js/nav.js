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

function burger_mobile_menu() {
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

function up_arrow_display(item) {
	let menuDropdown = item.getElementsByClassName('menuDropdown')[0];
		menuDropdown.classList.remove('downArrow');
		menuDropdown.classList.add('upArrow');
}

function down_arrow_display(item) {
	let menuDropdown = item.getElementsByClassName('menuDropdown')[0];
		menuDropdown.classList.remove('upArrow');
		menuDropdown.classList.add('downArrow');
}

function submenu_display() {
	[...nav_item].forEach(item => {
		item.addEventListener('mouseenter', function() {
			let submenu = this.querySelector('.nav_menu_submenu');
			submenu.style.display = 'block';
			// Toggle arrow display
			up_arrow_display(item);
		});

		item.addEventListener('mouseleave', function() {
			let submenu = this.querySelector('.nav_menu_submenu');
			submenu.style.display = 'none';
			// Toggle arrow display
			down_arrow_display(item);
		});

		if( window.innerWidth < 933 ) {
			item.addEventListener('click', function() {
				let menuDropdown = this.getElementsByClassName('menuDropdown')[0];
				let currentViewedMenutItem = document.querySelector('.menuDropdown.upArrow') ? document.querySelector('.menuDropdown.upArrow') : null;
				
				if( currentViewedMenutItem ) {
					currentViewedMenutItem.classList.remove('upArrow');
					currentViewedMenutItem.classList.add('downArrow');
				}

				if( menuDropdown.classList.contains('upArrow') ) {
					menuDropdown.classList.remove('upArrow');
					menuDropdown.classList.add('downArrow');	
				} else {
					menuDropdown.classList.remove('downArrow');
					menuDropdown.classList.add('upArrow');					
				}
				
			});			
		}
	});
}

function mobile_submenu_display() {
	[...nav_item].forEach(item => {
		item.addEventListener('touchstart', function(e) {

			// Prevent touch event from bubbling except for links
			if( e.target.tagName.toLowerCase() !== 'a' ) {
				e.preventDefault();				
			}

			// Toggle active class
			if( document.querySelector('.nav_menu_item.active') ) {
				document.querySelector('.nav_menu_item.active').classList.remove('active');
			}
			this.classList.add('active');
			
			// Hide any currently displayed submenus
			if( document.querySelector('.nav_menu_submenu.active') ) {
				// Get parent element to toggle arrow
				let currentActiveParentElem = document.querySelector('.nav_menu_submenu.active').parentElement;
				down_arrow_display(currentActiveParentElem);
				document.querySelector('.nav_menu_submenu.active').classList.remove('active');	
			}
			
			// Display submenu for touch event item
			let submenu = this.querySelector('.nav_menu_submenu');
			submenu.classList.add('active');
			up_arrow_display(item);			
		});
	});		
}

// Hide any displayed submenus on off touch for ipad landscape
function ipadHideMenuOffClick() {
	if( window.innerWidth === 1024 ) {
		document.addEventListener('touchstart', function(e) {
			if( !e.target.classList.contains('nav_menu_item') &&
				!e.target.classList.contains('menuDropdown') &&
				!e.target.classList.contains('nav_menu_item_title-wrapper') ) {

				let menuDisplaying = document.querySelector('.nav_menu_item.active') || null;
				
				if( menuDisplaying ) {
					let submenuDisplaying = menuDisplaying.querySelector('.nav_menu_submenu.active');
					down_arrow_display(menuDisplaying);
					menuDisplaying.classList.remove('active');
					submenuDisplaying.classList.remove('active');
				}
			}
		});
	}	
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

			ipadHideMenuOffClick();
			set_title_text();
		}, 250);		
	});
}

export function init ($) {
	// Init Semantic dropdown menu
	$('.ui.dropdown').dropdown({		
		on: 'hover',
		duration: 0
	});	

	ipadHideMenuOffClick();
	highlightNavParent();
	set_title_text();
	burger_mobile_menu();
	submenu_display();
	mobile_submenu_display();
	window_resize();	
}