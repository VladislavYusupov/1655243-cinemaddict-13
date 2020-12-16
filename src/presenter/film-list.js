import {render, remove} from "../utils/render";
import FilmsView from "../view/films";
import PopupView from "../view/popup";
import StatisticView from "../view/statistic";
import EmptyFilmsView from "../view/empty-films";
import ExtraFilmsListView from "../view/extra-films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";

const filmListOptions = {
  main: {
    maxCount: 20,
    maxFilmsPerLine: 5,
  },
  extra: {
    topRated: {
      name: `Top rated`,
    },
    mostComment: {
      name: `Most comment`,
    },
    maxCount: 2,
  },
};

export default class FilmList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsViewComponent = new FilmsView();
    this._emptyFilmsViewComponent = new EmptyFilmsView();
    this._statisticViewComponent = new StatisticView();
    this._popupComponent = new PopupView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
  }

  init(films) {
    this._films = films;
    this._filmsRenderedNumber = 0;

    if (this._films.length > 0) {
      render(this._filmsContainer, this._statisticViewComponent);
      render(this._filmsContainer, this._filmsViewComponent);
      this._filmListElement = this._filmsViewComponent.getElement().querySelector(`.films-list`);
      this._renderFilmsRow();

      if (this._filmsRenderedNumber < this._films.length) {
        render(this._filmListElement, this._showMoreButtonComponent);
        this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);

        this._renderExtraFilms(filmListOptions.extra.topRated.name, this._getTopRatedFilms());
        this._renderExtraFilms(filmListOptions.extra.mostComment.name, this._getMostCommentedFilms());
      }
    } else {
      render(this._filmsContainer, this._emptyFilmsViewComponent);
    }
  }

  _renderFilmsRow() {
    this._filmListContainerElement = this._filmsViewComponent.getElement().querySelector(`.films-list__container`);

    if (this._filmsRenderedNumber < this._films.length) {
      this._films
        .slice(this._filmsRenderedNumber, this._filmsRenderedNumber + filmListOptions.main.maxFilmsPerLine)
        .forEach((film) => {
          new FilmPresenter(this._filmListContainerElement, this._popupComponent).init(film);
          this._filmsRenderedNumber++;
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
    return this._films
      .sort(({rating: a}, {rating: b}) => {
        return b - a;
      })
      .slice(0, filmListOptions.extra.maxCount);
  }

  _getMostCommentedFilms() {
    return this._films
      .sort(({comments: a}, {comments: b}) => {
        return b.length - a.length;
      })
      .slice(0, filmListOptions.extra.maxCount);
  }

  _renderExtraFilms(title, extraFilms) {
    const extraFilmListComponent = new ExtraFilmsListView(title);

    render(this._filmsViewComponent, extraFilmListComponent);
    const extraContainerElement = extraFilmListComponent.getElement().querySelector(`.films-list__container`);

    extraFilms.forEach((film) => {
      new FilmPresenter(extraContainerElement, this._popupComponent).init(film);
    });
  }
}
