import Observer from "../utils/observer.js";

export default class Stats extends Observer {
  constructor() {
    super();
    this._statsState = false;
  }

  getStatsState() {
    return this._statsState;
  }

  setStatsState(updateType, state) {
    this._statsState = state;
    this._notify(updateType, this._statsState);
  }

  updateStatsState(updateType) {
    this._statsState = !this._statsState;
    this._notify(updateType, this._statsState);
  }
}
