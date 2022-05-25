import {getRandomNumber, getRandomArrayElement, getShuffleArraySlice} from '../utils/common.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {offersСatalog} from './offers.js';
import {POINT_TYPES} from '../constants.js';
import {destinationsСatalog} from './destinations.js';

const PRICE_MIN = 100;
const PRICE_MAX = 1500;

export const generateEvent = () => {
  const type = getRandomArrayElement(POINT_TYPES);
  const timeHourFrom = (dayjs('2022-04-25T11:22:13').add(getRandomNumber(1,100000), 'minute')).toString();

  const AvailableOffers = offersСatalog.find(
    (offer) => offer.type === type
  );

  const selectedOffers = AvailableOffers?
    getShuffleArraySlice(AvailableOffers.offers)
    : [];

  return ({
    basePrice: getRandomNumber(PRICE_MIN, PRICE_MAX),
    dateFrom: timeHourFrom,
    dateTo: dayjs(timeHourFrom).add(getRandomNumber(30, 2000), 'minute'),
    destination: getRandomArrayElement(destinationsСatalog),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: selectedOffers,
    type: type,
  });
};
