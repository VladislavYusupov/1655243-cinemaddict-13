import {USER_RANKS} from "./const";

const getUserRank = (films) => {
  const filmsFromHistoryCount = films.filter((film) => film.inWatchedCollection === true).length;

  const key = Object.keys(USER_RANKS)
    .sort((a, b) => b - a)
    .find((neededFilmsCount) => filmsFromHistoryCount >= neededFilmsCount);

  return USER_RANKS[key];
};

export default getUserRank;
