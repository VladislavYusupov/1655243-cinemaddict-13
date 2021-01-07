import AbstractView from "./abstract.js";

const createMenuNavigationStatsTemplate = (statsState) => {
  return `<a href="#stats" class="main-navigation__additional ${statsState ? `main-navigation__item--active` : ``}">Stats</a>`;
};

export default class MenuNavigationStats extends AbstractView {
  constructor(statsState) {
    super();
    this._statsState = statsState;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMenuNavigationStatsTemplate(this._statsState);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
