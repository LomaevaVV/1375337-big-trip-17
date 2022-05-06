import dayjs from 'dayjs';

const ESC_ALL_BROWSERS = 'Escape';
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const WORD_FORMS = {
  days: [' день', ' дня', ' дней'],
  hours: [' час', ' часа', ' часов'],
  minutes: [' минута', ' минуты', ' минут'],
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

const getDeclination = (num, word) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return num + word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
};

export const calculateDateDif = (dateFrom, dateTo) => {
  const daysNum = dayjs(dateTo).diff(dateFrom, 'day');
  const hoursNum = dayjs(dateTo).diff(dateFrom, 'hour') - daysNum * HOURS_IN_DAY;
  const minutesNum = dayjs(dateTo).diff(dateFrom, 'minute') - hoursNum * MINUTES_IN_HOUR - daysNum * MINUTES_IN_DAY;
  const days = getDeclination(daysNum, WORD_FORMS.days);
  const hours = getDeclination(hoursNum, WORD_FORMS.hours);
  const minutes = getDeclination(minutesNum, WORD_FORMS.minutes);

  let dateDif = `${days}`;

  if (hoursNum > 0) {
    dateDif = `${hours}, ${minutes}`;
  }

  if (daysNum > 0) {
    dateDif = `${days}, ${hours}, ${minutes}`;
  }

  return (dateDif);
};
