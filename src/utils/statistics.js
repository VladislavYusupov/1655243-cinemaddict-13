import {StatisticsType} from "../const";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";
import {getWatchedFilms} from "./film";

dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);

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

const getFilmStatistics = (films, statisticsType) => {
  const watched = getWatchedFilms(films);
  const watchedInRange = getFilmsByDateRange(watched, statisticsType);

  return {
    watched: watchedInRange,
    totalDuration: watchedInRange.reduce((acc, current) => acc + current.runtime, 0),
    topGenre: getTopGenre(watchedInRange),
  };
};

export const getSortedFilmsByGenres = (films) => {
  const filmCountByGenres = {};

  films.forEach((film) =>
    film.genre.forEach((genre) => {
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

export const statistics = {
  [StatisticsType.ALL_TIME]: (films) => getFilmStatistics(films, StatisticsType.ALL_TIME),
  [StatisticsType.TODAY]: (films) => getFilmStatistics(films, StatisticsType.TODAY),
  [StatisticsType.WEEK]: (films) => getFilmStatistics(films, StatisticsType.WEEK),
  [StatisticsType.MONTH]: (films) => getFilmStatistics(films, StatisticsType.MONTH),
  [StatisticsType.YEAR]: (films) => getFilmStatistics(films, StatisticsType.YEAR),
};
