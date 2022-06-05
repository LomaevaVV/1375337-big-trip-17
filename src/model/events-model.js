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
      throw new Error('Can\'t update unexisting event');
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
    const eventToDeleteIndex = this.#events.findIndex((event) => event.id === eventToDelete.id);

    if (eventToDeleteIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, eventToDeleteIndex),
      ...this.#events.slice(eventToDeleteIndex + 1),
    ];

    this._notify(updateType);
  };
}
