import {getRandomNumber} from '../utils/common.js';

const OFFER_PRICE_MIN = 10;
const OFFER_PRICE_MAX = 200;

export const offersСatalog = [
  {
    type: 'Flight',
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
    type: 'Taxi',
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
    type: 'Bus',
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
    type: 'Train',
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
    type: 'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Сhoose the best table',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }
    ]
  },
  {
    type: 'Check-in',
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
    type: 'Drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: getRandomNumber(OFFER_PRICE_MIN,OFFER_PRICE_MAX),
      }
    ]
  }
];

