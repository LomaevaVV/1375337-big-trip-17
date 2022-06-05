import {getDestinationsСatalog} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = getDestinationsСatalog();

  get destinations () {
    return this.#destinations;
  }
}
