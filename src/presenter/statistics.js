import {render, replace, remove} from "../utils/render.js";
import StatisticsView from "../view/statistics";

export default class Stats {
  constructor(statisticsContainer, statisticsModel, statsModel) {
    this._statisticsContainer = statisticsContainer;
    this._statisticsModel = statisticsModel;
    this._statsModel = statsModel;

    this._statisticsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._statsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevStatisticsComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsView();

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

  show() {
    this._statisticsComponent.show();
  }

  hide() {
    this._statisticsComponent.hide();
  }
}
