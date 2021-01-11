import Observer from "../utils/observer.js";

export default class Stats extends Observer {
  constructor() {
    super();
    this._isActive = false;
  }

  getStats() {
    return this._isActive;
  }

  setStats(updateType, state) {
    this._isActive = state;
    this._notify(updateType, this._isActive);
  }

  updateStats(updateType) {
    this._isActive = !this._isActive;
    this._notify(updateType, this._isActive);
  }
}
