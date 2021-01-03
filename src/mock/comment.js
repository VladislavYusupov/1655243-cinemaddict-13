import getRandomInteger from "../helpers/getRandomInteger";
import getArrayRandomElement from "../helpers/getArrayRandomElement";
import getRandomDate from "../helpers/getRandomDate";
import {nanoid} from "nanoid";

const MIN_COMMENT_YEAR = 1950;

const MESSAGES = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Not so bad`,
];

const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const AUTHORS = [
  `John Doe`,
  `Doe John`,
  `John John`,
  `Doe Doe`,
  `John John Doe`,
];

const generateComments = (minCommentCount, maxCommentCount) => {
  return new Array(getRandomInteger(minCommentCount, maxCommentCount))
    .fill({})
    .map(() => {
      return {
        id: nanoid(),
        message: getArrayRandomElement(MESSAGES),
        emoji: getArrayRandomElement(EMOJIS),
        author: getArrayRandomElement(AUTHORS),
        date: getRandomDate(MIN_COMMENT_YEAR),
      };
    });
};

export default generateComments;
