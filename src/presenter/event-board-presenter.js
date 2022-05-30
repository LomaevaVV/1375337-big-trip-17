import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-event-view.js';
import {render} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';
import {SORT_TYPES} from '../constants.js';
import {getSortedEvents, getSortedEventsbyDate} from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsCatalog = null;
  #offersCatalog = null;
  #currentSortType = SORT_TYPES.DAY;

  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  #boardEvents = [];
  #sourcedBoardEvents = [];
  #eventPresenter = new Map();

  constructor(boardContainer, eventsModel, destinationsCatalog, offersCatalog) {
    this.#eventsModel = eventsModel;
    this.#boardContainer = boardContainer;
    this.#destinationsCatalog = destinationsCatalog;
    this.#offersCatalog = offersCatalog;
  }

  init = () => {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#boardEvents = getSortedEventsbyDate(this.#boardEvents);

    this.#sourcedBoardEvents = [...this.#boardEvents];

    this.#renderEventBoard();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);
    this.#sourcedBoardEvents = updateItem(this.#sourcedBoardEvents, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents = (sortType) => {
    if (sortType === SORT_TYPES.DAY) {
      this.#boardEvents = [...this.#sourcedBoardEvents];
    } else {
      this.#boardEvents = getSortedEvents(sortType, this.#boardEvents);
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEventBoard();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleEventChange, this.#handleModeChange, this.#destinationsCatalog, this.#offersCatalog);
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
