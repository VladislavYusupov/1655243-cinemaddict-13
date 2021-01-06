import ProfileView from "./view/profile";
import FooterStatisticView from "./view/footer-statistic";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils/render";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import FilmListPresenter from "./presenter/film-list";
import FilterPresenter from "./presenter/filter";
import MenuNavigationStatsView from "./view/menu-navigation-stats";
import MenuNavigationView from "./view/menu-navigation";
import StatisticsView from "./view/statistics";

const FILMS_NUMBER = 20;

const films = new Array(FILMS_NUMBER).fill({}).map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const menuNavigationComponent = new MenuNavigationView();
const menuNavigationStatsComponent = new MenuNavigationStatsView();
let statsComponent = null;

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(menuNavigationComponent, filterModel, filmsModel);

render(headerElement, new ProfileView(user));
render(mainElement, menuNavigationComponent);
render(footerStatisticsElement, new FooterStatisticView(films));

const handleStatsClick = (isActive) => {
  if (isActive) {
    filmListPresenter.hide();

    if (statsComponent === null) {
      statsComponent = new StatisticsView();
      render(mainElement, statsComponent);
      return;
    }
    statsComponent.show();
  } else {
    filmListPresenter.show();
    statsComponent.hide();
  }
};

filterPresenter.init();
filmListPresenter.init();
menuNavigationStatsComponent.setClickHandler(handleStatsClick);

render(menuNavigationComponent, menuNavigationStatsComponent);
