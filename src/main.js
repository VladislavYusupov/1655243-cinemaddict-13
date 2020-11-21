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

const siteBody = document.body;

const selectors = {
  classes: {
    header: `.header`,
    main: `.main`,
    footer: `footer`,
    films: `.films`,
    filmsList: `.films-list`,
    footerStatistics: `.footer__statistics`,
  },
};

const siteElements = {
  header: siteBody.querySelector(selectors.classes.header),
  main: siteBody.querySelector(selectors.classes.main),
  footer: siteBody.querySelector(selectors.classes.footer),
  get films() {
    return this.main.querySelector(selectors.classes.films);
  },
  get filmsList() {
    return this.main.querySelector(selectors.classes.filmsList);
  },
  get footerStatistics() {
    return this.footer.querySelector(selectors.classes.footerStatistics);
  },
};

const filmListOptions = {
  main: {
    maxCount: 5,
  },
  extra: {
    topRated: {
      name: "Top rated",
    },
    mostComment: {
      name: "Most comment",
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

render(siteElements.header, createProfileTemplate());

render(siteElements.main, createMenuNavigationTemplate());
render(siteElements.main, createSortTemplate());
render(siteElements.main, createStatisticTemplate());

render(
  siteElements.main,
  createFilmsTemplate(createFilmList(filmListOptions.main.maxCount))
);

render(siteElements.filmsList, createShowMoreButtonTemplate());

render(
  siteElements.films,
  createFilmsListExtraTemplate(
    filmListOptions.extra.topRated.name,
    createFilmList(filmListOptions.extra.maxCount)
  )
);

render(
  siteElements.films,
  createFilmsListExtraTemplate(
    filmListOptions.extra.mostComment.name,
    createFilmList(filmListOptions.extra.maxCount)
  )
);

render(siteElements.footerStatistics, createFooterStatisticTemplate());
render(siteElements.footer, createPopupTemplate(), `afterend`);
