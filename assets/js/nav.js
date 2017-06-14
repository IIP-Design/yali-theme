var Nav = (function () {

	// DOM Elems
	var burger = document.querySelector('.burger'),
		nav_siteurl = document.querySelectorAll('.nav_siteurl'),		
		nav_text = document.querySelector('.nav_siteurl span'),
		nav_menu = document.querySelectorAll('.nav_menu'),
		nav_item = document.querySelectorAll('.nav_menu_item');	

	var init = function() {
		// Init Semantic dropdown menu
		$('.ui.dropdown').dropdown();		

		mobile_menu();
		display_sub_menu();
		window_resize();
	};

	var mobile_menu = function() {
		burger.addEventListener('click', function() {				
			this.classList.toggle('active');

			[...nav_siteurl, ...nav_menu].forEach(item => {
				item.classList.toggle('mobile');			
			});					
		});

		// Change Site Url Text on smaller viewports
		if( window.innerWidth < 680 ) nav_text.innerHTML = 'YALI';
	};

	var display_sub_menu = function() {
		Array.from(nav_item).forEach(item => {
			item.addEventListener('click', function() {
				// Remove any existing active classes and highlight clicked menu item
				if( document.querySelector('.nav_menu_item .active') !== null ) document.querySelector('.nav_menu_item .active').classList.remove('active');
				this.getElementsByClassName('nav_menu_item_title-wrapper')[0].classList.toggle('active');
				
				// Toggle dropdown arrows
				var current_upArrow = document.querySelector('.upArrow');		
				var menuDropdown = this.getElementsByClassName('menuDropdown')[0];
				if(  menuDropdown.classList.contains('downArrow') ) {
					if( current_upArrow !== null ) {
						current_upArrow.classList.remove('upArrow');
						current_upArrow.classList.add('downArrow');
					}
					menuDropdown.classList.remove('downArrow');
					menuDropdown.classList.add('upArrow');
				} else {
					menuDropdown.classList.remove('upArrow');
					menuDropdown.classList.add('downArrow');				
				}							
			});
		});

		// Remove Up Arrow on off clicks				
		document.addEventListener('click', function(e) {
			if( !nav_menu[0].contains(e.target) ) {								
				var current_upArrow = document.querySelector('.upArrow');				
				if( current_upArrow !== null ) {
					current_upArrow.classList.remove('upArrow');
					current_upArrow.classList.add('downArrow');
				}				
			}
		});		
	};

	var window_resize = function() {
		var resized;
		window.addEventListener('resize', () => {
			clearTimeout(resized);
			resized = setTimeout(function() {
				if( window.innerWidth > 932 ) {
					[...nav_siteurl, ...nav_menu].forEach(item => {
						if( item.classList.contains('mobile' ) ) item.classList.remove('mobile');
					});	
					
					if( burger.classList.contains('active') ) burger.classList.remove('active');
				}

				if( window.innerWidth > 680 ) {
					nav_text.innerHTML = 'Young African Leaders Initiative';
				} else {
					nav_text.innerHTML = 'YALI';
				}				
			}, 250);		
		});
	};

	return {
		init: init
	}

})();

Nav.init();