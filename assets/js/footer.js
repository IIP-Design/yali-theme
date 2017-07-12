var search_input_div = document.querySelector('.footer_list_item--search .search_input_wrapper'),
	search_open = document.querySelector('.footer_list_item--search .search.icon'),
	search_close = document.querySelector('.footer_list_item--search .remove.icon');

function footer_search_display() {
	search_open.addEventListener('click', function() {
		console.log('open!');
		search_input_div.classList.remove('hide');
	});
}

function footer_search_close() {	
	search_close.addEventListener('click', function() {
		console.log('close!');
		search_input_div.classList.add('hide');
	});
}

export function init() {
	footer_search_display();
	footer_search_close();
}