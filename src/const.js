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
  INIT: `init`,
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

export const USER_RANKS = {
  21: `movie buff`,
  11: `fan`,
  1: `novice`,
  0: false,
};

export const FILM_RELEASE_DATE_FORMAT = `D MMMM YYYY`;
export const FILM_RUNTIME_FORMAT = `H[h] m[m]`;
