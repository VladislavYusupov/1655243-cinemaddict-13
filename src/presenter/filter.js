import FilterView from "../view/menu-navigation-filters.js";
import {render, replace, remove} from "../utils/render.js";
import {FilterType, UpdateType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, statsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._statsModel = statsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleFilterModelEvent);
    this._filterModel.addObserver(this._handleFilterModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFilterModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.RERENDER_WITH_DEFAULT_PRESENTER_SETTINGS, filterType);
    this._statsModel.setStats(UpdateType.RENDER_OTHER_PAGE, false);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return {
      [FilterType.WATCHLIST]: filter[FilterType.WATCHLIST](films).length,
      [FilterType.HISTORY]: filter[FilterType.HISTORY](films).length,
      [FilterType.FAVORITES]: filter[FilterType.FAVORITES](films).length
    };
  }
}
