const { getRandomInteger } = require("../helpers/mockGenerateHelper");

const generateMessage = () => {
  const messages = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `Not so bad`,
  ];

  return messages[getRandomInteger(0, messages.length - 1)];
};

const generateEmoji = () => {
  const emojis = [`smile`, `sleeping`, `puke`, `angry`];

  return emojis[getRandomInteger(0, emojis.length - 1)];
};

const generateAuthor = () => {
  const authors = [
    `John Doe`,
    `Doe John`,
    `John John`,
    `Doe Doe`,
    `John John Doe`,
  ];

  return authors[getRandomInteger(0, authors.length - 1)];
};

const generateDate = () => {
  const dates = [
    `2014/12/31 23:59`,
    `2011/05/03 08:15`,
    `2005/04/20 16:34`,
    `2020/09/29 22:09`,
    `2000/01/01 00:01`,
  ];

  return authors[getRandomInteger(0, dates.length - 1)];
};

export const generateComments = (minCommentCount, maxCommentCount) => {
  return new Array(getRandomInteger(minCommentCount, maxCommentCount))
    .fill()
    .map({
      message: generateMessage(),
      emoji: generateEmoji(),
      author: generateAuthor(),
      date: generateDate(),
    });
};
