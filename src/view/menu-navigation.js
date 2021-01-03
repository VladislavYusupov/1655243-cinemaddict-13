import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

const createMenuNavigationTemplate = ({watchlist, history, favorites}, currentFilterType) => {
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? `main-navigation__item--active` : ``}" data-filter=${FilterType.ALL}>All movies</a>
        <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}" data-filter=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? `main-navigation__item--active` : ``}" data-filter=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${history}</span></a>
        <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? `main-navigation__item--active` : ``}" data-filter=${FilterType.FAVORITES}>Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class MenuNavigation extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuNavigationTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`main-navigation__item`)) {
      this._callback.filterTypeChange(evt.target.dataset.filter);
    }
  }
}
