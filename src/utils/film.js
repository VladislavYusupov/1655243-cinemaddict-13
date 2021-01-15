export const sortFilmByRating = (({totalRating: a}, {totalRating: b}) => b - a);
export const sortFilmByReleaseDate = (({releaseDate: a}, {releaseDate: b}) => b - a);
export const sortFilmByComments = (({comments: a}, {comments: b}) => b.length - a.length);

export const getWatchedFilms = (films) => films.filter((film) => film.watchingDate !== null);
