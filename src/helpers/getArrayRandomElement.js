import getRandomPositiveInt from "./getRandomPositiveInt";

const getArrayRandomElement = (arr) => arr[getRandomPositiveInt(arr.length - 1)];

export default getArrayRandomElement;
