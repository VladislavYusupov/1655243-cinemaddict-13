import SmartView from "./smart.js";
import {StatisticsType} from "../const";
import getFormattedTotalDuration from "../getFormattedTotalDuration";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderStatisticsChart = (statisticsCtx, labels, data) => {
  const BAR_HEIGHT = 50;
  statisticsCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: `flex`,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 18
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 18
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticTemplate = ({statistics, currentStatisticsType, userRank}) => {
  const {watched, totalDuration, topGenre} = statistics[currentStatisticsType];

  return `
    <section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank ? userRank : ``}</span>
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

export default class Statistic extends SmartView {
  constructor(statistics, userRank, sortedFilmsByGenres) {
    super();

    this._data = {
      statistics,
      currentStatisticsType: StatisticsType.ALL_TIME,
      userRank,
      sortedFilmsByGenres,
    };

    this._statisticsChart = null;
    this._statisticsTypeClickHandler = this._statisticsTypeClickHandler.bind(this);

    this._setInnerHandlers();
    this._setChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  removeElement() {
    super.removeElement();

    if (this._statisticsChart !== null) {
      this._statisticsChart = null;
    }
  }

  _setInnerHandlers() {
    this.getElement().addEventListener(`click`, this._statisticsTypeClickHandler);
  }

  restoreHandlers() {
    this._setChart();
    this._setInnerHandlers();
  }

  _statisticsTypeClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`statistic__filters-label`)) {
      this.updateData({
        currentStatisticsType: evt.target.dataset.statisticsType
      });
    }
  }

  _setChart() {
    if (this._statisticsChart !== null) {
      this._statisticsChart = null;
    }

    const labels = Object.keys(this._data.sortedFilmsByGenres);
    const data = Object.values(this._data.sortedFilmsByGenres);
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    this._statisticsChart = renderStatisticsChart(statisticCtx, labels, data);
  }
}
