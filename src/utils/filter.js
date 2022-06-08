import {FILTER_TYPES} from '../constants.js';
import {isEventInFuture, isEventInPast} from './event.js';

export const filter = {
  [FILTER_TYPES.EVERYTHING]: (events) => events,
  [FILTER_TYPES.FUTURE]: (events) => events.filter((event) => isEventInFuture(event.dateTo)),
  [FILTER_TYPES.PAST]: (events) => events.filter((event) => isEventInPast(event.dateFrom))
};
