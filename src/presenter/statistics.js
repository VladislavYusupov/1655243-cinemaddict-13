import {render, replace, remove} from "../utils/render.js";
import StatisticsView from "../view/statistics";
import {StatisticsType} from "../const";
import {statistics} from "../utils/statistics";

export default class Stats {
  constructor(statisticsContainer, statisticsModel, statsModel, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._statisticsModel = statisticsModel;
    this._statsModel = statsModel;
    this._filmsModel = filmsModel;

    this._statisticsComponent = null;
    this._currentStatisticsType = StatisticsType.ALL_TIME;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleStatisticsTypeClick = this._handleStatisticsTypeClick.bind(this);

    this._statsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentStatistics = this._getStatistics();

    const prevStatisticsComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsView(this._currentStatistics, this._currentStatisticsType);
    this._statisticsComponent.setStatisticsTypeClickHandler(this._handleStatisticsTypeClick);

    if (prevStatisticsComponent === null) {
      render(this._statisticsContainer, this._statisticsComponent);
      this.hide();
      return;
    }

    replace(this._statisticsComponent, prevStatisticsComponent);
    remove(prevStatisticsComponent);
  }

  _handleModelEvent() {
    return this._statsModel.getStats() ? this.show() : this.hide();
  }

  _handleStatisticsTypeClick(statisticsType) {
    if (this._currentStatisticsType === statisticsType) {
      return;
    }

    this._currentStatisticsType = statisticsType;
    this.init();
  }

  _getStatistics() {
    const films = this._filmsModel.getFilms();

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
