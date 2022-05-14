import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import {RenderPosition} from './framework/render.js';
import BoardPresenter from './presenter/event-board-presenter.js';
import EventsModel from './model/events-model.js';
import {generateFilter} from './mock/filter.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const boardPresenter = new BoardPresenter(siteEvents, eventsModel);
const filters = generateFilter(eventsModel.events);
window.console.log(filters);

render(new TripInfoView(), siteHeader, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), siteFilter);
boardPresenter.init();
