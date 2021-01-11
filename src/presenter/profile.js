import {render, replace, remove} from "../utils/render.js";
import ProfileView from "../view/profile";
import getUserRank from "../getUserRank.js";

export default class Profile {
  constructor(profileContainer, filmsModel) {
    this._profileContainer = profileContainer;
    this._filmsModel = filmsModel;

    this._profileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._films = this._filmsModel.getFilms();
    this._userRank = getUserRank(this._films);

    const prevProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileView(this._userRank);

    if (prevProfileComponent === null) {
      render(this._profileContainer, this._profileComponent);
      return;
    }

    replace(this._profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
