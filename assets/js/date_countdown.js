export default (function countdown(timestamp) {
	if( !document.querySelector('[data-timestamp]') ) return;
	
	var timestamp = document.querySelector('[data-timestamp]').dataset.timestamp,
		month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		the_date = new Date(timestamp * 1000),
		formattedDate = `${month[the_date.getMonth()]} ${the_date.getDate()}, ${the_date.getFullYear()} at ${the_date.getHours()}am GMT`;

	console.log(formattedDate);
})();