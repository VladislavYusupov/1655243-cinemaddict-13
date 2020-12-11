import {createProfileTemplate} from "./view/profile";
import {createMenuNavigationTemplate} from "./view/menu-navigation";
import {createSortTemplate} from "./view/sort";
import {createStatisticTemplate} from "./view/statistic";
import {createFilmsTemplate} from "./view/films";
import {createCardTemplate} from "./view/film-card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsListExtraTemplate} from "./view/films-list-extra";
import {createFooterStatisticTemplate} from "./view/footer-statistic";
import {createPopupTemplate} from "./view/popup";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";

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

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const renderFilmsRow = () => {
  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  if (filmsRenderedNumber < films.length) {
    films
      .slice(filmsRenderedNumber, filmsRenderedNumber + filmListOptions.main.maxFilmsPerLine)
      .forEach((film) => {
        render(filmsListContainerElement, createCardTemplate(film));
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

  movies.forEach((movie) => (filmCards += createCardTemplate(movie)));

  return filmCards;
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileTemplate(user));

render(mainElement, createMenuNavigationTemplate(user));
render(mainElement, createSortTemplate());
render(mainElement, createStatisticTemplate());

render(mainElement, createFilmsTemplate());
renderFilmsRow(films);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

if (filmsRenderedNumber < films.length) {
  render(filmsListElement, createShowMoreButtonTemplate());
  const showButton = filmsListElement.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    renderFilmsRow(films);

    if (filmsRenderedNumber === films.length) {
      showButton.remove();
    }
  });
}

render(filmsElement, createFilmsListExtraTemplate(filmListOptions.extra.topRated.name, createFilmCards(getTopRatedFilms(films))));
render(filmsElement, createFilmsListExtraTemplate(filmListOptions.extra.mostComment.name, createFilmCards(getMostCommentedFilms(films))));

render(footerStatisticsElement, createFooterStatisticTemplate(films));
render(footerElement, createPopupTemplate(films[0]), `afterend`);
