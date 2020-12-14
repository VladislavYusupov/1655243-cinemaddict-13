import ProfileView from "./view/profile";
import MenuNavigationView from "./view/menu-navigation";
import SortView from "./view/sort";
import StatisticView from "./view/statistic";
import FilmsView from "./view/films";
import CardView from "./view/film-card";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsListExtraView from "./view/films-list-extra";
import FooterStatisticView from "./view/footer-statistic";
import PopupView from "./view/popup";
import PopupCommentView from "./view/popup-comment";
import FilmsEmptyView from "./view/films-empty";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils";

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

let filmsRenderedNumber = 0;

const films = new Array(filmListOptions.main.maxCount).fill({}).map(generateFilm);
const user = generateUser();
const popupComponent = new PopupView();
const showMoreButtonComponent = new ShowMoreButtonView();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const renderFilmsRow = () => {
  const filmListContainerElement = mainElement.querySelector(`.films-list__container`);

  if (filmsRenderedNumber < films.length) {
    films
      .slice(filmsRenderedNumber, filmsRenderedNumber + filmListOptions.main.maxFilmsPerLine)
      .forEach((film) => {
        renderFilm(filmListContainerElement, film);

        filmsRenderedNumber++;
      });
  }
};

const renderFilmsExtra = (title, selectedFilms) => {
  const filmsElement = mainElement.querySelector(`.films`);
  const filmListExtraElement = new FilmsListExtraView(title).getElement();

  render(filmsElement, filmListExtraElement);
  const extraContainerElement = filmListExtraElement.querySelector(`.films-list__container`);

  selectedFilms.forEach((film) => {
    renderFilm(extraContainerElement, film);
  });
};

const renderFilm = (container, film) => {
  const filmCardComponent = new CardView(film);
  filmCardComponent.setClickHandler(() => filmCardClickHandler(film));

  render(container, filmCardComponent.getElement());
};

const filmCardClickHandler = (film) => {
  popupComponent.setFilm(film);
  popupComponent.setClickHandler(deletePopup);
  const popupElement = popupComponent.getElement();
  const popupCommentsListElement = popupElement.querySelector(`.film-details__comments-list`);

  film.comments.forEach((comment) => {
    render(popupCommentsListElement, new PopupCommentView(comment).getElement());
  });

  document.addEventListener(`keydown`, popupEscKeyDownHandler);
  document.body.appendChild(popupElement);
  document.body.classList.add(`hide-overflow`);
};

const popupEscKeyDownHandler = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    deletePopup();
  }
};

const deletePopup = () => {
  document.removeEventListener(`keydown`, popupEscKeyDownHandler);
  document.body.classList.remove(`hide-overflow`);
  document.body.removeChild(popupComponent.getElement());
  popupComponent.removeElement();
};

const getTopRatedFilms = (movies) => {
  return movies
    .sort(({rating: a}, {rating: b}) => {
      return b - a;
    })
    .slice(0, filmListOptions.extra.maxCount);
};

const getMostCommentedFilms = (movies) => {
  return movies
    .sort(({comments: a}, {comments: b}) => {
      return b.length - a.length;
    })
    .slice(0, filmListOptions.extra.maxCount);
};

const showMoreButtonClickHandler = () => {
  renderFilmsRow(films);

  if (filmsRenderedNumber >= films.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
};

render(headerElement, new ProfileView(user).getElement());

render(mainElement, new MenuNavigationView(user).getElement());
render(mainElement, new SortView(user).getElement());

if (films.length > 0) {
  render(mainElement, new StatisticView().getElement());

  render(mainElement, new FilmsView().getElement());
  renderFilmsRow(films);

  if (filmsRenderedNumber < films.length) {
    const filmsListElement = mainElement.querySelector(`.films-list`);

    render(filmsListElement, showMoreButtonComponent.getElement());

    showMoreButtonComponent.setClickHandler(showMoreButtonClickHandler);
  }

  renderFilmsExtra(filmListOptions.extra.topRated.name, getTopRatedFilms(films));
  renderFilmsExtra(filmListOptions.extra.mostComment.name, getMostCommentedFilms(films));
} else {
  render(mainElement, new FilmsEmptyView().getElement());
}

render(footerStatisticsElement, new FooterStatisticView(films).getElement());
