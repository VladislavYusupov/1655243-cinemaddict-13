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

const HEADER_ELEMENT = document.querySelector(`.header`);
const MAIN_ELEMENT = document.querySelector(`.main`);
const FOOTER_ELEMENT = document.querySelector(`footer`);
const FOOTER_STATISTICS_ELEMENT = FOOTER_ELEMENT.querySelector(
  `.footer__statistics`
);

const FILM_LIST_OPTIONS = {
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

render(HEADER_ELEMENT, createProfileTemplate());

render(MAIN_ELEMENT, createMenuNavigationTemplate());
render(MAIN_ELEMENT, createSortTemplate());
render(MAIN_ELEMENT, createStatisticTemplate());

render(
  MAIN_ELEMENT,
  createFilmsTemplate(createFilmList(FILM_LIST_OPTIONS.main.maxCount))
);

const FILMS_ELEMENT = MAIN_ELEMENT.querySelector(`.films`);
const FILMS_LIST_ELEMENT = MAIN_ELEMENT.querySelector(`.films-list`);

render(FILMS_LIST_ELEMENT, createShowMoreButtonTemplate());

render(
  FILMS_ELEMENT,
  createFilmsListExtraTemplate(
    FILM_LIST_OPTIONS.extra.topRated.name,
    createFilmList(FILM_LIST_OPTIONS.extra.maxCount)
  )
);

render(
  FILMS_ELEMENT,
  createFilmsListExtraTemplate(
    FILM_LIST_OPTIONS.extra.mostComment.name,
    createFilmList(FILM_LIST_OPTIONS.extra.maxCount)
  )
);

render(FOOTER_STATISTICS_ELEMENT, createFooterStatisticTemplate());
render(FOOTER_ELEMENT, createPopupTemplate(), `afterend`);
