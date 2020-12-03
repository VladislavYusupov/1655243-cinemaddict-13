import { getRandomInteger } from "../helpers/mockGenerateHelper";
import { generateComments } from "./comment";

const MAX_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;
const MAX_RATING = 10;

const generateTitle = () => {
  const titles = [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generatePoster = (title) => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
  ];

  return posters.find((poster) =>
    poster.startsWith(title.toLowerCase().replaceAll(` `, `-`))
  );
};

const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const sentencesNumber = getRandomInteger(1, 5);
  let description = ``;
  const space = ` `;

  for (let i = 0; i < sentencesNumber; i++) {
    let sentenceNumber = getRandomInteger(0, sentences.length - 1);
    description += sentences[sentenceNumber];

    if (i !== sentencesNumber) {
      description += space;
    }
  }

  return description;
};

const generateRating = () => {
  return (Math.random() * MAX_RATING).toFixed(1);
};

export const generateFilm = () => {
  const title = generateTitle();

  return {
    title: title,
    poster: generatePoster(title),
    description: generateDescription(),
    rating: generateRating(),
    comments: generateComments(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
  };
};
