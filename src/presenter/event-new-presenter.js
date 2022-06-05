import {remove, render, RenderPosition} from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import {nanoid} from 'nanoid';
import {USER_ACTION, UPDATE_TYPE} from '../constants.js';

export default class EventNewPresenter {
  #EventListContainer = null;
  #changeData = null;
  #eventEditComponent = null;
  #destroyCallback = null;
  #destinationsCatalog = null;
  #offersCatalog = null;

  constructor(EventListContainer, changeData, destinationsCatalog, offersCatalog) {
    this.#EventListContainer = EventListContainer;
    this.#changeData = changeData;
    this.#destinationsCatalog = destinationsCatalog;
    this.#offersCatalog = offersCatalog;
  }

  init = () => {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView(this.#destinationsCatalog, this.#offersCatalog);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#eventEditComponent, this.#EventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (event) => {
    this.#changeData(
      USER_ACTION.ADD_EVENT,
      UPDATE_TYPE.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
