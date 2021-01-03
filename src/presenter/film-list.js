import {remove, replace, render} from "../utils/render";
import FilmsView from "../view/films";
import FilmListView from "../view/film-list";
import FilmListContainerView from "../view/film-list-container";
import PopupView from "../view/popup";
import SortView from "../view/sort";
import EmptyFilmsView from "../view/empty-films";
import ExtraFilmsListView from "../view/extra-films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {SortTypes, UserAction, UpdateType} from "../const";
import {filter} from "../utils/filter";

const MAX_FILMS_PER_LINE = 5;
const MAX_EXTRA_FILMS_COUNT = 2;

const ExtraFilmNames = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class FilmList {
  constructor(filmsContainer, filmsModel, filterModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._currentSortType = SortTypes.BY_DEFAULT;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._popupComponent = new PopupView();

    this._filmPresentersMap = new Map();
    this._topRatedFilmPresentersMap = new Map();
    this._mostCommentedFilmPresentersMap = new Map();

    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._filmsRenderedNumber = 0;

    this._renderSort();
    this._renderFilms();

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = [...filter[filterType](films)];

    switch (this._currentSortType) {
      case SortTypes.BY_RATING:
        filteredFilms.sort(({rating: a}, {rating: b}) => {
          return b - a;
        });
        break;
      case SortTypes.BY_DATE:
        filteredFilms.sort(({releaseDate: a}, {releaseDate: b}) => {
          return b - a;
        });
        break;
    }

    return filteredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._updateFilmComponentIfMapHaveIt(this._filmPresentersMap, data);
        this._updateFilmComponentIfMapHaveIt(this._topRatedFilmPresentersMap, data);
        this._updateFilmComponentIfMapHaveIt(this._mostCommentedFilmPresentersMap, data);
        break;
      case UpdateType.MINOR:
        this._clearFilms();
        this._renderFilms();
        break;
      case UpdateType.MAJOR:
        this._clearFilms();
        this._renderFilms();
        break;
    }
  }

  _handleSortTypeChange(newSortType) {
    if (newSortType !== this._currentSortType) {
      const previousSortComponent = this._sortComponent;
      this._currentSortType = newSortType;
      this._sortComponent = new SortView(this._currentSortType);
      this._sortComponent.setClickHandler(this._handleSortTypeChange);

      if (this._filmsContainer.contains(previousSortComponent.getElement())) {
        replace(this._sortComponent, previousSortComponent);
      }

      remove(previousSortComponent);

      this._clearFilms();
      this._renderFilms();
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setClickHandler(this._handleSortTypeChange);

    render(this._filmsContainer, this._sortComponent);
  }

  _renderFilms() {
    if (this._getFilms().length > 0) {
      render(this._filmsContainer, this._filmsComponent);
      render(this._filmsComponent, this._filmListComponent);
      render(this._filmListComponent, this._filmListContainerComponent);
      this._renderFilmsRow();

      if (this._filmsRenderedNumber < this._getFilms().length) {
        this._renderShowMoreButton();
      }

      this._renderExtraFilms(ExtraFilmNames.TOP_RATED, this._getTopRatedFilms());
      this._renderExtraFilms(ExtraFilmNames.MOST_COMMENTED, this._getMostCommentedFilms());
    } else {
      render(this._filmsContainer, this._emptyFilmsComponent);
    }
  }

  _renderFilmsRow() {
    if (this._filmsRenderedNumber < this._getFilms().length) {
      this._getFilms()
        .slice(this._filmsRenderedNumber, this._filmsRenderedNumber + MAX_FILMS_PER_LINE)
        .forEach((film) => {
          const filmPresenter = new FilmPresenter(this._filmListContainerComponent.getElement(), this._popupComponent, this._handleViewAction);
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

    if (this._filmsRenderedNumber >= this._getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _getTopRatedFilms() {
    return [...this._getFilms()]
      .sort(({rating: a}, {rating: b}) => {
        return b - a;
      })
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _getMostCommentedFilms() {
    return [...this._getFilms()]
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
      const extraFilmPresenter = new FilmPresenter(extraFilmListContainerComponent.getElement(), this._popupComponent, this._handleViewAction);
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

  _updateFilmComponentIfMapHaveIt(map, film) {
    if (map.has(film.id)) {
      map.get(film.id).init(film);
    }
  }

  _clearFilms() {
    this._filmPresentersMap.clear();
    this._filmsRenderedNumber = 0;

    remove(this._filmsComponent);
    remove(this._filmListComponent);
    remove(this._filmListContainerComponent);
    remove(this._emptyFilmsComponent);
  }
}
