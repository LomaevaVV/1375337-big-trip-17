import {getRandomNumber, getRandomArrayElement, getShuffleArraySlice} from '../utils.js';
import dayjs from 'dayjs';
import {offersСatalog} from './offers.js';

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.','Fusce tristique felis at fermentum pharetra.','Aliquam id orci ut lectus varius viverra.','Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.','Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.','Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.','Sed sed nisi sed augue convallis suscipit in sed felis.','Aliquam erat volutpat.','Nunc fermentum tortor ac porta dapibus.','In rutrum ac purus sit amet tempus.'];
const DESTINATION_NAME =['Chamonix','Amsterdam','Geneva'];
const PICTURE_ID_MIN = 1;
const PICTURE_ID_MAX = 5;
const PRICE_MIN = 100;
const PRICE_MAX = 1500;
const IS_FAVORITE = [true, false];
const DATE_DIF = [30, 50, 70];

const generateDestination = () => ({
  description: getShuffleArraySlice(DESCRIPTION),
  destinationName: getRandomArrayElement(DESTINATION_NAME),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN,PICTURE_ID_MAX)}`,
      description: getRandomArrayElement(DESCRIPTION),
    }
  ]
});

const getDate = (dateMin, dateMax) => `0${getRandomNumber(dateMin,dateMax)}`.slice(-2);

export const generateEvent = () => {
  const type = getRandomArrayElement(POINT_TYPE);
  const timeHourFrom = `20${getDate(19,22)}-${getDate(1,12)}-${getDate(1,31)}T${getDate(0,23)}:${getDate(0,59)}:56.845Z`;


  const getAvailableOffers = offersСatalog.find(
    (offer) => offer.type === type
  );

  const getOffers = getAvailableOffers?
    getShuffleArraySlice(getAvailableOffers.offers)
    : [];

  return ({
    basePrice: getRandomNumber(PRICE_MIN, PRICE_MAX),
    dateFrom: timeHourFrom,
    dateTo: dayjs(timeHourFrom).add(getRandomArrayElement(DATE_DIF), 'minute'),
    destination: generateDestination(),
    id: '',
    isFavorite: getRandomArrayElement(IS_FAVORITE),
    offers: getOffers,
    type: type,
  });
};
