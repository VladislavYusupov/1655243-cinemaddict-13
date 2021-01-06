import AbstractView from "./abstract.js";

const createMenuNavigationTemplate = () => {
  return `<nav class="main-navigation"></nav>`;
};

export default class MenuNavigation extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createMenuNavigationTemplate();
  }
}
