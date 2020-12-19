import {remove, render} from "../utils/render";
import {replace} from "../utils/replace";
import PopupCommentView from "../view/popup-comment";
import CardView from "../view/film-card";

export default class Film {
  constructor(filmContainer, popupComponent, handleFilmChange) {
    this._filmContainer = filmContainer;
    this._popupComponent = popupComponent;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
    this._filmCardClickButtonHandler = this._filmCardClickButtonHandler.bind(this);
    this._popupClickButtonHandler = this._popupClickButtonHandler.bind(this);

    this._filmCardComponent = null;
    this._handleFilmChange = handleFilmChange;
  }

  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new CardView(this._film);
    this._filmCardComponent.setClickHandler(this._filmCardClickHandler);
    this._filmCardComponent.setClickButtonHandler(this._filmCardClickButtonHandler);

    if (prevFilmCardComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _popupClickHandler() {
    document.removeEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
  }

  _popupEscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._popupClickHandler();
    }
  }

  _filmCardClickHandler() {
    this._popupComponent.setFilm(this._film);
    this._popupComponent.setClickHandler(this._popupClickHandler);
    this._popupComponent.setClickButtonHandler(this._popupClickButtonHandler);
    this._popupCommentsListElement = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

    this._film.comments.forEach((comment) => {
      render(this._popupCommentsListElement, new PopupCommentView(comment));
    });

    document.addEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
  }

  _filmCardClickButtonHandler() {
    this._handleFilmChange(this._film);
  }

  _popupClickButtonHandler() {
    this._handleFilmChange(this._film);
  }
}
