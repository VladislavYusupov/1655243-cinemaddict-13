import {remove} from "../utils/render";
import {UserAction, UpdateType} from "../const.js";

export default class Popup {
  constructor(popupComponent, changeData, handleAddToWatchListClick, handleMarkAsWatchedClick, handleFavoriteClick) {
    this._popupComponent = popupComponent;
    this._changeData = changeData;
    this._handleAddToWatchListClick = handleAddToWatchListClick;
    this._handleMarkAsWatchedClick = handleMarkAsWatchedClick;
    this._handleFavoriteClick = handleFavoriteClick;

    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
    this._handlePopupCommentSubmit = this._handlePopupCommentSubmit.bind(this);
    this._handlePopupCommentDelete = this._handlePopupCommentDelete.bind(this);
  }

  init(film) {
    this._film = film;
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
