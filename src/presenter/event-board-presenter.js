import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import SortView from '../view/sort-view.js';
import NoEventsMsg from '../view/no-event-view.js';
import {render} from '../render.js';
import {isEscEvent} from '../utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;

  #eventsListComponent = new EventsListView();

  #boardEvents = [];

  init = (boardContainer, eventsModel) => {
    this.#eventsModel = eventsModel;
    this.#boardEvents = [...this.#eventsModel.events];
    this.#boardContainer = boardContainer;

    this.#renderEventBoard();
  };

  #renderEventBoard = () => {
    if (this.#boardEvents.length === 0) {
      render(new NoEventsMsg(), this.#boardContainer);
    } else {
      render(new SortView(), this.#boardContainer);
      render(this.#eventsListComponent, this.#boardContainer);
      this.#boardEvents.forEach(this.#renderEvent);
    }
  };

  #renderEvent = (event)  => {
    const eventComponent = new EventView(event);

    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      this.#eventsListComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#eventsListComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const onEventEditKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEventEditKeydown);
      }
    };

    const onEventEditClick = (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEventEditKeydown);
    };

    const onEventEditSubmit = (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEventEditKeydown);
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', onEventEditKeydown);
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onEventEditClick);

    eventEditComponent.element.querySelector('form').addEventListener('submit', onEventEditSubmit);

    render(eventComponent, this.#eventsListComponent.element);
  };
}
