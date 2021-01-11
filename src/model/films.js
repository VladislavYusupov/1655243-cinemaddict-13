import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = [...films];
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const filmInfo = film.film_info;
    const userDetails = film.user_details;
    const {id, comments} = film;
    const {title, poster, director, writers, actors, release, runtime, genre, description} = filmInfo;
    const {watchlist, favorite} = userDetails;

    const adaptedFilm = {
      id,
      comments,
      title,
      alternativeTitle: filmInfo.alternative_title,
      totalRating: filmInfo.total_rating,
      poster,
      ageRating: filmInfo.age_rating,
      director,
      writers,
      actors,
      releaseDate: release.date !== null ? new Date(release.date) : release.date,
      country: release.release_country,
      runtime,
      genre,
      description,
      watchList: watchlist,
      alreadyWatched: userDetails.already_watched,
      watchingDate: userDetails.watching_date !== null ? new Date(userDetails.watching_date) : userDetails.watching_date,
      favorite
    };

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = {
      "watchlist": film.watchList,
      "already_watched": film.alreadyWatched,
      "watching_date": film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
      "favorite": film.favorite
    };

    return adaptedFilm;
  }
}
