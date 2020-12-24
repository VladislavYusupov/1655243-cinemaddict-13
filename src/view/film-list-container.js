import AbstractView from "./abstract.js";

const createFilmListContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmListContainer extends AbstractView {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
