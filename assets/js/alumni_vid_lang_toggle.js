export default (function() {
	// Language Toggle Buttons
	let lang_btns = [...document.querySelectorAll('.lang-btn')];		

	// Toggle Vids on click
	lang_btns.forEach(btn => {

		btn.addEventListener('click', function() {
			let langBtnToDisplay = document.querySelector('.lang-btn.hide'),
				alumniVidsToDisplay = document.querySelector('.alumni_vids.hide'),
				currentAlumniVids = document.querySelector('.alumni_vids:not(.hide)');
			
			this.classList.add('hide');
			langBtnToDisplay.classList.remove('hide');

			currentAlumniVids.classList.add('hide');
			alumniVidsToDisplay.classList.remove('hide');

			// Set opacity to 0, then remove so user notices video change
			alumniVidsToDisplay.classList.add('transitioning');
			setTimeout(function() {
				alumniVidsToDisplay.classList.remove('transitioning');
			}, 250);
		});

	});


})();