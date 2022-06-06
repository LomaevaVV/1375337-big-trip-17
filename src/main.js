import BoardPresenter from './presenter/event-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

import TripInfoPresenter from './presenter/trip-info-presenter.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const offersModel = new OffersModel().offers;
const destinationsModel = new DestinationsModel().destinations;
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteHeader, siteEvents, eventsModel, destinationsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilter, filterModel, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(siteHeader, eventsModel);

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();


