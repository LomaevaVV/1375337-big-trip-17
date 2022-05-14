const ESC_ALL_BROWSERS = 'Escape';

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
