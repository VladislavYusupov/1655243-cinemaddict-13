import {nanoid} from "nanoid";
import generateComments from "./comment";
import generateTitle from "./title";
import getRandomPositiveInt from "../helpers/getRandomPositiveInt";
import getArrayRandomElement from "../helpers/getArrayRandomElement";
import getArrayRandomElements from "../helpers/getArrayRandomElements";
import getRandomBoolean from "../helpers/getRandomBoolean";
import convertArrayToString from "../helpers/convertArrayToString";
import getRandomDate from "../helpers/getRandomDate";
import getRandomInteger from "../helpers/getRandomInteger";

const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 5;
const MIN_SENTENCES_COUNT = 1;
const MAX_SENTENCES_COUNT = 5;
const SENTENCES_DELIMITER = ` `;
const MIN_WRITERS_COUNT = 1;
const MAX_WRITERS_COUNT = 5;
const MIN_ACTORS_COUNT = 1;
const MAX_ACTORS_COUNT = 5;
const MIN_GENRES_COUNT = 1;
const MAX_GENRES_COUNT = 3;
const FRACTIONAL_CHARACTERS_NUMBER_IN_RATING = 1;
const MAX_RATING = 10;
const MIN_RELEASE_YEAR = 1950;
const DESCRIPTION_MAX_LENGTH = 140;
const MIN_RUNTIME = 10;
const MAX_RUNTIME = 200;

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const SENTENCES = [
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

const DIRECTORS = [
  `Martin Scorsese`,
  `Christopher Nolan`,
  `Tim Berton`,
  `James Cameron`,
  `David Fincher`,
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Woody Allen`,
  `Stanley Kubrick`,
  `Billy Wilder`,
  `Quentin Tarantino`,
  `Charlie Kaufman`,
];

const ACTORS = [
  `Tom Hanks`,
  `Leonardo DiCaprio`,
  `Samuel L.Jackson`,
  `Denzel Washington`,
  `Johny Depp`,
  `Al Pacino`,
  `Tom Cruise`,
  `Hellen Mirren`,
  `Nicole Kidman`,
];

const COUNTRIES = [
  `USA`,
  `Russia`,
  `Germany`,
  `Japan`,
  `China`,
];

const GENRES = [
  `Horror`,
  `Action`,
  `Romance`,
  `Western`,
  `Thriller`,
  `Documentary`,
  `Drama`,
  `Film-Noir`,
  `Mystery`,
];

const AGES = [
  `18+`,
  `16+`,
  `12+`,
  `6+`,
];

const generatePoster = (title) => {
  return POSTERS.find((poster) => poster.startsWith(title.toLowerCase().replaceAll(` `, `-`)));
};

const generateRating = () => {
  return getRandomPositiveInt(MAX_RATING).toFixed(FRACTIONAL_CHARACTERS_NUMBER_IN_RATING);
};

const generateOriginalTitle = (title) => `Original: ${title}`;

const trimDescription = (description) => {
  return description.length > DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, DESCRIPTION_MAX_LENGTH - 1)}...`
    : description;
};

export const generateFilm = () => {
  const title = generateTitle();
  const description = convertArrayToString(getArrayRandomElements(SENTENCES, MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT), SENTENCES_DELIMITER);

  return {
    id: nanoid(),
    title,
    titleOriginal: generateOriginalTitle(title),
    director: getArrayRandomElement(DIRECTORS),
    writers: getArrayRandomElements(WRITERS, MIN_WRITERS_COUNT, MAX_WRITERS_COUNT),
    actors: getArrayRandomElements(ACTORS, MIN_ACTORS_COUNT, MAX_ACTORS_COUNT),
    releaseDate: getRandomDate(MIN_RELEASE_YEAR),
    runtime: getRandomInteger(MIN_RUNTIME, MAX_RUNTIME),
    country: getArrayRandomElement(COUNTRIES),
    genres: getArrayRandomElements(GENRES, MIN_GENRES_COUNT, MAX_GENRES_COUNT),
    age: getArrayRandomElement(AGES),
    poster: generatePoster(title),
    description,
    shortDescription: trimDescription(description),
    rating: generateRating(),
    comments: generateComments(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
    inWatchListCollection: getRandomBoolean(),
    inWatchedCollection: getRandomBoolean(),
    inFavoriteCollection: getRandomBoolean(),
    watchingDate: getRandomDate(MIN_RELEASE_YEAR),
  };
};
