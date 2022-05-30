import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import {RenderPosition} from './framework/render.js';
import BoardPresenter from './presenter/event-board-presenter.js';
import EventsModel from './model/events-model.js';
import {generateFilter} from './mock/filter.js';
import {offersСatalog} from './mock/offers.js';
import {destinationsСatalog} from './mock/destinations.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel(destinationsСatalog, offersСatalog);
const boardPresenter = new BoardPresenter(siteEvents, eventsModel, destinationsСatalog, offersСatalog);
const filters = generateFilter(eventsModel.events);

render(new TripInfoView(), siteHeader, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), siteFilter);
boardPresenter.init();
