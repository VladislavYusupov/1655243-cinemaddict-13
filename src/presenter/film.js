import {remove, replace, render} from "../utils/render";
import {UserAction, UpdateType} from "../const.js";
import CardView from "../view/film-card";
import PopupPresenter from "./popup";

export default class Film {
  constructor(filmContainer, popupComponent, changeData) {
    this._filmContainer = filmContainer;
    this._popupComponent = popupComponent;
    this._filmCardComponent = null;
    this._popupPresenter = null;
    this._changeData = changeData;

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

  _filmCardInfoClickHandler() {
    this._popupPresenter = new PopupPresenter(
        this._popupComponent,
        this._changeData,
        this._handleAddToWatchListClick,
        this._handleMarkAsWatchedClick,
        this._handleFavoriteClick);

    this._popupPresenter.init(this._film);
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
}
