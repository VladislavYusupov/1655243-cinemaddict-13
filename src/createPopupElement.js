const createPopupElement = (elements, createPopupElementTemplateFunction) => {
  let elementList = [];

  for (let element of elements) {
    const popupElement = createPopupElementTemplateFunction(element);
    elementList.push(popupElement);
  }

  return elementList.join(``);
};

export default createPopupElement;
