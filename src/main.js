import TripInfoView from './view/trip-info-view.js';
import {render} from './framework/render.js';
import {RenderPosition} from './framework/render.js';
import BoardPresenter from './presenter/event-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');
const newEventButtonComponent = document.querySelector('.trip-main__event-add-btn');

const offersModel = new OffersModel().offers;
const destinationsModel = new DestinationsModel().destinations;
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteEvents, eventsModel, destinationsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilter, filterModel, eventsModel);

newEventButtonComponent.addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createEvent();
});

render(new TripInfoView(eventsModel.events), siteHeader, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();


