import AbstractView from "./abstract.js";

const createEmojiImageTemplate = (emoji) => {
  return emoji ? `<img src="./images/emoji/${emoji}.png" width="50" height="50" alt="emoji-${emoji}">` : ``;
};

export default class EmojiImage extends AbstractView {
  constructor(emoji) {
    super();
    this._emoji = emoji;
  }

  getTemplate() {
    return createEmojiImageTemplate(this._emoji);
  }
}
