import { createProfileTemplate } from "./view/profile";
import { createMenuNavigationTemplate } from "./view/menu-navigation";
import { createSortTemplate } from "./view/sort";
import { createStatisticTemplate } from "./view/statistic";
import { createFilmsTemplate } from "./view/films";
import { createCardTemplate } from "./view/film-card";
import { createShowMoreButtonTemplate } from "./view/show-more-button";
import { createFilmsListExtraTemplate } from "./view/films-list-extra";
import { createFooterStatisticTemplate } from "./view/footer-statistic";
import { createPopupTemplate } from "./view/popup";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(
  `.footer__statistics`
);

const filmListOptions = {
  main: {
    maxCount: 5,
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

const createFilmList = (count) => {
  let filmsList = ``;

  for (let i = 0; i < count; i++) {
    filmsList += createCardTemplate();
  }

  return filmsList;
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileTemplate());

render(mainElement, createMenuNavigationTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createStatisticTemplate());

render(
  mainElement,
  createFilmsTemplate(createFilmList(filmListOptions.main.maxCount))
);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

render(filmsListElement, createShowMoreButtonTemplate());

render(
  filmsElement,
  createFilmsListExtraTemplate(
    filmListOptions.extra.topRated.name,
    createFilmList(filmListOptions.extra.maxCount)
  )
);

render(
  filmsElement,
  createFilmsListExtraTemplate(
    filmListOptions.extra.mostComment.name,
    createFilmList(filmListOptions.extra.maxCount)
  )
);

render(footerStatisticsElement, createFooterStatisticTemplate());
render(footerElement, createPopupTemplate(), `afterend`);
