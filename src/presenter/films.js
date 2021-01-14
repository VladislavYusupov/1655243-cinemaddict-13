import {remove, render} from "../utils/render";
import FilmsView from "../view/films";
import FilmListView from "../view/film-list";
import FilmListContainerView from "../view/film-list-container";
import PopupView from "../view/popup";
import SortView from "../view/sort";
import LoadingView from "../view/loading";
import EmptyFilmsView from "../view/empty-films";
import ExtraFilmsListView from "../view/extra-films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {SortType, UpdateType} from "../const";
import {filter} from "../utils/filter";
import PopupPresenter from "./popup";
import {sortFilmByRating, sortFilmByComments, sortFilmByReleaseDate} from "../utils/film";

const MAX_FILMS_PER_LINE = 5;
const MAX_EXTRA_FILMS_COUNT = 2;

const ExtraFilmName = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class Films {
  constructor(filmsContainer, filmsModel, filterModel, statsModel, api) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._statsModel = statsModel;
    this._api = api;
    this._renderedFilmsCount = MAX_FILMS_PER_LINE;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._isLoading = true;

    this._filmsComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._topRatedFilmListComponent = new ExtraFilmsListView(ExtraFilmName.TOP_RATED);
    this._mostCommentedFilmListComponent = new ExtraFilmsListView(ExtraFilmName.MOST_COMMENTED);
    this._loadingComponent = new LoadingView();

    this._filmPresentersMap = new Map();
    this._topRatedFilmPresentersMap = new Map();
    this._mostCommentedFilmPresentersMap = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._popupPresenter = new PopupPresenter(new PopupView(), this._handleViewAction, this._api);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._statsModel.addObserver(this._handleModelEvent);

    render(this._filmsContainer, this._filmsComponent);
    this._renderSortAndFilms();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = [...this._filmsModel.getFilms()];
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.RATING:
        filteredFilms.sort(sortFilmByRating);
        break;
      case SortType.DATE:
        filteredFilms.sort(sortFilmByReleaseDate);
        break;
    }

    return filteredFilms;
  }

  _handleViewAction(updateType, update) {
    this._api.updateFilm(update)
      .then((response) => {
        this._filmsModel.updateFilm(updateType, response);
      });
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.RERENDER_SINGLE_LIST_ITEM:
        this._updateFilmComponentIfMapHaveIt(this._filmPresentersMap, data);
        this._updateFilmComponentIfMapHaveIt(this._topRatedFilmPresentersMap, data);
        this._updateFilmComponentIfMapHaveIt(this._mostCommentedFilmPresentersMap, data);
        break;
      case UpdateType.RERENDER_WITH_CURRENT_PRESENTER_SETTINGS:
        this._clearFilms();
        this._renderSortAndFilms();
        break;
      case UpdateType.RERENDER_WITH_DEFAULT_PRESENTER_SETTINGS:
        this._clearFilms({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderSortAndFilms();
        break;
      case UpdateType.RENDER_OTHER_PAGE:
        if (this._statsModel.getStatsState()) {
          this.hide();
        } else {
          this.show();
        }
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderSortAndFilms();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilms({resetRenderedFilmsCount: true});
    this._renderSortAndFilms();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setClickHandler(this._handleSortTypeChange);

    render(this._filmsComponent, this._sortComponent);
  }

  _renderLoading() {
    render(this._filmsComponent, this._loadingComponent);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListContainerComponent.getElement(), this._popupPresenter, this._handleViewAction);
    filmPresenter.init(film);
    this._filmPresentersMap.set(film.id, filmPresenter);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + MAX_FILMS_PER_LINE);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _getTopRatedFilms(films) {
    return [...films]
      .sort(sortFilmByRating)
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _getMostCommentedFilms(films) {
    return [...films]
      .sort(sortFilmByComments)
      .slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  _renderExtraFilms(extraFilmsContainer, title, films) {
    const extraFilmListContainerComponent = new FilmListContainerView();

    render(this._filmsComponent, extraFilmsContainer);
    render(extraFilmsContainer, extraFilmListContainerComponent);

    films.forEach((film) => this._renderExtraFilm(extraFilmListContainerComponent, film, title));
  }

  _renderExtraFilm(container, film, title) {
    const extraFilmPresenter = new FilmPresenter(container.getElement(), this._popupPresenter, this._handleViewAction);
    extraFilmPresenter.init(film);

    switch (title) {
      case ExtraFilmName.TOP_RATED:
        this._topRatedFilmPresentersMap.set(film.id, extraFilmPresenter);
        break;
      case ExtraFilmName.MOST_COMMENTED:
        this._mostCommentedFilmPresentersMap.set(film.id, extraFilmPresenter);
        break;
    }
  }

  _updateFilmComponentIfMapHaveIt(map, film) {
    if (map.has(film.id)) {
      map.get(film.id).init(film);
    }
  }

  _clearFilms({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    this._filmPresentersMap.forEach((presenter) => presenter.destroy());
    this._filmPresentersMap.clear();

    remove(this._loadingComponent);
    remove(this._sortComponent);
    remove(this._filmListComponent);
    remove(this._filmListContainerComponent);
    remove(this._emptyFilmsComponent);
    remove(this._showMoreButtonComponent);
    remove(this._topRatedFilmListComponent);
    remove(this._mostCommentedFilmListComponent);

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = MAX_FILMS_PER_LINE;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderNoFilms() {
    render(this._filmsComponent, this._emptyFilmsComponent);
  }

  _renderSortAndFilms() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    render(this._filmsComponent, this._filmListComponent);
    render(this._filmListComponent, this._filmListContainerComponent);
    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));

    if (filmsCount > this._renderedFilmsCount) {
      this._renderShowMoreButton();
    }

    this._renderExtraFilms(this._topRatedFilmListComponent, ExtraFilmName.TOP_RATED, this._getTopRatedFilms(films));
    this._renderExtraFilms(this._mostCommentedFilmListComponent, ExtraFilmName.MOST_COMMENTED, this._getMostCommentedFilms(films));
  }

  show() {
    this._filmsComponent.show();
    this._emptyFilmsComponent.show();
  }

  hide() {
    this._filmsComponent.hide();
    this._emptyFilmsComponent.hide();
  }
}
