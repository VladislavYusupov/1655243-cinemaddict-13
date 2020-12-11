import {createElement} from "../utils";

const createPopupGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

export default class PopupGenre {
  constructor(genre) {
    this._element = null;
    this._genre = genre;
  }

  getTemplate() {
    return createPopupGenreTemplate(this._genre);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
