import ProfileView from "./view/profile";
import MenuNavigationView from "./view/menu-navigation";
import SortView from "./view/sort";
import StatisticView from "./view/statistic";
import FilmsView from "./view/films";
import CardView from "./view/film-card";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsListExtraView from "./view/films-list-extra";
import FooterStatisticView from "./view/footer-statistic";
import PopupView from "./view/popup";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {render} from "./utils";

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

const films = new Array(filmListOptions.main.maxCount).fill().map(generateFilm);
const user = generateUser();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const popupComponent = new PopupView();

const addMovieCardListeners = (cardComponent, callBack) => {
  const cardElement = cardComponent.getElement();
  const movieData = cardComponent.getFilm();

  cardElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    callBack(movieData);
  });
};

const deletePopup = () => {
  document.removeEventListener(`keydown`, onEscKeyDown);
  document.body.classList.remove(`hide-overflow`);
  document.body.removeChild(popupComponent.getElement());
  popupComponent.removeElement();
};

const onMovieCardClick = (movieData) => {
  popupComponent.setFilm(movieData);
  const popupElement = popupComponent.getElement();

  document.addEventListener(`keydown`, onEscKeyDown);
  popupElement.querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    deletePopup();
  });

  document.body.appendChild(popupElement);
  document.body.classList.add(`hide-overflow`);
};

const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    deletePopup();
  }
};

const renderTemplateFilmsRow = () => {
  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  if (filmsRenderedNumber < films.length) {
    films
      .slice(filmsRenderedNumber, filmsRenderedNumber + filmListOptions.main.maxFilmsPerLine)
      .forEach((film) => {
        const filmCardComponent = new CardView(film);

        addMovieCardListeners(filmCardComponent, onMovieCardClick);

        render(filmsListContainerElement, filmCardComponent.getElement());
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

const createFilmCard = (film) => {
  let filmComponent = new CardView(film);
  addMovieCardListeners(filmComponent, onMovieCardClick);

  return filmComponent;
};

const createFilmCards = (movies) => {
  let filmCards = ``;

  movies.forEach((movie) => {
    const filmComponent = new CardView(movie);
    addMovieCardListeners(filmComponent, onMovieCardClick);
    filmCards += filmComponent.getTemplate();
  });

  return filmCards;
};

render(headerElement, new ProfileView(user).getElement());

render(mainElement, new MenuNavigationView(user).getElement());
render(mainElement, new SortView(user).getElement());
render(mainElement, new StatisticView().getElement());

render(mainElement, new FilmsView().getElement());
renderTemplateFilmsRow(films);

const filmsElement = mainElement.querySelector(`.films`);
const filmsListElement = mainElement.querySelector(`.films-list`);

if (filmsRenderedNumber < films.length) {
  render(filmsListElement, new ShowMoreButtonView().getElement());
  const showButton = filmsListElement.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    renderTemplateFilmsRow(films);

    if (filmsRenderedNumber === films.length) {
      showButton.remove();
    }
  });
}

render(filmsElement, new FilmsListExtraView(filmListOptions.extra.topRated.name, createFilmCards(getTopRatedFilms(films))).getElement());
render(filmsElement, new FilmsListExtraView(filmListOptions.extra.mostComment.name, createFilmCards(getMostCommentedFilms(films))).getElement());

render(footerStatisticsElement, new FooterStatisticView(films).getElement());
