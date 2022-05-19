import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {isEscEvent} from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  constructor(eventsListContainer, changeData, changeMode)  {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EventEditView(event);


    this.#eventComponent.setFavoriteClickHandler(() => {
      this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
    });

    this.#eventComponent.setEditClickHandler(() => {
      this.#replaceEventToForm();
      document.addEventListener('keydown',  this.#onEventEditKeydown);
    });

    this.#eventEditComponent.setEditClickHandler(() => {
      this.#replaceFormToEvent();
      document.removeEventListener('keydown',  this.#onEventEditKeydown);
    });

    this.#eventEditComponent.setFormSubmitHandler((updatedEvent) => {
      this.#changeData(updatedEvent);
      this.#replaceFormToEvent();
      document.removeEventListener('keydown',  this.#onEventEditKeydown);
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  };

  #replaceEventToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #onEventEditKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#onEventEditKeydown);
    }
  };
}
