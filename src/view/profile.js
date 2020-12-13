import {createElement} from "../utils";

const createProfileTemplate = ({rank}) => {
  return `
    <section class="header__profile profile">
      <p class="profile__rating">${rank ? rank : ``}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class Profile {
  constructor(user) {
    this._element = null;
    this._user = user;
  }

  getTemplate() {
    return createProfileTemplate(this._user);
  }

  getElement() {
    this._element = this._element ? this._element : createElement(this.getTemplate());
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
