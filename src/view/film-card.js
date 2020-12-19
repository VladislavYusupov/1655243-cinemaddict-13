import AbstractView from "./abstract.js";
import {FilmsCollection} from "../const";

const createCardTemplate = ({title, poster, shortDescription, rating, comments, inWatchListCollection, inWatchedCollection, inFavoriteCollection}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchListCollection ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${inWatchedCollection ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavoriteCollection ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

export default class Card extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickButtonHandler = this._clickButtonHandler.bind(this);
    this._getControlItemClass = this._getControlItemClass.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`img`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  setClickButtonHandler(callback) {
    this._callback.clickButton = callback;
    this.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, this._clickButtonHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _clickButtonHandler(evt) {
    const filmClassList = evt.target.classList;
    const filmCardControlsItemClassPrefix = `film-card__controls-item`;

    if (filmClassList.contains(filmCardControlsItemClassPrefix)) {
      evt.preventDefault();

      const filmClassListArray = Object.values(filmClassList);

      if (filmClassListArray.includes(this._getControlItemClass(filmCardControlsItemClassPrefix, FilmsCollection.WATCH_LIST))) {
        this._film.inWatchListCollection = !this._film.inWatchListCollection;
      }

      if (filmClassListArray.includes(this._getControlItemClass(filmCardControlsItemClassPrefix, FilmsCollection.WATCHED))) {
        this._film.inWatchedCollection = !this._film.inWatchedCollection;
      }

      if (filmClassListArray.includes(this._getControlItemClass(filmCardControlsItemClassPrefix, FilmsCollection.FAVORITE))) {
        this._film.inFavoriteCollection = !this._film.inFavoriteCollection;
      }

      this._callback.clickButton(this._film);
    }
  }

  _getControlItemClass(classPrefix, classPostfix) {
    return `${classPrefix}--${classPostfix}`;
  }
}
