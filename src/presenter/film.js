import {remove, replace, render} from "../utils/render";
import {UserAction, UpdateType} from "../const.js";
import CardView from "../view/film-card";

export default class Film {
  constructor(filmContainer, popupComponent, changeData) {
    this._filmContainer = filmContainer;
    this._popupComponent = popupComponent;
    this._filmCardComponent = null;
    this._changeData = changeData;

    this._filmCardInfoClickHandler = this._filmCardInfoClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
    this._filmCardControlClickHandler = this._filmCardControlClickHandler.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handlePopupCommentSubmit = this._handlePopupCommentSubmit.bind(this);
    this._handlePopupCommentDelete = this._handlePopupCommentDelete.bind(this);
  }

  init(film) {
    this._film = film;
    const previousFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new CardView(this._film);
    this._filmCardComponent.setInfoClickHandler(this._filmCardInfoClickHandler);
    this._filmCardComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

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
    this._popupComponent.setAddToWatchListChangeHandler(this._handleAddToWatchListClick);
    this._popupComponent.setMarkAsWatchedChangeHandler(this._handleMarkAsWatchedClick);
    this._popupComponent.setFavoriteChangeHandler(this._handleFavoriteClick);
    this._popupComponent.setCommentSubmitHandler(this._handlePopupCommentSubmit);
    this._popupComponent.setCommentDeleteHandler(this._handlePopupCommentDelete);

    document.addEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
  }

  _handleAddToWatchListClick() {
    const updateType = this._film.inWatchListCollection ? UpdateType.MINOR : UpdateType.PATCH;

    this._changeData(
        UserAction.UPDATE_FILM,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              inWatchListCollection: !this._film.inWatchListCollection
            }
        )
    );
  }

  _handleMarkAsWatchedClick() {
    const updateType = this._film.inWatchedCollection ? UpdateType.MINOR : UpdateType.PATCH;

    this._changeData(
        UserAction.UPDATE_FILM,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              inWatchedCollection: !this._film.inWatchedCollection
            }
        )
    );
  }

  _handleFavoriteClick() {
    const updateType = this._film.inFavoriteCollection ? UpdateType.MINOR : UpdateType.PATCH;

    this._changeData(
        UserAction.UPDATE_FILM,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              inFavoriteCollection: !this._film.inFavoriteCollection
            }
        )
    );
  }

  _handlePopupCommentSubmit() {
    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              comments: this._film.comments
            }
        )
    );
  }

  _handlePopupCommentDelete() {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              comments: this._film.comments
            }
        )
    );
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
}
