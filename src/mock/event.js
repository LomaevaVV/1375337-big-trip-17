import {getRandomNumber, getRandomArrayElement, getShuffleArraySlice} from '../utils/common.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {offersСatalog} from './offers.js';
import {POINT_TYPES} from '../constants.js';

const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.','Fusce tristique felis at fermentum pharetra.','Aliquam id orci ut lectus varius viverra.','Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.','Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.','Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.','Sed sed nisi sed augue convallis suscipit in sed felis.','Aliquam erat volutpat.','Nunc fermentum tortor ac porta dapibus.','In rutrum ac purus sit amet tempus.'];
const DESTINATION_NAME =['Chamonix','Amsterdam','Geneva'];
const PICTURE_ID_MIN = 1;
const PICTURE_ID_MAX = 5;
const PRICE_MIN = 100;
const PRICE_MAX = 1500;

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
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: selectedOffers,
    type: type,
  });
};
