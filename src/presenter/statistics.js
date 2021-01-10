import {render} from "../utils/render.js";
import StatisticsView from "../view/statistics";
import {StatisticsType} from "../const";
import {getSortedFilmsByGenres, statistics} from "../utils/statistics";
import getUserRank from "../getUserRank.js";

export default class Statistics {
  constructor(statisticsContainer, statsModel, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._statsModel = statsModel;
    this._filmsModel = filmsModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._statsModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._films = this._filmsModel.getFilms();
    this._currentStatistics = this._getStatistics(this._films);
    this._userRank = getUserRank(this._films);
    this._sortedFilmsByGenres = getSortedFilmsByGenres(this._films);

    this._statisticsComponent = new StatisticsView(this._currentStatistics, this._userRank, this._sortedFilmsByGenres);
    render(this._statisticsContainer, this._statisticsComponent);
    this.hide();
  }

  _handleModelEvent() {
    this._films = this._filmsModel.getFilms();
    this._currentStatistics = this._getStatistics(this._films);
    this._userRank = getUserRank(this._films);
    this._sortedFilmsByGenres = getSortedFilmsByGenres(this._films.filter((film) => film.inWatchedCollection === true));

    this._statisticsComponent.updateData({
      statistics: this._currentStatistics,
      userRank: this._userRank,
      sortedFilmsByGenres: this._sortedFilmsByGenres,
    });

    return this._statsModel.getStats() ? this.show() : this.hide();
  }

  _getStatistics(films) {
    return {
      [StatisticsType.ALL_TIME]: statistics[StatisticsType.ALL_TIME](films),
      [StatisticsType.TODAY]: statistics[StatisticsType.TODAY](films),
      [StatisticsType.WEEK]: statistics[StatisticsType.WEEK](films),
      [StatisticsType.MONTH]: statistics[StatisticsType.MONTH](films),
      [StatisticsType.YEAR]: statistics[StatisticsType.YEAR](films),
    };
  }

  show() {
    this._statisticsComponent.show();
  }

  hide() {
    this._statisticsComponent.hide();
  }
}
