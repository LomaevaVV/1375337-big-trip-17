import AbstractView from '../framework/view/abstract-view.js';
import {getSortedEventsbyDate} from '../utils/sort.js';
import {humanizeEventDate} from '../utils/event.js';
import {getOffersByType} from '../utils/offers.js';

const createTripInfoTemplate = (events, offersCatalog) => {
  const sortedEvents = getSortedEventsbyDate(events);
  const startDate = sortedEvents[0].dateFrom;
  const endDate = sortedEvents[sortedEvents.length - 1].dateTo;

  const getTripCost = () => {
    let eventsTotalCost = 0;

    events.forEach(({ offers, type, basePrice }) => {
      const availableOffers = getOffersByType(offersCatalog, type)?.offers || [];
      const selectedOffers = availableOffers.filter((offer) => offers.includes(offer.id));
      const eventOferrsCost = selectedOffers.reduce((acc, cur) => acc + cur.price, 0);
      eventsTotalCost += eventOferrsCost + basePrice;
    });

    return eventsTotalCost;
  };

  const getTripDestinations = () => {
    const startDestinationName =  events[0] ? events[0].destination.name : '';
    const endDestinationName = events.length >= 2 ? events[events.length - 1].destination.name : '.&nbsp;.&nbsp;.';
    const uniqEventsDestinations = [];
    events.forEach(({ destination }) => {
      if (!uniqEventsDestinations.includes(destination.name)) {
        uniqEventsDestinations.push(destination.name);
      }
    });

    if (uniqEventsDestinations.length > 3) {
      return `${startDestinationName} &mdash; ... &nbsp&mdash; ${endDestinationName}`;
    }
    if (uniqEventsDestinations.length === 3 || uniqEventsDestinations.length === 2) {
      return uniqEventsDestinations.map((destinationName) => `${destinationName}`).join(' &mdash; ');
    }
    if (uniqEventsDestinations.length === 1) {
      return `${startDestinationName}`;
    }
    return '';
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripDestinations()}</h1>

        <p class="trip-info__dates">${humanizeEventDate(startDate,'MMM DD')}&nbsp;&mdash;&nbsp;${humanizeEventDate(endDate,'MMM DD')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost()}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = null;
  #offersCatalog = null;

  constructor(events, offersCatalog) {
    super();
    this.#events = events;
    this.#offersCatalog = offersCatalog;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#offersCatalog);
  }
}
