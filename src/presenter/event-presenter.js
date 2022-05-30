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
  #destinationsCatalog = null;
  #offersCatalog = null;

  #eventComponent = null;
  #eventEditComponent = null;


  #event = null;
  #mode = Mode.DEFAULT;

  constructor(eventsListContainer, changeData, changeMode, destinationsCatalog, offersCatalog) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinationsCatalog = destinationsCatalog;
    this.#offersCatalog = offersCatalog;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(event, this.#offersCatalog);
    this.#eventEditComponent = new EventEditView(this.#event, this.#destinationsCatalog, this.#offersCatalog);


    this.#eventComponent.setFavoriteClickHandler(() => {
      this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
    });

    this.#eventComponent.setEditClickHandler(() => {
      this.#replaceEventToForm();
      this.#eventEditComponent.reset(this.#event);
    });

    this.#eventEditComponent.setEditClickHandler(() => {
      this.#replaceFormToEvent();
    });

    this.#eventEditComponent.setFormSubmitHandler((updatedEvent) => {
      this.#changeData(updatedEvent);
      this.#replaceFormToEvent();
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
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  #replaceEventToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown',  this.#onEventEditKeydown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEventEditKeydown);
    this.#mode = Mode.DEFAULT;
  };

  #onEventEditKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };
}
