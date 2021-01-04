export const sortFilmByRating = (({rating: a}, {rating: b}) => b - a);
export const sortFilmByReleaseDate = (({releaseDate: a}, {releaseDate: b}) => b - a);
export const sortFilmByComments = (({comments: a}, {comments: b}) => b.length - a.length);
