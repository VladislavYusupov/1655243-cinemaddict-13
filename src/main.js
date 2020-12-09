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
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {renderTemplate, renderElement, RenderPosition} from "./utils";

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

const films = new Array(filmListOptions.main.maxCount).fill().map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const renderTemplateFilmsRow = () => {
  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  if (filmsRenderedNumber < films.length) {
    films
      .slice(filmsRenderedNumber, filmsRenderedNumber + filmListOptions.main.maxFilmsPerLine)
      .forEach((film) => {
        renderElement(filmsListContainerElement, new CardView(film).getElement(), RenderPosition.BEFOREEND);
        filmsRenderedNumber++;
      });
  }
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

const createFilmCards = (movies) => {
  let filmCards = ``;

  movies.forEach((movie) => (filmCards += new CardView(movie).getTemplate()));

  return filmCards;
};

renderTemplate(headerElement, new ProfileView(user).getTemplate(), RenderPosition.BEFOREEND);

renderElement(mainElement, new MenuNavigationView(user).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SortView(user).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new StatisticView().getElement(), RenderPosition.BEFOREEND);

renderElement(mainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);
renderTemplateFilmsRow(films);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

if (filmsRenderedNumber < films.length) {
  renderElement(filmsListElement, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);
  const showButton = filmsListElement.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    renderTemplateFilmsRow(films);

    if (filmsRenderedNumber === films.length) {
      showButton.remove();
    }
  });
}

renderElement(filmsElement, new FilmsListExtraView(filmListOptions.extra.topRated.name, createFilmCards(getTopRatedFilms(films))).getElement(), RenderPosition.BEFOREEND);
renderElement(filmsElement, new FilmsListExtraView(filmListOptions.extra.mostComment.name, createFilmCards(getMostCommentedFilms(films))).getElement(), RenderPosition.BEFOREEND);

renderElement(footerStatisticsElement, new FooterStatisticView(films).getElement(), RenderPosition.BEFOREEND);
renderElement(footerElement, new PopupView(films[0]).getElement(), RenderPosition.AFTERBEGIN);
