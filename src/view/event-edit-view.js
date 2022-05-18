import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDate} from '../utils/event.js';
import {offersСatalog} from '../mock/offers.js';

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

const createDestinationsTemplate = (destination) => {
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

  const offersTemplate = createOffersTemplate(availableOffers, offers);
  const destinationsTemplate = createDestinationsTemplate(destination);

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
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
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
          ${destinationsTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class EventEditView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventEditTemplate(this.#event);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#event);
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
