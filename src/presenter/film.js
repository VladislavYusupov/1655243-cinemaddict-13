import {remove, replace, render} from "../utils/render";
import {UpdateType} from "../const.js";
import CardView from "../view/film-card";

export default class Film {
  constructor(filmContainer, popupPresenter, changeFilmData) {
    this._filmContainer = filmContainer;
    this._popupPresenter = popupPresenter;
    this._changeFilmData = changeFilmData;

    this._filmCardComponent = null;

    this._filmCardInfoClickHandler = this._filmCardInfoClickHandler.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
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

  destroy() {
    remove(this._filmCardComponent);
  }

  _filmCardInfoClickHandler() {
    this._popupPresenter.init(this._film);
  }

  _handleAddToWatchListClick() {
    const updateType = this._film.inWatchListCollection ? UpdateType.RERENDER_WITH_CURRENT_PRESENTER_SETTINGS : UpdateType.SINGLE_LIST_ITEM;

    this._changeFilmData(
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
    const updateType = this._film.inWatchedCollection ? UpdateType.RERENDER_WITH_CURRENT_PRESENTER_SETTINGS : UpdateType.SINGLE_LIST_ITEM;

    this._changeFilmData(
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
    const updateType = this._film.inFavoriteCollection ? UpdateType.RERENDER_WITH_CURRENT_PRESENTER_SETTINGS : UpdateType.SINGLE_LIST_ITEM;

    this._changeFilmData(
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
}
