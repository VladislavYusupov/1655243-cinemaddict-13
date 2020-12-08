import getRandomInteger from "../helpers/getRandomInteger";
import getArrayRandomElement from "../helpers/getArrayRandomElement";

const messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Not so bad`,
];

const emojis = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const authors = [
  `John Doe`,
  `Doe John`,
  `John John`,
  `Doe Doe`,
  `John John Doe`,
];

const dates = [
  `2014/12/31 23:59`,
  `2011/05/03 08:15`,
  `2005/04/20 16:34`,
  `2020/09/29 22:09`,
  `2000/01/01 00:01`,
];

const generateComments = (minCommentCount, maxCommentCount) => {
  return new Array(getRandomInteger(minCommentCount, maxCommentCount))
    .fill()
    .map(() => {
      return {
        message: getArrayRandomElement(messages),
        emoji: getArrayRandomElement(emojis),
        author: getArrayRandomElement(authors),
        date: getArrayRandomElement(dates),
      };
    });
};

export default generateComments;
