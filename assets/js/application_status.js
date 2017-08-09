export default (function application_status() {
	let application_status_div = document.querySelector('.application_status');

	if( !application_status_div ) return;

	let application_open_date = new Date(document.querySelector('#caldatetime').value);
	let today = new Date();

	if( application_open_date.getFullYear() < today.getFullYear() ) {
		application_status_div.classList.add('app_closed');
		return;
	} else if( application_open_date.getFullYear() == today.getFullYear() ) {
		if( application_open_date.getMonth() < today.getMonth() ){
			application_status_div.classList.add('app_closed');
			return;
		}
	}

})();