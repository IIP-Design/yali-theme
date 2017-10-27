var 
	search_input_div = document.querySelector('.footer_list_item--search .search_input_wrapper'),
	search_input = document.querySelector('.footer_list_item--search .search_input_wrapper > input'),
	search_open = document.querySelector('.footer_list_item--search .search.icon'),
	search_close = document.querySelector('.footer_list_item--search .remove.icon'),
	search_submit = document.querySelector('#searchsubmit_footer'),
	footer_list_items = document.querySelectorAll('.footer_list .ui.item');

function footer_search_display() {
	try {
		search_open.addEventListener('click', function() {
			search_input_div.classList.remove('hide');		
			
			search_submit.style.zIndex = '2';

			setTimeout(function(){			
				search_input_div.style.opacity = 1;
				search_input.classList.remove('inactive');
				search_input.classList.add('active');
				search_open.classList.add('active');			
				
				footer_phablet_display();			

			}, 0);
			
		});
	} catch (e) {
		console.log('DOM element search_open is not defined');
	}
}

function footer_search_close() {	
	try {
	search_close.addEventListener('click', function() {
		search_input.classList.remove('active');
		search_input.classList.add('inactive');

		search_submit.style.zIndex = '-1';

		setTimeout(function(){
			search_input_div.style.opacity = 0;
			search_input_div.classList.add('hide');
			search_open.classList.remove('active');
		}, 250);
	});
	} catch (e) {
		console.log('DOM element search_close is not defined');
	}
}

function footer_phablet_display() {
	if( window.innerWidth > 589 && window.innerWidth < 934 ) {
		let totalListWidth = 0;		
		footer_list_items.forEach((item, index) => {		
			if( index !== footer_list_items.length - 1 )
				totalListWidth += Math.ceil(Number(item.getBoundingClientRect().width));		
		});
		
		search_input.style.width = totalListWidth + 'px';
	}
}

export function init() {
	footer_search_display();
	footer_search_close();
}