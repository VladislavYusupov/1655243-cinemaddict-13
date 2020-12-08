import generateComments from "./comment";
import generateTitle from "./title";
import getRandomPositiveInt from "../helpers/getRandomPositiveInt";
import getArrayRandomElement from "../helpers/getArrayRandomElement";
import getArrayRandomElements from "../helpers/getArrayRandomElements";
import convertArrayToString from "../helpers/convertArrayToString";

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
const DESCRIPTION_MAX_LENGTH = 140;

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

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

const directors = [
  `Martin Scorsese`,
  `Christopher Nolan`,
  `Tim Berton`,
  `James Cameron`,
  `David Fincher`,
];

const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Woody Allen`,
  `Stanley Kubrick`,
  `Billy Wilder`,
  `Quentin Tarantino`,
  `Charlie Kaufman`,
];

const actors = [
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

const releaseDates = [
  `30 March 1945`,
  `2 January 2007`,
  `5 December 1998`,
  `10 August 2015`,
];

const runtimes = [
  `1h 18m`,
  `2h 3m`,
  `2h 30m`,
  `1h 50m`,
];

const countries = [
  `USA`,
  `Russia`,
  `Germany`,
  `Japan`,
  `China`,
];

const genres = [
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

const ages = [
  `18+`,
  `16+`,
  `12+`,
  `6+`,
];

const generatePoster = (title) => {
  return posters.find((poster) => poster.startsWith(title.toLowerCase().replaceAll(` `, `-`)));
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
  const description = convertArrayToString(getArrayRandomElements(sentences, MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT), SENTENCES_DELIMITER);

  return {
    title,
    titleOriginal: generateOriginalTitle(title),
    director: getArrayRandomElement(directors),
    writers: getArrayRandomElements(writers, MIN_WRITERS_COUNT, MAX_WRITERS_COUNT),
    actors: getArrayRandomElements(actors, MIN_ACTORS_COUNT, MAX_ACTORS_COUNT),
    releaseDate: getArrayRandomElement(releaseDates),
    runtime: getArrayRandomElement(runtimes),
    country: getArrayRandomElement(countries),
    genres: getArrayRandomElements(genres, MIN_GENRES_COUNT, MAX_GENRES_COUNT),
    age: getArrayRandomElement(ages),
    poster: generatePoster(title),
    description,
    shortDescription: trimDescription(description),
    rating: generateRating(),
    comments: generateComments(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
  };
};
