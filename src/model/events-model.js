import Observable from '../framework/observable.js';
import {generateEvent} from '../mock/event.js';

export default class EventsModel extends Observable{
  #events = Array.from({length: 20}, generateEvent);

  get events () {
    return this.#events;
  }

  updateEvent = (updateType, updatedEvent) => {
    const updatedEventIndex = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (updatedEventIndex === -1) {
      throw new Error(`Can't update unexisting event, updatedEvent: ${updatedEvent}`);
    }

    this.#events = [
      ...this.#events.slice(0, updatedEventIndex),
      updatedEvent,
      ...this.#events.slice(updatedEventIndex + 1),
    ];

    this._notify(updateType, updatedEvent);
  };

  addEvent = (updateType, updatedEvent) => {
    this.#events = [
      updatedEvent,
      ...this.#events,
    ];

    this._notify(updateType, updatedEvent);
  };

  deleteEvent = (updateType, eventToDelete) => {
    this.#events = this.#events.filter((event) => event.id !== eventToDelete.id);

    this._notify(updateType);
  };
}
