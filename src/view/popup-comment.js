import AbstractView from "./abstract.js";
import PopupEmotionView from "./popup-comment-emotion";
import createPopupElement from "../createPopupElement";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const createPopupCommentTemplate = ({id, comment, emotion, author, date, isDisabled}) => {
  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${createPopupElement(emotion, PopupEmotionView)}
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(date).fromNow()}</span>
          <button class="film-details__comment-delete" data-id=${id} ${isDisabled ? `disabled` : ``}>${isDisabled ? `Deleting...` : `Delete`}</button>
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
