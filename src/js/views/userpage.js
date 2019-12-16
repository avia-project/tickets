
class UserPageUI {
	constructor() {
		this.container = document.querySelector('.personal-tickets .row');
		this.title = document.getElementById('usrpg-title');
		this.closeBtn = document.getElementById('usrpg-close-btn');
		this.tickets = {};
	}

	renderTickets() {
		this.clearContainer();
		const tickets = this.tickets;
		if (!tickets.length) {
			this.showEmptyMsg();
			return;
		}

		let fragment = '';

		tickets.forEach(ticket => {
			const template = UserPageUI.ticketTemplate(ticket);
			fragment += template;
		});

		this.container.insertAdjacentHTML('afterbegin', fragment);
	}

	clearContainer() {
		this.container.innerHTML = '';
	}

	showEmptyMsg() {
		const template = UserPageUI.emptyMsgTemplate();
		this.container.insertAdjacentHTML('afterbegin', template);
	}

	// addTicket(ticket, currency, quantity) {
	//
	// 	let fragment = UserPageUI.ticketTemplate(this.serializeTicket(ticket, currency, quantity));
	// 	this.container.insertAdjacentHTML('afterbegin', fragment);
	// }
	//
	// serializeTicket(ticket, currency, quantity) {
	// 	return Object.value(ticket).map(ticket => {
	// 		return {
	// 			origin : ticket.origin_name,
	// 			destination: ticket.destination_name,
	// 			airline: ticket.airline_name,
	// 			departure_date: ticket.departure_at,
	// 			price: ticket.price,
	// 			currency: currency,
	// 			transfers: ticket.transfers,
	// 			quantity: quantity,
	// 		};
	// 	});
	// }

	static emptyMsgTemplate() {
		return `
    <div class="tickets-empty-res-msg">
    	У вас пока нету билетов.
    </div>
    `;
	}

	static ticketTemplate(ticket) {
		return `
    <div class="col s12 m12">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <span class="ticket-airline-name"
            >${ticket.airline}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_date}</span>
          <span class="ticket-price ml-auto">${ticket.currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}; Кількість : ${ticket.quantity}</span>
        </div>
      </div>
    </div>
    `;
	}

}

const userPageUI = new UserPageUI();

export default userPageUI;