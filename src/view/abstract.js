import {createElement} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_ANIMATION_TIMEOUT_SECONDS = SHAKE_ANIMATION_TIMEOUT / 1000;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT_SECONDS}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
