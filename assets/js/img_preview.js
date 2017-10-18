export default (function() {
	// Store imgs w/ preview data attr
	let imgs = [...document.querySelectorAll('[data-preview-image]')];	
	if( imgs.length < 1 ) return; // return fn if no preview imgs

	imgs.forEach( img => {	
		// Add click event for display
		img.addEventListener('click', function() {
			let 				
				// use fragment to add to DOM (faster, no repaint)
				fragment = document.createDocumentFragment(), 
				// div to append to body, img, close elems
				img_preview_div = document.createElement('div'),
				img_wrapper = document.createElement('div'),
				img = document.createElement('img'),
				close_wrapper = document.createElement('div'),
				close = document.createElement('i');
			
			// add classes to each elem	
			img_preview_div.classList.add('image_preview');
			img_wrapper.classList.add('img_wrapper');
			close_wrapper.classList.add('close_preview');
			close.classList.add('remove', 'icon');			
			
			// Set img src to clicked image
			img.src = this.dataset.previewImage;
			
			// add text to Close btn and add click event to close preview
			close_wrapper.innerHTML = 'CLOSE';
			close_wrapper.appendChild(close);
			close_preview(close_wrapper);
			
			// Append elems and add fragment to DOM
			img_wrapper.appendChild(img);
			img_wrapper.appendChild(close_wrapper);

			img_preview_div.appendChild(img_wrapper);

			fragment.appendChild(img_preview_div);
			document.body.appendChild(fragment);
		});			
	});

	// Close Preview
	function close_preview(close_elem) {
		close_elem.addEventListener('click', function() {
			document.querySelector('.image_preview').remove();
		});
	}
	
})();