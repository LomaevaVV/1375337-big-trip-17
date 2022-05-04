import {getRandomNumber} from '../utils.js';

const OFFER_PRICE_MIN = 10;
const OFFER_PRICE_MAX = 200;

export const offersСatalog = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }, {
        id: 2,
        title: 'Add luggage',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }, {
        id: 3,
        title: 'Switch to comfort',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
    ],
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Choose the radio station',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
      {
        id: 2,
        title: 'Order Uber',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
      {
        id: 3,
        title: 'Meet at the gate',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Choose a seat',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
      {
        id: 2,
        title: 'Add food',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Add food',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
      {
        id: 2,
        title: 'Add towel',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Сhoose the best table',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      },
      {
        id: 2,
        title: 'Add see-view',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }
    ]
  }
];

