import AbstractView from "./abstract.js";
import {StatisticsType} from "../const";
import getFormattedTotalDuration from "../getFormattedTotalDuration";

const createStatisticTemplate = ({watched, totalDuration, topGenre}, currentStatisticsType) => {
  return `
    <section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${currentStatisticsType === StatisticsType.ALL_TIME ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label" data-statistics-type=${StatisticsType.ALL_TIME}>All time</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentStatisticsType === StatisticsType.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label" data-statistics-type=${StatisticsType.TODAY}>Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentStatisticsType === StatisticsType.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label" data-statistics-type=${StatisticsType.WEEK}>Week</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentStatisticsType === StatisticsType.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label" data-statistics-type=${StatisticsType.MONTH}>Month</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentStatisticsType === StatisticsType.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label" data-statistics-type=${StatisticsType.YEAR}>Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watched.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getFormattedTotalDuration(totalDuration).totalHours} <span class="statistic__item-description">h</span> ${getFormattedTotalDuration(totalDuration).totalMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre ? topGenre : ``}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`;
};

export default class Statistic extends AbstractView {
  constructor(statistics, currentStatisticsType) {
    super();
    this._statistics = statistics;
    this._currentStatisticsType = currentStatisticsType;
    this._statisticsTypeClickHandler = this._statisticsTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate(this._statistics[this._currentStatisticsType], this._currentStatisticsType);
  }

  setStatisticsTypeClickHandler(callback) {
    this._callback.statisticsTypeClick = callback;
    this.getElement().addEventListener(`click`, this._statisticsTypeClickHandler);
  }

  _statisticsTypeClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`statistic__filters-label`)) {
      this._callback.statisticsTypeClick(evt.target.dataset.statisticsType);
    }
  }
}
