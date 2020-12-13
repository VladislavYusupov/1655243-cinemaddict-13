export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

export const render = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstElementChild;
};
