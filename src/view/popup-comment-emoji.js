import AbstractView from "./abstract.js";

const createPopupCommentEmojiTemplate = (emoji) => {
  return emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``;
};

export default class PopupCommentEmoji extends AbstractView {
  constructor(emoji) {
    super();
    this._emoji = emoji;
  }

  getTemplate() {
    return createPopupCommentEmojiTemplate(this._emoji);
  }
}
