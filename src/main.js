import ProfileView from "./view/profile";
import FooterStatisticView from "./view/footer-statistic";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils/render";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import FilmListPresenter from "./presenter/film-list";
import FilterPresenter from "./presenter/filter";
import {UpdateType} from "./const";

const FILMS_NUMBER = 20;

const films = new Array(FILMS_NUMBER).fill({}).map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.setFilms(UpdateType.INIT, films);

const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new ProfileView(user));
render(footerStatisticsElement, new FooterStatisticView(films));

filterPresenter.init();
filmListPresenter.init();
