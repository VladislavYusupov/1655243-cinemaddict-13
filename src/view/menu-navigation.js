import {createElement} from "../utils";

const createMenuNavigationTemplate = ({watchList, history, favorites}) => {
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class MenuNavigation {
  constructor(user) {
    this._element = null;
    this._user = user;
  }

  getTemplate() {
    return createMenuNavigationTemplate(this._user);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
