import {remove} from "../utils/render";
import {UpdateType} from "../const.js";
import CommentsModel from "../model/comments";
import {nanoid} from "nanoid";

export default class Popup {
  constructor(popupComponent, changeFilmData) {
    this._popupComponent = popupComponent;
    this._changeFilmData = changeFilmData;

    this._commentsModel = null;

    this._handlePopupCommentSubmit = this._handlePopupCommentSubmit.bind(this);
    this._handlePopupCommentDelete = this._handlePopupCommentDelete.bind(this);
    this._handleDataAfterClick = this._handleDataAfterClick.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
  }

  init(film) {
    this._film = film;

    // TODO: Here will be API method for getting comments by film id;
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(this._film.comments);
    this._film.comments = this._commentsModel.getComments();

    this._popupComponent.setFilm(this._film);
    this._popupComponent.setPopupCloseHandler(this._handlePopupClose);
    this._popupComponent.setAddToWatchListChangeHandler(this._handleDataAfterClick);
    this._popupComponent.setMarkAsWatchedChangeHandler(this._handleDataAfterClick);
    this._popupComponent.setFavoriteChangeHandler(this._handleDataAfterClick);
    this._popupComponent.setCommentSubmitHandler(this._handlePopupCommentSubmit);
    this._popupComponent.setCommentDeleteHandler(this._handlePopupCommentDelete);

    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
  }

  _handleDataAfterClick(film) {
    this._updateFilm(film);
  }

  _handlePopupCommentSubmit(localComment, film) {
    const commentAfterCreate = Object.assign(
        {
          id: nanoid(),
          author: `example author`,
        },
        localComment
    );

    film.comments.push(commentAfterCreate);
    this._updateFilm(film);
    this._popupComponent.updateDataWithSavingScrollPosition(film);
  }

  _updateFilm(film) {
    this._changeFilmData(
        UpdateType.MINOR,
        film
    );
  }

  _handlePopupCommentDelete(commentId, film) {
    const index = film.comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    film.comments.splice(index, 1);
    this._updateFilm(film);
    this._popupComponent.updateDataWithSavingScrollPosition(film);
  }

  _handlePopupClose() {
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    this._commentsModel.clearComments();
  }
}
