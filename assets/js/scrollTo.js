export default function scroll_to_elem(elem_class) {	
	var scroll_links = [...document.querySelectorAll(elem_class)];	

	scroll_links.forEach(scroll_link => {
		scroll_link.addEventListener('click', function(e) {
			e.preventDefault();

			var 
				nav_height = ( window.outerWidth > 933 ) ? 92 : 62,
				offset = 50 + nav_height,
				scrollToElemID = this.hash;

			if( scrollToElemID ) {
				var scrollToElem = document.querySelector( scrollToElemID );

				if( scrollToElem ) {
					window.scrollBy({
						top: scrollToElem.getBoundingClientRect().y - offset,
						left: 0,
						behavior: 'smooth'
					});
				}
			}
		});
	});
};