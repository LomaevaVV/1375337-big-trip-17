import {render, RenderPosition, remove} from '../framework/render.js';

import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-event-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';

import {USER_ACTION, UPDATE_TYPE, FILTER_TYPES, SORT_TYPES} from '../constants.js';
import {getSortedEvents, getSortedEventsbyDate} from '../utils/sort.js';
import {filter} from '../utils/filter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #tripContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;

  #newEventButtonComponent = new NewEventButtonView();
  #eventsListComponent = new EventsListView();
  #noEventsComponent = null;
  #sortComponent = null;
  #eventNewPresenter = null;
  #tripInfoPresenter = null;

  #eventPresenter = new Map();

  constructor(tripContainer, boardContainer, eventsModel, destinationsModel, offersModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.destinationsCatalog, this.offersCatalog);
    this.#tripInfoPresenter = new TripInfoPresenter(this.#tripContainer, this.#eventsModel, this.offersCatalog);

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SORT_TYPES.DAY:
        return getSortedEventsbyDate(filteredEvents);
      case SORT_TYPES.PRICE:
        return getSortedEvents(SORT_TYPES.PRICE, filteredEvents);
      case SORT_TYPES.TIME:
        return getSortedEvents(SORT_TYPES.TIME, filteredEvents);
    }

    return filteredEvents;
  }

  get offersCatalog() {
    const offersCatalog = this.#offersModel.offers;
    return offersCatalog;
  }

  get destinationsCatalog() {
    const destinationsCatalog = this.#destinationsModel.destinations;
    return destinationsCatalog;
  }

  init = () => {
    render(this.#newEventButtonComponent, this.#tripContainer);
    this.#newEventButtonComponent.setClickHandler(this.#handleNewEventButtonClick);
    this.#renderEventBoard();
  };

  #createEvent = (callback) => {
    this.#currentSortType = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleNewEventButtonClick = () => {
    this.#createEvent(this.#handleNewEventFormClose);
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatedEvent) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, updatedEvent);
        break;
      case USER_ACTION.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, updatedEvent);
        break;
      case USER_ACTION.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, updatedEvent);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    const resetSortType = data ? !data.id : false; //сбрасываем сортировку при смене фильтра
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        // - обновить только точку маршрута
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        // - обновить только список ивентов со сбросом сортировки при переключении фильтра
        this.#clearEventsList(resetSortType);
        this.#renderEventsList();
        break;
      case UPDATE_TYPE.MAJOR:
        // - обновить всю доску при изменении названий точек, типа, цены или дат. так как влияют на сортировку и трип-инфо
        this.#clearEventBoard();
        this.#renderEventBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventBoard();
    this.#renderEventBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoEvents = () => {
    this.#noEventsComponent = new NoEventsView(this.#filterType);
    render(this.#noEventsComponent, this.#boardContainer);
  };

  #renderTripInfo = () => this.events.length !== 0 ? this.#tripInfoPresenter.init() : null ;
  #renderEvent = (event)  => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange, this.destinationsCatalog, this.offersCatalog);

    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #clearEventsList = (resetSortType) => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  };

  #clearEventBoard = () => {
    this.#eventNewPresenter.destroy();
    this.#clearEventsList();
  };

  #renderEventsList = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderSort();
      render(this.#eventsListComponent, this.#boardContainer);
      this.events.forEach(this.#renderEvent);
    }
  };

  #renderEventBoard = () => {
    this.#renderTripInfo();
    this.#renderEventsList();
  };
}
