export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const FilterType = {
  NONE: ``,
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const UpdateType = {
  LOAD_FILMS: `loadFilms`,
  RERENDER_SINGLE_LIST_ITEM: `rerenderSingleListItem`,
  RERENDER_WITH_CURRENT_PRESENTER_SETTINGS: `rerenderWithCurrentPresenterSettings`,
  RERENDER_WITH_DEFAULT_PRESENTER_SETTINGS: `rerenderWithDefaultPresenterSettings`,
  RENDER_OTHER_PAGE: `renderOtherPage`,
};

export const StatisticsType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const MOVIE_BUFF_RANK_KEY = 21;
const FAN_RANK_KEY = 11;
const NOVICE_RANK_KEY = 1;
const EMPTY_RANK_KEY = 0;

export const USER_RANKS = {
  [MOVIE_BUFF_RANK_KEY]: `movie buff`,
  [FAN_RANK_KEY]: `fan`,
  [NOVICE_RANK_KEY]: `novice`,
  [EMPTY_RANK_KEY]: false,
};

export const FILM_RELEASE_DATE_FORMAT = `D MMMM YYYY`;
export const FILM_RUNTIME_FORMAT = `H[h] m[m]`;
