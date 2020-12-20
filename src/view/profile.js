import AbstractView from "./abstract.js";

const createProfileTemplate = ({rank}) => {
  return `
    <section class="header__profile profile">
      <p class="profile__rating">${rank ? rank : ``}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class Profile extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createProfileTemplate(this._user);
  }
}
