import {StatisticsType} from "../const";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);

export const getSortedFilmsByGenres = (films) => {
  const filmCountByGenres = {};

  films.forEach((film) =>
    film.genres.forEach((genre) => {
      if (genre in filmCountByGenres) {
        filmCountByGenres[genre] += 1;
      } else {
        filmCountByGenres[genre] = 1;
      }
    })
  );

  const sortedFilmsByGenres = Object.fromEntries(
      Object
        .entries(filmCountByGenres)
        .sort(([, a], [, b]) => b - a)
  );

  return sortedFilmsByGenres;
};

const getTopGenre = (films) => {
  const sortedFilmsByGenres = getSortedFilmsByGenres(films);

  return Object.keys(sortedFilmsByGenres)[0];
};

const getFilmsByDateRange = (films, statisticsType) => {
  switch (statisticsType) {
    case StatisticsType.TODAY:
      return films.filter((film) => film.watchingDate.isToday());
    case StatisticsType.WEEK:
      return films.filter((film) => film.watchingDate.isSameOrAfter(dayjs().startOf(`week`)));
    case StatisticsType.MONTH:
      return films.filter((film) => film.watchingDate.isSameOrAfter(dayjs().startOf(`month`)));
    case StatisticsType.YEAR:
      return films.filter((film) => film.watchingDate.isSameOrAfter(dayjs().startOf(`year`)));
    default:
      return films;
  }
};

const getFilmStatistics = (films) => {
  const watched = films.filter((film) => film.inWatchedCollection === true);

  return {
    watched,
    totalDuration: watched.reduce((acc, current) => acc + current.runtime, 0),
    topGenre: getTopGenre(watched),
  };
};

export const statistics = {
  [StatisticsType.ALL_TIME]: (films) => getFilmStatistics(films),
  [StatisticsType.TODAY]: (films) => getFilmStatistics(getFilmsByDateRange(films, StatisticsType.TODAY)),
  [StatisticsType.WEEK]: (films) => getFilmStatistics(getFilmsByDateRange(films, StatisticsType.WEEK)),
  [StatisticsType.MONTH]: (films) => getFilmStatistics(getFilmsByDateRange(films, StatisticsType.MONTH)),
  [StatisticsType.YEAR]: (films) => getFilmStatistics(getFilmsByDateRange(films, StatisticsType.YEAR)),
};
