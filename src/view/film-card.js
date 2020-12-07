export const createCardTemplate = ({title, poster, description, rating, comments}) => {
  const DESCRIPTION_MAX_LENGTH = 140;

  const limitDescription = (text) => {
    return text.length > DESCRIPTION_MAX_LENGTH
      ? `${text.slice(0, DESCRIPTION_MAX_LENGTH - 1)}...`
      : text;
  };

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${limitDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
};
