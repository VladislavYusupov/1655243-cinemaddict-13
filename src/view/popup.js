import convertArrayToString from "../helpers/convertArrayToString";
import createPopupElements from "../createPopupElements";
import createPopupElement from "../createPopupElement";
import PopupCommentView from "../view/popup-comment";
import PopupGenreView from "../view/popup-genre";
import {FILM_RELEASE_DATE_FORMAT} from "../const";
import EmojiImageView from "./popup-comment-emoji";
import SmartView from "./smart";
import dayjs from "dayjs";
import getFormattedFilmRuntime from "../getFormattedFilmRuntime";
import he from "he";

const createPopupTemplate = ({title, titleOriginal, director, writers, actors, releaseDate, comments, runtime, country, genres, age, poster, description, rating, inWatchListCollection, inWatchedCollection, inFavoriteCollection, emojiSelected = null, newComment = null}) => {
  return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">
              <p class="film-details__age">${age}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${titleOriginal}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${convertArrayToString(writers)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${convertArrayToString(actors)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dayjs(releaseDate).format(FILM_RELEASE_DATE_FORMAT)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getFormattedFilmRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${createPopupElements(genres, PopupGenreView)}</td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchListCollection ? ` checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${inWatchedCollection ? ` checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${inFavoriteCollection ? ` checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">${createPopupElements(comments, PopupCommentView)}</ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${createPopupElement(emojiSelected, EmojiImageView)}</div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment ? newComment : ``}</textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
};

export default class Popup extends SmartView {
  constructor() {
    super();

    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._addToWatchListChangeHandler = this._addToWatchListChangeHandler.bind(this);
    this._markAsWatchedChangeHandler = this._markAsWatchedChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._changeEmojiHandler = this._changeEmojiHandler.bind(this);
    this._inputNewCommentHandler = this._inputNewCommentHandler.bind(this);
    this._submitCommentHandler = this._submitCommentHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  setFilm(film) {
    this._data = film;
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._popupCloseHandler);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  setAddToWatchListChangeHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`change`, this._addToWatchListChangeHandler);
  }

  setMarkAsWatchedChangeHandler(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`change`, this._markAsWatchedChangeHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`change`, this._favoriteChangeHandler);
  }

  setCommentSubmitHandler(callback) {
    this._callback.submitComment = callback;
    document.addEventListener(`keydown`, this._submitCommentHandler);
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteComment = callback;
    this.getElement()
      .querySelector(`.film-details__comments-list`)
      .addEventListener(`click`, this._commentDeleteHandler);
  }

  updateDataWithSavingScrollPosition(update) {
    this._setScrollTop();
    this.updateData(update);
    this._updateScrollTop();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._popupCloseHandler(evt);
    }
  }

  _submitCommentHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      evt.preventDefault();
      const message = this._data.newComment;
      const emoji = this._data.emojiSelected;

      if (message && emoji) {
        const localComment = {
          message: he.encode(message),
          emoji,
          date: dayjs()
        };

        this._resetNewComment();

        this._callback.submitComment(localComment, Popup.parseDataToFilm(this._data));
      }
    }
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`film-details__comment-delete`)) {
      const commentId = evt.target.dataset.id;
      this._callback.deleteComment(commentId, Popup.parseDataToFilm(this._data));
    }
  }

  _updateScrollTop() {
    this.getElement().scrollTop = this._scrollTop;
  }

  _setScrollTop() {
    this._scrollTop = this.getElement().scrollTop;
  }

  _resetNewComment(justDataUpdating = true) {
    this.updateData(
        {
          emojiSelected: null,
          newComment: null
        },
        justDataUpdating
    );
  }

  _addToWatchListChangeHandler(evt) {
    evt.preventDefault();

    this.updateData(
        {
          inWatchListCollection: !this._data.inWatchListCollection
        },
        true
    );

    this._callback.addToWatchListClick(Popup.parseDataToFilm(this._data));
  }

  _markAsWatchedChangeHandler(evt) {
    evt.preventDefault();

    this.updateData(
        {
          inWatchedCollection: !this._data.inWatchedCollection
        },
        true
    );

    this._callback.markAsWatchedClick(Popup.parseDataToFilm(this._data));
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();

    this.updateData(
        {
          inFavoriteCollection: !this._data.inFavoriteCollection
        },
        true
    );

    this._callback.favoriteClick(Popup.parseDataToFilm(this._data));
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._resetNewComment();

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keydown`, this._submitCommentHandler);

    this._callback.popupClose();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._changeEmojiHandler);

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._inputNewCommentHandler);
  }

  _inputNewCommentHandler(evt) {
    evt.preventDefault();
    this.updateData(
        {
          newComment: evt.target.value
        },
        true
    );
  }

  _changeEmojiHandler(evt) {
    evt.preventDefault();
    const emojiSelectedProperty = `emojiSelected`;
    const emojiSelectedValue = evt.target.value;

    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      if (emojiSelectedProperty in this._data && this._data.emojiSelected === emojiSelectedValue) {
        return;
      }

      this.updateDataWithSavingScrollPosition({
        emojiSelected: emojiSelectedValue
      });
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopupCloseHandler(this._callback.popupClose);
    this.setAddToWatchListChangeHandler(this._callback.addToWatchListClick);
    this.setMarkAsWatchedChangeHandler(this._callback.markAsWatchedClick);
    this.setFavoriteChangeHandler(this._callback.favoriteClick);
    this.setCommentSubmitHandler(this._callback.submitComment);
    this.setCommentDeleteHandler(this._callback.deleteComment);
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.emojiSelected;
    delete data.newComment;

    return data;
  }
}
