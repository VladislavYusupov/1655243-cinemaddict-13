import {render, replace, remove} from "../utils/render";
import FilmsView from "../view/films";
import PopupView from "../view/popup";
import SortView from "../view/sort";
import EmptyFilmsView from "../view/empty-films";
import ExtraFilmsListView from "../view/extra-films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {updateItem} from "../utils/updateItem";
import {SortTypes} from "../const";

const MAX_FILMS_PER_LINE = 5;
const MAX_EXTRA_FILMS_COUNT = 2;

const ExtraFilmNames = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class FilmList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._sortTypeSelected = SortTypes.BY_DEFAULT;

    this._filmsComponent = new FilmsView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._popupComponent = new PopupView();
    this._sortComponent = new SortView(this._sortTypeSelected);
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._filmPresentersMap = new Map();
    this._topRatedFilmPresentersMap = new Map();
    this._mostCommentedFilmPresentersMap = new Map();

    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films;
    this._sourcedFilms = [...this._films];
    this._filmsRenderedNumber = 0;

    this._sortComponent.setClickHandler(this._handleSortTypeChange);
    this._renderFilms();
  }

  _renderFilms() {
    if (this._films.length > 0) {
      render(this._filmsContainer, this._sortComponent);
      render(this._filmsContainer, this._filmsComponent);
      this._filmListElement = this._filmsComponent.getElement().querySelector(`.films-list`);
      this._renderFilmsRow();

      if (this._filmsRenderedNumber < this._films.length) {
        render(this._filmListElement, this._showMoreButtonComponent);
        this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);
      }

      this._renderExtraFilms(ExtraFilmNames.TOP_RATED, this._getTopRatedFilms());
      this._renderExtraFilms(ExtraFilmNames.MOST_COMMENTED, this._getMostCommentedFilms());
    } else {
      render(this._filmsContainer, this._emptyFilmsComponent);
    }
  }

  _renderFilmsRow() {
    this._filmListContainerElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);

    if (this._filmsRenderedNumber < this._films.length) {
      this._films
        .slice(this._filmsRenderedNumber, this._filmsRenderedNumber + MAX_FILMS_PER_LINE)
        .forEach((film) => {
          const filmPresenter = new FilmPresenter(this._filmListContainerElement, this._popupComponent, this._handleFilmChange);
          filmPresenter.init(film);
          this._filmsRenderedNumber++;
          this._filmPresentersMap.set(film.id, filmPresenter);
        });
    }
  }

  _showMoreButtonClickHandler() {
    this._renderFilmsRow();

    if (this._filmsRenderedNumber >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _getTopRatedFilms() {
    return [...this._films]
      .sort(({rating: a}, {rating: b}) => {
        return b - a;
      })
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _getMostCommentedFilms() {
    return [...this._films]
      .sort(({comments: a}, {comments: b}) => {
        return b.length - a.length;
      })
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _renderExtraFilms(title, extraFilms) {
    const extraFilmListComponent = new ExtraFilmsListView(title);

    render(this._filmsComponent, extraFilmListComponent);
    const extraContainerElement = extraFilmListComponent.getElement().querySelector(`.films-list__container`);

    extraFilms.forEach((film) => {
      const extraFilmPresenter = new FilmPresenter(extraContainerElement, this._popupComponent, this._handleFilmChange);
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

  _handleSortTypeChange(newSortType) {
    if (newSortType !== this._sortTypeSelected) {
      const previousSortComponent = this._sortComponent;
      this._sortTypeSelected = newSortType;
      this._sortComponent = new SortView(this._sortTypeSelected);
      this._sortComponent.setClickHandler(this._handleSortTypeChange);

      if (this._filmsContainer.contains(previousSortComponent.getElement())) {
        replace(this._sortComponent, previousSortComponent);
      }

      remove(previousSortComponent);

      this._sortFilms(newSortType);
      this._clearFilms();
      this._renderFilms();
    }
  }

  _sortFilms(newSortType) {
    switch (newSortType) {
      case SortTypes.BY_RATING:
        this._films.sort(({rating: a}, {rating: b}) => {
          return b - a;
        });
        break;
      case SortTypes.BY_DATE:
        this._films.sort(({releaseDate: a}, {releaseDate: b}) => {
          return b - a;
        });
        break;
      default:
        this._films = [...this._sourcedFilms];
    }
  }

  _clearFilms() {
    this._filmPresentersMap.clear();
    this._filmsRenderedNumber = 0;
    remove(this._filmsComponent);
  }
}
