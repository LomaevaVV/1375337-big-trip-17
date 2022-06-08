import BoardPresenter from './presenter/event-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteHeader, siteEvents, eventsModel, destinationsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilter, filterModel, eventsModel);

filterPresenter.init();
boardPresenter.init();


