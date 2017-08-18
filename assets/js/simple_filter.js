// For post_listings_simple_filter.twig

export default (function (){
	let sf_filter_items = [...document.querySelectorAll('.sf_filter_item')];
	if( sf_filter_items.length > 0 ) {
		sf_filter_items.forEach((item) => {
			item.addEventListener('click', function(){
				let current_active_item = document.querySelector('.sf_filter_item.active');
				current_active_item.classList.remove('active');

				this.classList.add('active');
			});
		});
	}
})();