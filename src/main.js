import FooterStatisticView from "./view/footer-statistics";
import {render} from "./utils/render";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import StatsModel from "./model/stats";
import FilmsPresenter from "./presenter/films";
import FilterPresenter from "./presenter/filter";
import StatsPresenter from "./presenter/stats";
import StatisticsPresenter from "./presenter/statistics";
import ProfilePresenter from "./presenter/profile";
import MenuNavigationView from "./view/menu-navigation";
import Api from "./api";
import {UpdateType} from "./const";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const api = new Api(END_POINT, AUTHORIZATION);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const menuNavigationComponent = new MenuNavigationView();

const filterModel = new FilterModel();
const statsModel = new StatsModel();
const filmsModel = new FilmsModel();

const profilePresenter = new ProfilePresenter(headerElement, filmsModel);
const filmsPresenter = new FilmsPresenter(mainElement, filmsModel, filterModel, statsModel);
const filterPresenter = new FilterPresenter(menuNavigationComponent, filterModel, filmsModel, statsModel);
const statsPresenter = new StatsPresenter(menuNavigationComponent, filterModel, statsModel, filmsModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, statsModel, filmsModel);

render(mainElement, menuNavigationComponent);

profilePresenter.init();
filterPresenter.init();
statsPresenter.init();
filmsPresenter.init();
statisticsPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticsElement, new FooterStatisticView(films));
  });
