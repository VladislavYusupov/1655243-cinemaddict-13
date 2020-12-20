import AbstractView from "./abstract.js";

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
    this._infoClickHandler = this._infoClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  setInfoClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._infoClickHandler);
    this.getElement().querySelector(`img`).addEventListener(`click`, this._infoClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._infoClickHandler);
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchListClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._film.inWatchListCollection = !this._film.inWatchListCollection;
    this._callback.addToWatchListClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._film.inWatchedCollection = !this._film.inWatchedCollection;
    this._callback.markAsWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._film.inFavoriteCollection = !this._film.inFavoriteCollection;
    this._callback.favoriteClick();
  }

  _infoClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
