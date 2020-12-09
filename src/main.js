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
import {renderTemplate} from "./utils";

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

let filmsrenderTemplateedNumber = 0;

const films = new Array(filmListOptions.main.maxCount).fill().map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const renderTemplateFilmsRow = () => {
  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  if (filmsrenderTemplateedNumber < films.length) {
    films
      .slice(filmsrenderTemplateedNumber, filmsrenderTemplateedNumber + filmListOptions.main.maxFilmsPerLine)
      .forEach((film) => {
        renderTemplate(filmsListContainerElement, createCardTemplate(film));
        filmsrenderTemplateedNumber++;
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

renderTemplate(headerElement, createProfileTemplate(user));

renderTemplate(mainElement, createMenuNavigationTemplate(user));
renderTemplate(mainElement, createSortTemplate());
renderTemplate(mainElement, createStatisticTemplate());

renderTemplate(mainElement, createFilmsTemplate());
renderTemplateFilmsRow(films);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

if (filmsrenderTemplateedNumber < films.length) {
  renderTemplate(filmsListElement, createShowMoreButtonTemplate());
  const showButton = filmsListElement.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    renderTemplateFilmsRow(films);

    if (filmsrenderTemplateedNumber === films.length) {
      showButton.remove();
    }
  });
}

renderTemplate(filmsElement, createFilmsListExtraTemplate(filmListOptions.extra.topRated.name, createFilmCards(getTopRatedFilms(films))));
renderTemplate(filmsElement, createFilmsListExtraTemplate(filmListOptions.extra.mostComment.name, createFilmCards(getMostCommentedFilms(films))));

renderTemplate(footerStatisticsElement, createFooterStatisticTemplate(films));
renderTemplate(footerElement, createPopupTemplate(films[0]), `afterend`);
