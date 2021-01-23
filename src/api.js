import FilmsModel from "./model/films";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const AUTH_TYPE = `Basic`;

export default class Api {
  constructor(endPoint, authToken) {
    this._endPoint = endPoint;
    this._authToken = authToken;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON);
  }

  createComment(filmId, localComment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(localComment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, `${AUTH_TYPE} ${this._authToken}`);

    url = `${this._endPoint}/${url}`;
    const data = {method, body, headers};

    return fetch(url, data)
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
