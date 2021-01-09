import ProfileView from "./view/profile";
import FooterStatisticView from "./view/footer-statistic";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils/render";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import StatsModel from "./model/stats";
import FilmListPresenter from "./presenter/film-list";
import FilterPresenter from "./presenter/filter";
import StatsPresenter from "./presenter/stats";
import StatisticsPresenter from "./presenter/statistics";
import MenuNavigationView from "./view/menu-navigation";

const FILMS_NUMBER = 20;

const films = new Array(FILMS_NUMBER).fill({}).map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const menuNavigationComponent = new MenuNavigationView();

const filterModel = new FilterModel();
const statsModel = new StatsModel();
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel, statsModel);
const filterPresenter = new FilterPresenter(menuNavigationComponent, filterModel, filmsModel, statsModel);
const statsPresenter = new StatsPresenter(menuNavigationComponent, filterModel, statsModel, filmsModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, null, statsModel, filmsModel);

render(headerElement, new ProfileView(user));
render(mainElement, menuNavigationComponent);
render(footerStatisticsElement, new FooterStatisticView(films));

filterPresenter.init();
statsPresenter.init();
filmListPresenter.init();
statisticsPresenter.init();
