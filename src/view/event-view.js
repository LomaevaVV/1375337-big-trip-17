import {createElement} from '../render.js';
import {humanizeEventDate, calculateDateDif} from '../utils.js';

const createOfferTemplate = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

const getOffersTemplate = (offers) => (
  offers
    .map((offer) => createOfferTemplate(offer))
    .join('')
);

const createEventTemplate = (event) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  } = event;

  const dateFromToDate = humanizeEventDate(dateFrom,'YYYY-MM-DD');
  const dateFromToTitle = humanizeEventDate(dateFrom,'DD MMM');
  const dateFromToDateTime = humanizeEventDate(dateFrom,'YYYY-MM-DD[T]HH:mm');
  const dateFromToTime = humanizeEventDate(dateFrom,'HH:mm');
  const dateToToDateTime = humanizeEventDate(dateTo,'YYYY-MM-DD[T]HH:mm');
  const dateToToTime = humanizeEventDate(dateTo,'HH:mm');
  const getFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFromToDate}">${dateFromToTitle}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFromToDateTime}">${dateFromToTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateToToDateTime}">${dateToToTime}</time>
        </p>
        <p class="event__duration">${calculateDateDif(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getOffersTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${getFavoriteClass}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class EventView {
  constructor(event) {
    this.event = event;
  }

  getTemplate() {
    return createEventTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
