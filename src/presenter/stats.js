import {render, replace, remove} from "../utils/render.js";
import MenuNavigationStatsView from "../view/menu-navigation-stats";
import {FilterType, UpdateType} from "../const";

export default class Stats {
  constructor(statsContainer, filterModel, statsModel, filmsModel) {
    this._statsContainer = statsContainer;
    this._filterModel = filterModel;
    this._statsModel = statsModel;
    this._filmsModel = filmsModel;
    this._isActiveStats = false;

    this._menuNavigationStatsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._statsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._isActiveStats = this._statsModel.getStats();
    const prevMenuNavigationStatsComponent = this._menuNavigationStatsComponent;

    this._menuNavigationStatsComponent = new MenuNavigationStatsView(this._isActiveStats);
    this._menuNavigationStatsComponent.setClickHandler(this._handleStatsClick);

    if (prevMenuNavigationStatsComponent === null) {
      render(this._statsContainer, this._menuNavigationStatsComponent);
      return;
    }

    replace(this._menuNavigationStatsComponent, prevMenuNavigationStatsComponent);
    remove(prevMenuNavigationStatsComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleStatsClick() {
    this._statsModel.updateStats(UpdateType.SWITCH_SCREEN);

    if (this._statsModel.getStats()) {
      this._filterModel.setFilter(null, FilterType.NONE);
    } else {
      this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    }
  }
}
