import AbstractView from '../framework/view/abstract-view.js';

const createNoEventsMsg = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEventsMsg extends AbstractView {
  get template() {
    return createNoEventsMsg();
  }
}
