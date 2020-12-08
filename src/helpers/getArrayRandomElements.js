import getRandomInteger from "./getRandomInteger";
import getRandomPositiveInt from "./getRandomPositiveInt";

const getArrayRandomElements = (arr, minElementsNumber, maxElementsNumber) => {
  const elementsNumber = getRandomInteger(minElementsNumber, maxElementsNumber);
  const newArray = [];

  for (let i = 0; i < elementsNumber; i++) {
    let elementNumber = getRandomPositiveInt(arr.length - 1);
    newArray.push(arr[elementNumber]);
  }

  return newArray;
};

export default getArrayRandomElements;
