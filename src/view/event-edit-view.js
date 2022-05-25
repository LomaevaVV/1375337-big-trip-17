import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeEventDate} from '../utils/event.js';
import {offersСatalog} from '../mock/offers.js';
import {destinationsСatalog} from '../mock/destinations.js';
import {POINT_TYPES} from '../constants.js';

const NEW_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: ''
};

const createDestinationsListTemplate = (destinations) => (
  `
    ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
  `
);

const createTypeItemTemplate = (type, selectedType) => (
  `<div class="event__type-item">
    <input
      id="event-type-${type.toLowerCase()}-1"
      class="event__type-input
      visually-hidden"
      type="radio"
      name="event-type"
      value="${type.toLowerCase()}"
      ${type === selectedType? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`
);

const createTypeListTemplate = (availableTypes, selectedType) => {
  const typeItemsTemplate = availableTypes
    .map((type) => createTypeItemTemplate(type, selectedType))
    .join('');

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${typeItemsTemplate}
    </fieldset>`
  );
};

const getOffersByType = (type) => offersСatalog.find((offer) => offer.type === type);

const createOfferTemplate = (currentOffer, selectedOffers) => {
  const {id, title, price} = currentOffer;
  const isAlreadySelected = selectedOffers.find((selected) => title === selected.title);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
             id="event-offer-${id}"
             type="checkbox"
             name="event-offer"
             value="${id}"
             ${isAlreadySelected ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersTemplate = (availableOffers, selectedOffers) => {
  if (availableOffers?.length === 0) {
    return '';
  }

  const offersListTemplate = availableOffers
    .map((offer) => createOfferTemplate(offer, selectedOffers))
    .join('');

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`
  );
};

const createPicturesTemplate = (pictures) => (
  pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')
);

const createDestinationTemplate = (destination) => {
  if (!destination) {
    return  '';
  }

  const picturesTemplate = createPicturesTemplate(destination.pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>`
  );
};


const createEventEditTemplate = (event) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type
  } = event;

  const availableOffers = getOffersByType(type)?.offers||[];

  const typesTemplate = createTypeListTemplate(POINT_TYPES, type);
  const offersTemplate = createOffersTemplate(availableOffers, offers);
  const destinationTemplate = createDestinationTemplate(destination);
  const destionationsListTemplate = createDestinationsListTemplate(destinationsСatalog);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${typesTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destionationsListTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class EventEditView extends AbstractStatefulView {
  constructor(event = NEW_EVENT) {
    super();
    this._state = EventEditView.parseTaskToState(event);

    this.element.querySelector('.event__type-list')
      .addEventListener('click', this.#eventTypeToggleHandler);
    this.element.querySelector('#destination-list-1')
      .addEventListener('click', this.#destinationNameToggleHandler);
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventEditView.parseStateToTask(this._state));
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    // this.updateElement({
    //   isDueDate: !this._state.isDueDate,
    // });
  };

  #destinationNameToggleHandler = (evt) => {
    evt.preventDefault();
    // this.updateElement({
    //   isRepeating: !this._state.isRepeating,
    // });
  };

  static parseTaskToState = (event) => ({...event});

  static parseStateToTask = (state) => ({...state});
}
