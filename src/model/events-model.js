import {generateEvent} from '../fish/event.js';

export default class EventsModel {
  events = Array.from({length: 20}, generateEvent);

  getEvents = () => this.events;
}
