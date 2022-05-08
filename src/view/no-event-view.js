import {createElement} from '../render.js';

const createNoEventsMsg = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);


export default class NoEventsMsg {
  #element = null;

  get template() {
    return createNoEventsMsg();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
