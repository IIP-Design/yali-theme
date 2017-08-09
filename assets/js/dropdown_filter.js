
function displayMenu() {
	let filter_type = document.querySelectorAll('.filter_type');

	if( filter_type === null ) return;

	[...filter_type].forEach(filter_item => {
		filter_item.addEventListener('click', function() {
			let filter = this.parentElement;
			let menu = filter.querySelector('.filter_menu');

			filter.classList.toggle('active');
			menu.classList.toggle('active');
		});
	});
}


function showMore() {
	const maxListLength = 12;
	let articles = document.querySelectorAll('.pl_article'),
		showMoreBtn = document.querySelector('.all_posts_showmore');

	if( [...articles].length = 0 || showMoreBtn === null )	return;

	if( articles.length > maxListLength ) {
		[...articles].slice(maxListLength).forEach(article => {
			article.style.display = 'none';
		});	

		showMoreBtn.style.display = 'block';
	}
	
	showMoreBtn.addEventListener('click', function() {
		[...articles].slice(maxListLength).forEach(article => {
			article.style.display = 'block';
		});			
	});
}


function displaySearchFilters() {
	const refineSearchBtn = document.querySelector('.filter_mobile_search');
	if( !refineSearchBtn ) return;

	refineSearchBtn.addEventListener('click', function() {
		let dropdownFilter = document.querySelector('.dropdown_filter');
		dropdownFilter.classList.toggle('active');
	});
}

export function init() {
	displayMenu();
	showMore();
	displaySearchFilters();
}