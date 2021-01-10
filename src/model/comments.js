export default class Comments {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = [...comments];
  }

  clearComments() {
    this._comments = [];
  }
}
