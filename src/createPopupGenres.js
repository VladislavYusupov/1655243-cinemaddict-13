import PopupGenreView from "./view/popup-genre";

const createPopupGenres = (genres) => {
  let genreTemplates = [];

  for (const genre of genres) {
    const genreTemplate = new PopupGenreView(genre).getTemplate();
    genreTemplates.push(genreTemplate);
  }

  return genreTemplates.join(``);
};

export default createPopupGenres;
