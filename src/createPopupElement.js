import AbstractView from "./view/abstract.js";

const createPopupElement = (element, View) => {
  if (View.prototype instanceof AbstractView === false) {
    throw new Error(`The view must be instance of the abstract`);
  }

  return new View(element).getTemplate();
};

export default createPopupElement;
