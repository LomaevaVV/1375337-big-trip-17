import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-event-view.js';
import {render} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;

  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  #boardEvents = [];
  #eventPresenter = new Map();

  constructor(boardContainer, eventsModel) {
    this.#eventsModel = eventsModel;
    this.#boardContainer = boardContainer;
  }

  init = () => {
    this.#boardEvents = [...this.#eventsModel.events];

    this.#renderEventBoard();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
  };

  #renderNoEvents = () => {
    render(this.#noEventsComponent, this.#boardContainer);
  };

  #renderEventsList = () => {
    render(this.#eventsListComponent, this.#boardContainer);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderEvent = (event)  => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderEventBoard = () => {
    if (this.#boardEvents.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderSort();
      this.#renderEventsList();
      this.#boardEvents.forEach(this.#renderEvent);
    }
  };
}
