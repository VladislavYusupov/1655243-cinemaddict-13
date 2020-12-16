import {remove, render} from "../utils/render";
import PopupCommentView from "../view/popup-comment";
import CardView from "../view/film-card";

export default class Film {
  constructor(filmContainer, popupComponent) {
    this._filmContainer = filmContainer;
    this._popupComponent = popupComponent;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    this._renderFilm();
  }

  _renderFilm() {
    this._filmCardComponent = new CardView(this._film);
    this._filmCardComponent.setClickHandler(this._filmCardClickHandler);
    render(this._filmContainer, this._filmCardComponent);
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
    this._popupCommentsListElement = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

    this._film.comments.forEach((comment) => {
      render(this._popupCommentsListElement, new PopupCommentView(comment));
    });

    document.addEventListener(`keydown`, this._popupEscKeyDownHandler);
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
  }
}
