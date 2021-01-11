import {USER_RANKS} from "./const";
import {getWatchedFilms} from "./utils/film";

const getUserRank = (films) => {
  const watchedFilmsCount = getWatchedFilms(films).length;

  const key = Object.keys(USER_RANKS)
    .sort((a, b) => b - a)
    .find((neededFilmsCount) => watchedFilmsCount >= neededFilmsCount);

  return USER_RANKS[key];
};

export default getUserRank;
