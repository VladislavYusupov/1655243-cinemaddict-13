import {createElement} from "../utils";

const createFooterStatisticTemplate = (films) => {
  return `<p>${films.length} movies inside</p>`;
};

export default class FooterStatistic {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
