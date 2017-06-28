var nav_search = document.querySelector('.search-icon_wrapper i'),
	search_input = document.querySelector('.search_wrapper input'),
	search_icon_wrapper = document.querySelector('.search-icon_wrapper');

function display_search_input() {
	let nav_menu_width = document.querySelector('.nav_menu').getBoundingClientRect().width;
	search_input.style.width = nav_menu_width - 39 + 'px';

	search_input.classList.toggle('hide');
	search_icon_wrapper.classList.toggle('search_displaying');

	if( this.classList.contains('search') ) {			
		this.classList.remove('search');
		this.classList.add('remove');			
	}

	else if( this.classList.contains('remove') ) {			
		this.classList.remove('remove');
		this.classList.add('search');	
		search_input.style.width = 0;
	}
}

function on_resize() {
	var resized;
	window.addEventListener('resize', () => {
		clearTimeout(resized);
		resized = setTimeout(function() {
			if( window.innerWidth > 933 ) {
				nav_search.addEventListener('click', display_search_input);
			}

			else {
				nav_search.removeEventListener('click', display_search_input);

				if( nav_search.classList.contains('remove') ) {
					nav_search.classList.remove('remove');
					nav_search.classList.add('search');
					search_input.classList.add('hide');
					search_icon_wrapper.classList.remove('search_displaying');
				}
			}
		});
	});
}

export function init() {	
	if( window.innerWidth > 933 ) {
		nav_search.addEventListener('click', display_search_input);
	}

	on_resize();
}