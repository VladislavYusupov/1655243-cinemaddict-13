import AbstractView from "./abstract.js";

const createEmptyFilmsTemplate = () => {
  return `
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
};

export default class EmptyFilms extends AbstractView {
  getTemplate() {
    return createEmptyFilmsTemplate();
  }
}
