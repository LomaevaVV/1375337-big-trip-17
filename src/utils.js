import dayjs from 'dayjs';

const ESC_ALL_BROWSERS = 'Escape';
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const DATE_WORD = {
  days: 'D',
  hours: 'H',
  minutes: 'M',
};

export const isEscEvent = (evt) => evt.key === ESC_ALL_BROWSERS;

export const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * ((max + 1) - min) + min;

    return Math.floor(randomNumber);
  }
  throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

export const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getShuffleArraySlice = (arrayInput) => {
  const arrayLength = getRandomNumber(0, arrayInput.length);
  const arrayOutput = shuffle(arrayInput);

  return arrayOutput.slice(arrayLength);
};

export const humanizeEventDate = (date, format) => dayjs(date).format(format);

export const calculateDateDif = (dateFrom, dateTo) => {
  const days = dayjs(dateTo).diff(dateFrom, 'day');
  const hours = dayjs(dateTo).diff(dateFrom, 'hour') - days * HOURS_IN_DAY;
  const minutes = dayjs(dateTo).diff(dateFrom, 'minute') - hours * MINUTES_IN_HOUR - days * MINUTES_IN_DAY;

  let dateDif = `${minutes + DATE_WORD.minutes}`;

  if (hours > 0) {
    dateDif = `${hours + DATE_WORD.hours} ${minutes + DATE_WORD.minutes}`;
  }

  if (days > 0) {
    dateDif = `${days + DATE_WORD.days} ${hours + DATE_WORD.hours} ${minutes + DATE_WORD.minutes}`;
  }

  return dateDif;
};
