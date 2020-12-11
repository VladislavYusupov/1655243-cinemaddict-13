import getRandomInteger from "./getRandomInteger";
import getArrayRandomElement from "./getArrayRandomElement";

const getArrayRandomElements = (arr, minElementsNumber, maxElementsNumber) => {
  const elementsNumber = getRandomInteger(minElementsNumber, maxElementsNumber);
  const newArray = [];

  for (let i = 0; i < elementsNumber; i++) {
    let randomElement = getArrayRandomElement(arr);
    newArray.push(randomElement);
  }

  return newArray;
};

export default getArrayRandomElements;
