import experience_hosts from './experience_hosts_list';

export default (function() {

	if( location.pathname.includes('partnership-information') ) {

		let 
			num_of_cols = 3,
			data_length = experience_hosts.length,
			items_per_col = Math.ceil(data_length/num_of_cols),
			exp_host_dom = document.querySelector('.experience_hosts');		

		for( var i = 0; i < num_of_cols; i++) {
			let fragment = document.createDocumentFragment();			
			let upd_arr = experience_hosts.splice(i, items_per_col);
			let list = document.createElement('ul');
			list.classList.add('list_column')

			upd_arr.forEach( link => {				
				let list_item = document.createElement('li');				
				list_item.innerHTML = link;
				list.appendChild(list_item);
			});

			fragment.appendChild(list);
			exp_host_dom.appendChild(fragment);			

		}

	}



})();