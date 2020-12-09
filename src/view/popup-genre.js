import {createElement} from "../utils";

export const createPopupGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

export default class PopupGenre {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupGenreTemplate();
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
