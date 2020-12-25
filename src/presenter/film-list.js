import {remove, render} from "../utils/render";
import FilmsView from "../view/films";
import FilmListView from "../view/film-list";
import FilmListContainerView from "../view/film-list-container";
import PopupView from "../view/popup";
import EmptyFilmsView from "../view/empty-films";
import ExtraFilmsListView from "../view/extra-films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {updateItem} from "../utils/updateItem";

const MAX_FILMS_PER_LINE = 5;
const MAX_EXTRA_FILMS_COUNT = 2;

const ExtraFilmNames = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class FilmList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._popupComponent = new PopupView();
    this._showMoreButtonComponent = null;

    this._filmPresentersMap = new Map();
    this._topRatedFilmPresentersMap = new Map();
    this._mostCommentedFilmPresentersMap = new Map();

    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films;
    this._filmsRenderedNumber = 0;

    if (this._films.length > 0) {
      render(this._filmsContainer, this._filmsComponent);
      render(this._filmsComponent, this._filmListComponent);
      render(this._filmListComponent, this._filmListContainerComponent);
      this._renderFilmsRow();

      if (this._filmsRenderedNumber < this._films.length) {
        this._renderShowMoreButton();
      }

      this._renderExtraFilms(ExtraFilmNames.TOP_RATED, this._getTopRatedFilms());
      this._renderExtraFilms(ExtraFilmNames.MOST_COMMENTED, this._getMostCommentedFilms());
    } else {
      render(this._filmsContainer, this._emptyFilmsComponent);
    }
  }

  _renderFilmsRow() {
    if (this._filmsRenderedNumber < this._films.length) {
      this._films
        .slice(this._filmsRenderedNumber, this._filmsRenderedNumber + MAX_FILMS_PER_LINE)
        .forEach((film) => {
          const filmPresenter = new FilmPresenter(this._filmListContainerComponent.getElement(), this._popupComponent, this._handleFilmChange);
          filmPresenter.init(film);
          this._filmsRenderedNumber++;
          this._filmPresentersMap.set(film.id, filmPresenter);
        });
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);

    render(this._filmListComponent, this._showMoreButtonComponent);
  }

  _showMoreButtonClickHandler() {
    this._renderFilmsRow();

    if (this._filmsRenderedNumber >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _getTopRatedFilms() {
    return this._films
      .sort(({rating: a}, {rating: b}) => {
        return b - a;
      })
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _getMostCommentedFilms() {
    return this._films
      .sort(({comments: a}, {comments: b}) => {
        return b.length - a.length;
      })
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _renderExtraFilms(title, extraFilms) {
    const extraFilmListComponent = new ExtraFilmsListView(title);
    const extraFilmListContainerComponent = new FilmListContainerView();

    render(this._filmsComponent, extraFilmListComponent);
    render(extraFilmListComponent, extraFilmListContainerComponent);

    extraFilms.forEach((film) => {
      const extraFilmPresenter = new FilmPresenter(extraFilmListContainerComponent.getElement(), this._popupComponent, this._handleFilmChange);
      extraFilmPresenter.init(film);

      switch (title) {
        case ExtraFilmNames.TOP_RATED:
          this._topRatedFilmPresentersMap.set(film.id, extraFilmPresenter);
          break;
        case ExtraFilmNames.MOST_COMMENTED:
          this._mostCommentedFilmPresentersMap.set(film.id, extraFilmPresenter);
          break;
      }
    });
  }

  _handleFilmChange(film) {
    this._films = updateItem(this._films, film);

    this._updateFilmComponentIfMapHaveIt(this._filmPresentersMap, film);
    this._updateFilmComponentIfMapHaveIt(this._topRatedFilmPresentersMap, film);
    this._updateFilmComponentIfMapHaveIt(this._mostCommentedFilmPresentersMap, film);
  }

  _updateFilmComponentIfMapHaveIt(map, film) {
    if (map.has(film.id)) {
      map.get(film.id).init(film);
    }
  }
}
