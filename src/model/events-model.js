import {generateEvent} from '../mock/event.js';

export default class EventsModel {
  #destinations = null;
  #offers = null;

  constructor(destinationsСatalog, offersСatalog) {
    this.#offers = offersСatalog;
    this.#destinations = destinationsСatalog;
  }

  #events = () => Array.from({length: 20}, () => generateEvent(this.#destinations, this.#offers));

  get events () {
    return this.#events();
  }
}
