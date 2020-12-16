import ProfileView from "./view/profile";
import MenuNavigationView from "./view/menu-navigation";
import SortView from "./view/sort";
import FooterStatisticView from "./view/footer-statistic";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils/render";
import FilmListPresenter from "./presenter/film-list";

const FILMS_NUMBER = 20;

const films = new Array(FILMS_NUMBER).fill({}).map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new ProfileView(user));
render(mainElement, new MenuNavigationView(user));
render(mainElement, new SortView());

new FilmListPresenter(mainElement).init(films);

render(footerStatisticsElement, new FooterStatisticView(films));
