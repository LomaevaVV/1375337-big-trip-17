import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import SortView from '../view/sort-view.js';
import NoEventsMsg from '../view/no-event-view.js';
import {render, replace} from '../framework/render.js';
import {isEscEvent} from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;

  #eventsListComponent = new EventsListView();

  #boardEvents = [];

  constructor(boardContainer, eventsModel) {
    this.#eventsModel = eventsModel;
    this.#boardContainer = boardContainer;
  }

  init = () => {
    this.#boardEvents = [...this.#eventsModel.events];

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
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);

    };

    const onEventEditKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEventEditKeydown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener('keydown', onEventEditKeydown);
    });

    eventEditComponent.setEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEventEditKeydown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEventEditKeydown);
    });

    render(eventComponent, this.#eventsListComponent.element);
  };
}
