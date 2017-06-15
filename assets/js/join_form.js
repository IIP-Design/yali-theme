var Join = (function() {	

	// Private vars
	var form = document.querySelector('.join'),
		form_close = document.querySelector('.close--join_form'),
		nav_join_desktop = document.querySelector('.nav_join--desktop'),
		nav_join_mobile = document.querySelector('.nav_join--mobile');

	var init = function() {
		check_session_data();
		form_display();
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

	var form_display = function() {		

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

	return {
		init: init
	}

})();

Join.init();