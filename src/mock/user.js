import generateTitle from "./title";
import getRandomPositiveInt from "../helpers/getRandomPositiveInt";

const USER_RANKS = new Map([
  [21, `movie buff`],
  [11, `fan`],
  [1, `novice`],
  [0, false],
]);

const MAX_TITLES_COUNT = 30;

const getRank = (watchedFilmsCount) => {
  let userRank;

  for (let [filmsCount, rank] of USER_RANKS) {
    if (watchedFilmsCount >= filmsCount) {
      userRank = rank;
      break;
    }
  }

  return userRank;
};

const generateTitles = () => {
  const randomTitles = [];
  const titlesCount = getRandomPositiveInt(MAX_TITLES_COUNT);

  for (let i = 0; i < titlesCount; i++) {
    randomTitles.push(generateTitle());
  }

  return randomTitles;
};

export const generateUser = () => {
  const history = generateTitles();

  return {
    allMovies: generateTitles(),
    watchList: generateTitles(),
    history,
    favorites: generateTitles(),
    rank: getRank(history.length),
  };
};