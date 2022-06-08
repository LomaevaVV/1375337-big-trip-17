import {getOffersCatalog} from '../mock/offers.js';

export default class OffersModel {
  #offers = getOffersCatalog();

  get offers () {
    return this.#offers;
  }
}
