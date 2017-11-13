export default function application_status() {
	let application_status_div = document.querySelector('.application_status');
	let application_open_date = ( document.querySelector('#countdatetime') ) ? new Date(document.querySelector('#countdatetime').value) : null;
	
	if( !application_status_div || !application_open_date ) return;
	
	let today = new Date(),
		app_year = application_open_date.getFullYear(),
		today_year = today.getFullYear(),
		app_month = application_open_date.getMonth(),
		today_month = today.getMonth(),
		app_date = application_open_date.getDate(),
		today_date = today.getDate();

	if( app_year < today_year ) {
		application_status_div.classList.add('app_closed');
	} 
	else if( app_year == today_year && app_month < today_month ) {		
		application_status_div.classList.add('app_closed');		
	}
	else if( app_month == today_month && app_date < today_date ) {
		application_status_div.classList.add('app_closed');	
	}

};