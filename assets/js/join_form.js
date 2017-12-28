// Common vars
var form = document.querySelector('.join'),
	form_close = document.querySelector('.close--join_form'),
	formScrollPos = window.pageYOffset,
	formHiddenFields = document.querySelectorAll('.hide_on_init'),
	formPointer = document.querySelector('.upArrow--joinForm'),
	nav_join_desktop = document.querySelector('.nav_join--desktop'),
	nav_join_mobile = document.querySelector('.nav_join--mobile'),
	nav_items = document.querySelectorAll('.nav_menu_item:not(.nav_menu_item--social)'),
	site_title = document.querySelector('.nav_siteurl span');

function check_session_data() {
	let session = localStorage.session;
	
	if( session == null || session == 'new' ) {
		localStorage.session = 'new';
		form.style.display = 'block';
		
		site_title.textContent === 'Young African Leaders Initiative';
	}		
	
	if( session == 'returning' ) {
		form.style.display = 'none';

		if( window.innerWidth > 933 ) {
			nav_join_desktop.style.display = 'inline-block';
		} else {
			nav_join_mobile.style.display = 'inline-block';
		}
		
		nav_items.forEach(item => {			
			if( item.classList.contains('initial_wide') ) item.classList.remove('initial_wide');
		});
	}		
}

function close_form() {		
	form_close.addEventListener('click', function(){
		localStorage.session = 'returning';
		form.style.display = 'none';
		
		nav_items.forEach(item => {
			if( item.classList.contains('initial_wide') ) item.classList.remove('initial_wide');
		});
		
		if( window.innerWidth > 933 ) {
			nav_join_desktop.style.display = 'inline-block';
		} else {
			nav_join_mobile.style.display = 'inline-block';
			set_title();
		}
	});
}

function display_form() {
	// Display form and set formScrollPos
	[nav_join_desktop, nav_join_mobile].forEach(item => {
		item.addEventListener('click', function() {
			form.style.display = 'block';
			[...formHiddenFields].forEach(field => field.classList.remove('hide_on_init'));

			formScrollPos = window.pageYOffset;
			formPointer.style.display = 'block';
		});
	});		
	
	close_form();
}



function set_title() {			
	if( site_title.textContent === 'Young African Leaders Initiative' ) site_title.textContent = 'YALI';
}

function on_resize() {
	var resized;
	window.addEventListener('resize', () => {
		clearTimeout(resized);
		resized = setTimeout(function() {
			if( window.innerWidth < 934 ) {
				if( localStorage.session == 'returning' || localStorage.scrolled == 'true' ) {
					nav_join_mobile.style.display = 'inline-block';
				}
			} else {
				if( localStorage.session == 'returning' ) nav_join_desktop.style.display = 'inline-block';
			}				
		});
	});
}

export function init() {
	check_session_data();
	display_form();		
	on_resize();
}