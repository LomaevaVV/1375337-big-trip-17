import {getRandomNumber, getRandomArrayElement, getShuffleArraySlice} from '../utils/common.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {POINT_TYPES} from '../constants.js';
import {humanizeEventDate} from '../utils/event.js';

const PRICE_MIN = 100;
const PRICE_MAX = 1500;

export const generateEvent = (destinationsСatalog, offersСatalog) => {
  const type = getRandomArrayElement(POINT_TYPES);
  const timeHourFrom = (dayjs('2022-04-25T11:22:13').add(getRandomNumber(1,100000), 'minute')).toString();
  const timeHourTo = dayjs(timeHourFrom).add(getRandomNumber(30, 2000), 'minute')
  const AvailableOffers = offersСatalog.find(
    (offer) => offer.type === type
  );

  const selectedOffers = AvailableOffers?
    getShuffleArraySlice(AvailableOffers.offers)
    : [];

  const selectedoffers = [];
  selectedOffers.forEach((offer) => selectedoffers.push(offer.id));

  return ({
    basePrice: getRandomNumber(PRICE_MIN, PRICE_MAX),
    dateFrom: `${humanizeEventDate(timeHourFrom,'YYYY-MM-DD[T]HH:mm:ss[.375Z]')}`,
    dateTo: `${humanizeEventDate(timeHourTo,'YYYY-MM-DD[T]HH:mm:ss[.375Z]')}`,
    destination: getRandomArrayElement(destinationsСatalog),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: selectedoffers,
    type: type,
  });
};
