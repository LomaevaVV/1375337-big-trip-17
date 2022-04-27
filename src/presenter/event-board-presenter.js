import EventListView from '../view/event-list-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import SortView from '../view/sort-view';


import {render} from '../render.js';

export default class BoardPresenter {
  eventListComponent = new EventListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  };
}
