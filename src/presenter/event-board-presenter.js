import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import SortView from '../view/sort-view';
import {render} from '../render.js';


export default class BoardPresenter {
  eventsListComponent = new EventsListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);
    render(new EventEditView(), this.eventsListComponent.getElement());

    Array.from({ length: 3 }, () => render(new EventView(), this.eventsListComponent.getElement()));
  };
}
