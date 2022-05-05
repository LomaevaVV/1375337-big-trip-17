import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import {RenderPosition} from './render.js';
import BoardPresenter from './presenter/event-board-presenter.js';
import EventsModel from './model/events-model.js';

const siteHeader = document.querySelector('.trip-main');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const boardPresenter = new BoardPresenter();

render(new TripInfoView(), siteHeader, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilter);
boardPresenter.init(siteEvents, eventsModel);
