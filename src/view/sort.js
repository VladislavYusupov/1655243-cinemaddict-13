import AbstractView from "./abstract.js";
import {SortTypes} from "../const";

const createSortTemplate = (sortTypeSelected = SortTypes.BY_DEFAULT) => {
  return `
    <ul class="sort">
      <li><a href="#" class="sort__button ${sortTypeSelected === SortTypes.BY_DEFAULT ? ` sort__button--active` : ``}" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button ${sortTypeSelected === SortTypes.BY_DATE ? ` sort__button--active` : ``}" data-sort-type="date">Sort by date</a></li>
      <li><a href="#" class="sort__button ${sortTypeSelected === SortTypes.BY_RATING ? ` sort__button--active` : ``}" data-sort-type="rating">Sort by rating</a></li>
    </ul>`;
};

export default class Sort extends AbstractView {
  constructor(sortTypeSelected) {
    super();
    this._sortTypeSelected = sortTypeSelected;
    this._setClickHandler = this._setClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._sortTypeSelected);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._setClickHandler);
  }

  _setClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`sort__button`)) {
      this._callback.click(evt.target.dataset.sortType);
    }
  }
}
