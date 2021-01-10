import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.inWatchListCollection === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.inWatchedCollection === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.inFavoriteCollection === true)
};
