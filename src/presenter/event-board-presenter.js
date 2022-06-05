import {render, RenderPosition, remove} from '../framework/render.js';

import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-event-view.js';

import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';

import {USER_ACTION, UPDATE_TYPE, FILTER_TYPES, SORT_TYPES} from '../constants.js';
import {getSortedEvents, getSortedEventsbyDate} from '../utils/sort.js';
import {filter} from '../utils/filter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #destinationsCatalog = null;
  #offersCatalog = null;
  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;

  #eventsListComponent = new EventsListView();
  #noEventsComponent = null;
  #sortComponent = null;
  #eventNewPresenter = null;

  #eventPresenter = new Map();

  constructor(boardContainer, eventsModel, destinationsCatalog, offersCatalog, filterModel) {
    this.#eventsModel = eventsModel;
    this.#boardContainer = boardContainer;
    this.#destinationsCatalog = destinationsCatalog;
    this.#offersCatalog = offersCatalog;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#destinationsCatalog, this.#offersCatalog);

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

  init = () => {
    this.#renderEventBoard();
  };

  createEvent = () => {
    this.#eventNewPresenter.init();
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatedEvent) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearEventBoard();
        this.#renderEventBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
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

  #renderEvent = (event)  => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#destinationsCatalog, this.#offersCatalog);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #clearEventBoard = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  };

  #renderEventBoard = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderSort();
      render(this.#eventsListComponent, this.#boardContainer);
      this.events.forEach(this.#renderEvent);
    }
  };
}
