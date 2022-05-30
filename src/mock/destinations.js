import {getRandomNumber, getRandomArrayElement, getShuffleArraySlice} from '../utils/common.js';

const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.','Fusce tristique felis at fermentum pharetra.','Aliquam id orci ut lectus varius viverra.','Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.','Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.','Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.','Sed sed nisi sed augue convallis suscipit in sed felis.','Aliquam erat volutpat.','Nunc fermentum tortor ac porta dapibus.','In rutrum ac purus sit amet tempus.'];
const PICTURE_ID_MIN = 1;
const PICTURE_ID_MAX = 5;

export const destinationsСatalog = [
  {
    name: 'Chamonix',
    description: getShuffleArraySlice(DESCRIPTION),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN, PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN, PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN, PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      }
    ]
  },
  {
    name: 'Amsterdam',
    description: getShuffleArraySlice(DESCRIPTION),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN,PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      }
    ]
  },
  {
    name: 'Geneva',
    description: getShuffleArraySlice(DESCRIPTION),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN,PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(PICTURE_ID_MIN,PICTURE_ID_MAX)}`,
        description: getRandomArrayElement(DESCRIPTION),
      }
    ]
  }
];
