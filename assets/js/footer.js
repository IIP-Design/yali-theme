var search_input_div = document.querySelector('.footer_list_item--search .search_input_wrapper'),
	search_input = document.querySelector('.footer_list_item--search .search_input_wrapper > input'),
	search_open = document.querySelector('.footer_list_item--search .search.icon'),
	search_close = document.querySelector('.footer_list_item--search .remove.icon');

function footer_search_display() {
	search_open.addEventListener('click', function() {
		search_input_div.classList.remove('hide');		
		
		setTimeout(function(){			
			search_input_div.style.opacity = 1;
			//search_input.style.width = '100px';
			search_input.classList.add('active');
			search_open.classList.add('active');
		}, 0);
		
	});
}

function footer_search_close() {	
	search_close.addEventListener('click', function() {
		//search_input.style.width = 0;		
		search_input.classList.remove('active');

		setTimeout(function(){
			search_input_div.style.opacity = 0;
			search_input_div.classList.add('hide');
			search_open.classList.remove('active');
		}, 250);
	});
}

export function init() {
	footer_search_display();
	footer_search_close();
}