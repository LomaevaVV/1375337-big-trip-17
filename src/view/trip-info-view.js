import AbstractView from '../framework/view/abstract-view.js';
import {getSortedEventsbyDate} from '../utils/sort.js';
import {humanizeEventDate} from '../utils/event.js';

const createTripInfoTemplate = (events) => {
  const sortedEvents = getSortedEventsbyDate(events);
  const startDate = sortedEvents[0].dateFrom;
  const endDate = sortedEvents[sortedEvents.length - 1].dateTo;
  const tripCost = events.reduce((acc, cur) => acc + cur.basePrice, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${humanizeEventDate(startDate,'MMM DD')}&nbsp;&mdash;&nbsp;${humanizeEventDate(endDate,'MMM DD')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = null;

  constructor(events) {
    super();
    this.#events = events;
  }

  get template() {
    return createTripInfoTemplate(this.#events);
  }
}
