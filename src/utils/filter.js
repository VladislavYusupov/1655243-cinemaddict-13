import {FilterType} from "../const";

export const filter = {
  [FilterType.NONE]: (films) => films,
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.watchList === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.alreadyWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.favorite === true)
};
