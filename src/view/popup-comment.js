import AbstractView from "./abstract.js";
import {POPUP_COMMENT_DAY_FORMAT} from "../const";
import dayjs from "dayjs";

const createPopupCommentTemplate = ({message, emoji, author, date}) => {
  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(date).format(POPUP_COMMENT_DAY_FORMAT)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};

export default class PopupComment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createPopupCommentTemplate(this._comment);
  }
}
