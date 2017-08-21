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


function displayFilterSelection() {
	let selections_div = document.querySelector('.filter_selections');
	let filter_menu_items = document.querySelectorAll('.filter_menu_item input');

	[...filter_menu_items].forEach((item) => {
		item.addEventListener('change', function() {
			let sel_name = ( this.name === 'video' ) ? 'video_type' : this.name;
			
			if( this.checked === true ) {
				addFilterSelection(this, sel_name, selections_div);
			} 
			else if( this.checked === false ) {
				document.querySelector('.' + sel_name).remove();				
			}
		});
	});	
}


function addFilterSelection(item, sel_name, selections_div) {
	let fragment = document.createDocumentFragment();
	let sel_filter = document.createElement('span');
	let delete_icon = document.createElement('i');

	removeFilterSelection(delete_icon);

	sel_filter.setAttribute('class', 'ui label ' + sel_name); 
	sel_filter.textContent = item.value;

	delete_icon.setAttribute('class', 'delete icon');
	sel_filter.appendChild(delete_icon);

	fragment.appendChild(sel_filter);
	selections_div.appendChild(fragment);
}


function removeFilterSelection(delete_icon) {
	delete_icon.addEventListener('click', function(e) {		
		let chkbx = document.querySelector('input[value="' + this.parentElement.textContent + '"]');
		this.parentElement.remove();		
		chkbx.checked = false;
	});
}


// Archive pages - display taxonomy filter
function archivePagesDisplayFilter() {
	let archive_info = document.querySelector('[data-archive-tax]');
	if( archive_info === null ) return;
	
	let archive_filter = archive_info.dataset.archiveFilter;	
	let filter_item = document.querySelector(`[data-tax-item=${archive_filter}]`);
	filter_item.checked = true;	

	let sel_name = ( filter_item.name === 'video' ) ? 'video_type' : filter_item.name;
	let selections_div = document.querySelector('.filter_selections');

	addFilterSelection(filter_item, sel_name, selections_div);
}




export function init() {
	displayMenu();
	showMore();
	displaySearchFilters();
	displayFilterSelection();
	archivePagesDisplayFilter();
}