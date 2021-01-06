import AbstractView from "./abstract.js";

const createMenuNavigationStatsTemplate = (isActiveStats) => {
  return `<a href="#stats" class="main-navigation__additional ${isActiveStats ? `main-navigation__item--active` : ``}">Stats</a>`;
};

export default class MenuNavigationStats extends AbstractView {
  constructor() {
    super();
    this._isActiveStats = false;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMenuNavigationStatsTemplate(this._isActiveStats);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._isActiveStats = !this._isActiveStats;
    this._callback.click(this._isActiveStats);
  }
}
