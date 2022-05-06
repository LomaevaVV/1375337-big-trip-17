import {generateEvent} from '../mock/event.js';

export default class EventsModel {
  #events = Array.from({length: 20}, generateEvent);

  get events () {
    return this.#events;
  }
}
