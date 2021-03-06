import {render, replace, remove} from "../utils/render.js";
import MenuNavigationStatsView from "../view/menu-navigation-stats";
import {FilterType, UpdateType} from "../const";

export default class Stats {
  constructor(statsContainer, filterModel, statsModel, filmsModel) {
    this._statsContainer = statsContainer;
    this._filterModel = filterModel;
    this._statsModel = statsModel;
    this._filmsModel = filmsModel;
    this._isLoading = true;

    this._menuNavigationStatsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._statsModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._statsState = this._statsModel.getStatsState();
    const prevMenuNavigationStatsComponent = this._menuNavigationStatsComponent;

    this._menuNavigationStatsComponent = new MenuNavigationStatsView(this._statsState);

    if (!this._isLoading) {
      this._menuNavigationStatsComponent.setClickHandler(this._handleStatsClick);
    }

    if (prevMenuNavigationStatsComponent === null) {
      render(this._statsContainer, this._menuNavigationStatsComponent);
      return;
    }

    replace(this._menuNavigationStatsComponent, prevMenuNavigationStatsComponent);
    remove(prevMenuNavigationStatsComponent);
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.LOAD_FILMS) {
      this._isLoading = false;
    }

    this.init();
  }

  _handleStatsClick() {
    this._statsModel.updateStatsState(UpdateType.RENDER_OTHER_PAGE);

    if (this._statsModel.getStatsState()) {
      this._filterModel.setFilter(null, FilterType.NONE);
    } else {
      this._filterModel.setFilter(UpdateType.RERENDER_WITH_DEFAULT_PRESENTER_SETTINGS, FilterType.ALL);
    }
  }
}
