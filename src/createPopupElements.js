import AbstractView from "./view/abstract.js";

const createPopupElements = (elements, View) => {
  if (View.prototype instanceof AbstractView === false) {
    throw new Error(`The view must be instance of the abstract`);
  }

  let elementTemplates = [];

  for (const element of elements) {
    const elementTemplate = new View(element).getTemplate();
    elementTemplates.push(elementTemplate);
  }

  return elementTemplates.join(``);
};

export default createPopupElements;
