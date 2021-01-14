import AbstractView from "./abstract.js";

const createPopupCommentEmotionTemplate = (emotion) => {
  return emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``;
};

export default class PopupCommentEmotion extends AbstractView {
  constructor(emotion) {
    super();
    this._emotion = emotion;
  }

  getTemplate() {
    return createPopupCommentEmotionTemplate(this._emotion);
  }
}
