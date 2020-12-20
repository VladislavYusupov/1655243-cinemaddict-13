import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

export const render = (container, child, place = RenderPosition.BEFORE_END) => {
  container = container instanceof Abstract ? container.getElement() : container;
  child = child instanceof Abstract ? child.getElement() : child;

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
  }
};

export const createElement = (template) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstElementChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};
