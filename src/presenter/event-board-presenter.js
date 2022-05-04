import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import SortView from '../view/sort-view';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();

  init = (boardContainer, eventsModel) => {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
    this.boardEvents = [...this.eventsModel.getEvents()];

    render(new SortView(), this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);
    render(new EventEditView(this.boardEvents[0]), this.eventsListComponent.getElement());

    for (let i = 1; i < this.boardEvents.length; i++) {
      render(new EventView(this.boardEvents[i]), this.eventsListComponent.getElement());
    }
    // Array.from({ length: this.boardEvents.length}, () => render(new EventView(this.boardEvents), this.eventsListComponent.getElement()));
  };
}
