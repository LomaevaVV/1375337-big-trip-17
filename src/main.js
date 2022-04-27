import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import {RenderPosition} from './render.js';
import BoardPresenter from './presenter/event-board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement, RenderPosition.AFTERBEGIN);
boardPresenter.init(siteEventsElement);
