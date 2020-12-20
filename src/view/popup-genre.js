import AbstractView from "./abstract.js";

const createPopupGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

export default class PopupGenre extends AbstractView {
  constructor(genre) {
    super();
    this._genre = genre;
  }

  getTemplate() {
    return createPopupGenreTemplate(this._genre);
  }
}
