import partner_hosts from './partner_hosts_list';
import experience_hosts from './experience_hosts_list';

export default (function() {

	if( location.pathname.includes('/mwf/us') ) {

		function list_display(list_data, dom_elem) {
			let 
				num_of_cols = 3,
				data_length = list_data.length,
				items_per_col = Math.ceil(data_length/num_of_cols),
				exp_host_dom = document.querySelector(dom_elem);		

			for( var i = 0; i < num_of_cols; i++) {
				let 
					fragment = document.createDocumentFragment(),
					upd_arr = list_data.splice(i, items_per_col),
					list = document.createElement('ul');
				
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

		list_display(partner_hosts, '.host_partners');
		list_display(experience_hosts, '.experience_hosts');

	}



})();