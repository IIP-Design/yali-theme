export default function show_more_posts(elem_list_class) {
	// Select all rows containing posts to be displayed
	let hiddenRows = document.querySelectorAll(elem_list_class);
	// If empty, return fn
	if( hiddenRows.length < 1 ) return;

	// Click Event for Show More Button
	const showMoreBtn = document.querySelector('.cta_link--showmore');
	showMoreBtn.addEventListener('click', function() {
		hiddenRows.forEach( (currentVal, index) => {
			// Show first 4 rows (12 posts) by removing hidden class
			if( index < 4 ) {
				currentVal.classList.remove('hidden');
			}			
		});		

		// Update the hiddenRows nodelist
		hiddenRows = document.querySelectorAll(elem_list_class);
		// If nodelist empty, no more rows/posts so hide showMore button
		if( hiddenRows.length < 1 ) {
			showMoreBtn.style.display = 'none';
		}
	});

}