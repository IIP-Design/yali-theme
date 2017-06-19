var Join = (function() {	

	// Common vars
	var form = document.querySelector('.join'),
		form_close = document.querySelector('.close--join_form'),
		formScrollPos = window.pageYOffset,
		nav_join_desktop = document.querySelector('.nav_join--desktop'),
		nav_join_mobile = document.querySelector('.nav_join--mobile');

	var init = function() {
		check_session_data();
		display_form();
		on_scroll();
		on_resize();
	};

	var check_session_data = function() {
		let session = localStorage.session;
		
		if( session == null || session == 'new' ) {
			localStorage.session = 'new';
			form.style.display = 'block';
		}		
		
		if( session == 'returning' ) {
			form.style.display = 'none';

			if( window.innerWidth > 933 ) {
				nav_join_desktop.style.display = 'inline-block';
			} else {
				nav_join_mobile.style.display = 'inline-block';
			}
		}		
	};

	var close_form = function() {		
		form_close.addEventListener('click', function(){
			localStorage.session = 'returning';
			form.style.display = 'none';
			
			if( window.innerWidth > 933 ) {
				nav_join_desktop.style.display = 'inline-block';
			} else {
				nav_join_mobile.style.display = 'inline-block';
			}
		});
	};

	var display_form = function() {
		// Display form and set formScrollPos
		[nav_join_desktop, nav_join_mobile].forEach(item => {
			item.addEventListener('click', function() {
				form.style.display = 'block';	
				formScrollPos = window.pageYOffset;
			});
		});		

		close_form();
	};

	var on_scroll = function() {
		// Hide form after scrolling 300px from formScrollPos
		window.addEventListener('scroll', () => {
			if( (window.pageYOffset - formScrollPos) >= 300 ) {
				// Set session if user scrolled, used for resize event
				localStorage.scrolled = 'true';				

				form.classList.add('fade_out');
				setTimeout(() => {
					form.style.display = 'none';
					form.classList.remove('fade_out');
				}, 500);
				
				nav_join_desktop.style.display = 'inline-block';	
				nav_join_desktop.classList.add('no_show');			
				
				// Transition in nav join menu btn
				setTimeout(() => {
					nav_join_desktop.classList.remove('no_show');
					nav_join_desktop.classList.add('fade_in');
				}, 0);
			}	
		});		
	};

	var on_resize = function() {
		var resized;
		window.addEventListener('resize', () => {
			clearTimeout(resized);
			resized = setTimeout(function() {
				if( window.innerWidth < 934 ) {
					if( localStorage.session == 'returning' || localStorage.scrolled == 'true' ) nav_join_mobile.style.display = 'inline-block';
				} else {
					if( localStorage.session == 'returning' ) nav_join_desktop.style.display = 'inline-block';
				}				
			});
		});
	}

	return {
		init: init
	}

})();

Join.init();