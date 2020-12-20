import {remove, replace, render} from "../utils/render";
import PopupCommentView from "../view/popup-comment";
import CardView from "../view/film-card";

export default class Film {
  constructor(filmContainer, popupComponent, handleFilmChange) {
    this._filmContainer = filmContainer;
    this._popupComponent = popupComponent;
    this._filmCardComponent = null;
    this._handleFilmChange = handleFilmChange;

    this._filmCardInfoClickHandler = this._filmCardInfoClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
    this._filmCardControlClickHandler = this._filmCardControlClickHandler.bind(this);
    this._popupFilmControlButtonClickHandler = this._popupFilmControlButtonClickHandler.bind(this);
  }

  init(film) {
    this._film = film;
    const previousFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new CardView(this._film);
    this._filmCardComponent.setInfoClickHandler(this._filmCardInfoClickHandler);
    this._filmCardComponent.setAddToWatchListClickHandler(this._filmCardControlClickHandler);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._filmCardControlClickHandler);
    this._filmCardComponent.setFavoriteClickHandler(this._filmCardControlClickHandler);

    if (previousFilmCardComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(previousFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, previousFilmCardComponent);
    }

    remove(previousFilmCardComponent);
  }

  _filmCardInfoClickHandler() {
    this._popupComponent.setFilm(this._film);
    this._popupComponent.setCloseButtonClickHandler(this._popupCloseButtonClickHandler);
    this._popupComponent.setAddToWatchListChangeHandler(this._popupFilmControlButtonClickHandler);
    this._popupComponent.setMarkAsWatchedChangeHandler(this._popupFilmControlButtonClickHandler);
    this._popupComponent.setFavoriteChangeHandler(this._popupFilmControlButtonClickHandler);
    this._popupCommentsListElement = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

    this._film.comments.forEach((comment) => {
      render(this._popupCommentsListElement, new PopupCommentView(comment));
    });

    document.addEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
  }

  _filmCardControlClickHandler() {
    this._handleFilmChange(this._film);
  }

  _popupCloseButtonClickHandler() {
    document.removeEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
  }

  _popupEscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._popupCloseButtonClickHandler();
    }
  }

  _popupFilmControlButtonClickHandler() {
    this._handleFilmChange(this._film);
  }
}
