import createPopupElement from "./createPopupElement";

const createPopupElements = (elements, View) => {
  const elementTemplates = [];

  for (const element of elements) {
    const elementTemplate = createPopupElement(element, View);
    elementTemplates.push(elementTemplate);
  }

  return elementTemplates.join(``);
};

export default createPopupElements;
