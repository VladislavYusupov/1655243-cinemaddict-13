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
import {render, RenderPosition} from "./utils";

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
        render(filmsListContainerElement, new CardView(film).getElement());
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

render(headerElement, new ProfileView(user).getElement());

render(mainElement, new MenuNavigationView(user).getElement());
render(mainElement, new SortView(user).getElement());
render(mainElement, new StatisticView().getElement());

render(mainElement, new FilmsView().getElement());
renderTemplateFilmsRow(films);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

if (filmsRenderedNumber < films.length) {
  render(filmsListElement, new ShowMoreButtonView().getElement());
  const showButton = filmsListElement.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    renderTemplateFilmsRow(films);

    if (filmsRenderedNumber === films.length) {
      showButton.remove();
    }
  });
}

render(filmsElement, new FilmsListExtraView(filmListOptions.extra.topRated.name, createFilmCards(getTopRatedFilms(films))).getElement());
render(filmsElement, new FilmsListExtraView(filmListOptions.extra.mostComment.name, createFilmCards(getMostCommentedFilms(films))).getElement());

render(footerStatisticsElement, new FooterStatisticView(films).getElement());
render(footerElement, new PopupView(films[0]).getElement(), RenderPosition.AFTERBEGIN);
