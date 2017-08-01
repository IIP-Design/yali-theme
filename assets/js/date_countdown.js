export default (function countdown(timestamp) {
	var timestamp = document.querySelector('[data-timestamp]').dataset.timestamp;
	if( !timestamp ) return;

	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var	the_date = new Date(timestamp * 1000);
	var formattedDate = `${month[the_date.getMonth()]} ${the_date.getDate()}, ${the_date.getFullYear()} at ${the_date.getHours()}am GMT`;

	console.log(formattedDate);
})();