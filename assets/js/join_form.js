var Join = (function() {	

	// Common vars
	var form = document.querySelector('.join'),
		form_close = document.querySelector('.close--join_form'),
		formScrollPos = window.pageYOffset,
		formHiddenFields = document.querySelectorAll('.hide_on_init'),
		formPointer = document.querySelector('.upArrow--joinForm'),
		nav_join_desktop = document.querySelector('.nav_join--desktop'),
		nav_join_mobile = document.querySelector('.nav_join--mobile'),
		site_title = document.querySelector('.nav_siteurl span');

	var init = function() {
		check_session_data();
		display_form();		
		on_resize();

		window.addEventListener('scroll', on_scroll, false);
	};

	var check_session_data = function() {
		let session = localStorage.session;
		
		if( session == null || session == 'new' ) {
			localStorage.session = 'new';
			form.style.display = 'block';
			
			site_title.textContent === 'Young African Leaders Initiative';
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
				set_title();				
			}

			off_scroll();
		});
	};

	var display_form = function() {
		// Display form and set formScrollPos
		[nav_join_desktop, nav_join_mobile].forEach(item => {
			item.addEventListener('click', function() {
				form.style.display = 'block';
				[...formHiddenFields].forEach(field => field.classList.remove('hide_on_init'));

				formScrollPos = window.pageYOffset;
				window.addEventListener('scroll', on_scroll, false);
				formPointer.style.display = 'block';
			});
		});		
		
		close_form();
	};

	var on_scroll = function() {
		// Hide form after scrolling 300px from formScrollPos
		if( (window.pageYOffset - formScrollPos) >= 300 ) {
			// Set session if user scrolled, used for resize event
			localStorage.scrolled = 'true';				

			// Add fade out class and remove afterwards 
			form.classList.add('fade_out');
			setTimeout(() => {
				form.style.display = 'none';
				form.classList.remove('fade_out');				
			}, 250);

			// Stop scroll event
			window.removeEventListener('scroll', on_scroll, false);
			
			// Display appropriate nav menu join button, set title if mobile
			// initially set to opacity 0
			if( window.innerWidth > 933 ) {
				nav_join_desktop.style.display = 'inline-block';	
				nav_join_desktop.classList.add('no_show');
			} else {
				nav_join_mobile.style.display = 'inline-block';	
				nav_join_mobile.classList.add('no_show');
				set_title();			
			}
							
			// Transition in nav join menu btn
			setTimeout(() => {
				if( window.innerWidth > 933 ) {
					nav_join_desktop.classList.remove('no_show');
					nav_join_desktop.classList.add('fade_in');	
				} else {
					nav_join_mobile.classList.remove('no_show');
					nav_join_mobile.classList.add('fade_in');
				}					
			}, 0);
		}
	};

	var off_scroll = function() {
		window.removeEventListener('scroll', on_scroll, false);
	};

	var set_title = function() {		
		if( site_title.textContent === 'Young African Leaders Initiative' ) site_title.textContent = 'YALI';
	};

	var on_resize = function() {
		var resized;
		window.addEventListener('resize', () => {
			clearTimeout(resized);
			resized = setTimeout(function() {
				if( window.innerWidth < 934 ) {
					if( localStorage.session == 'returning' || localStorage.scrolled == 'true' ) {
						nav_join_mobile.style.display = 'inline-block';						
						set_title();
					}
				} else {
					if( localStorage.session == 'returning' ) nav_join_desktop.style.display = 'inline-block';
				}				
			});
		});
	};

	return {
		init: init
	}

})();

Join.init();