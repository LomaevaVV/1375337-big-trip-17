import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import SortView from '../view/sort-view';
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
    render(new SortView(), this.#boardContainer);
    render(this.#eventsListComponent, this.#boardContainer);

    this.#boardEvents.forEach((event) => this.#renderEvent(event));
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
