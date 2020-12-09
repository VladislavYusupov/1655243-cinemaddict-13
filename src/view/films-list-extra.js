import {createElement} from "../utils";

const createFilmsListExtraTemplate = (title, filmList) => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">${filmList}</div>
    </section>`;
};

export default class FilmListExtra {
  constructor(title, filmList) {
    this._element = null;
    this._title = title;
    this._filmList = filmList;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._title, this._filmList);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
