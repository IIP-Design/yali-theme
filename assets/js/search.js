var 
	nav_search = document.querySelector('.search-icon_wrapper i'),
	search_input = document.querySelector('.search_wrapper input'),
	search_input_wrapper = document.querySelector('.search_input'),
	search_icon_wrapper = document.querySelector('.search-icon_wrapper'),
	search_submit = document.querySelector('#searchsubmit'),
	search_close = document.querySelector('.search_input_close');

function display_search_input() {
	let nav_menu_width = document.querySelector('.nav_menu').getBoundingClientRect().width;
	search_input.style.width = nav_menu_width - 39 + 'px';

	search_input_wrapper.classList.remove('hide');
	search_icon_wrapper.classList.add('search_displaying');

	search_submit.style.zIndex = '2';
}

function close_search_input() {
	search_close.addEventListener('click', function() {
		search_input_wrapper.classList.add('hide');
		search_icon_wrapper.classList.remove('search_displaying');
		search_input.style.width = 0;
		search_submit.style.zIndex = '-1';
	});
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
					search_input_wrapper.classList.remove('hide');
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
	close_search_input();
	on_resize();
}