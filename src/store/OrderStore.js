import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export default class OrderStore {
  constructor() {
    this._orders = [];
    this._order_images = [];
    this._integrationId = "";

    this._files = [];
    this._pairs = [];

    this._divided_orders = {
      new: [],
      inWork: [],
      completed: [],
      canceled: [],
      postponed: [],
      arc: [],
      pattern: [],
    };

    this._views = {
      new: [],
      postponed: [],
    };

    this._map_orders = [];
    this._group = localStorage.getItem("groupOrders")
      ? JSON.parse(localStorage.getItem("groupOrders"))
      : [];
    this._sortedAndFilteredOrders = [];
    this._order =
      localStorage.getItem("order") &&
      localStorage.getItem("order") !== "undefined"
        ? JSON.parse(localStorage.getItem("order"))
        : {};
    this._added = {};
    this._totalCount = {
      new: 0,
      inWork: 0,
      completed: 0,
      canceled: 0,
      postponed: 0,
      arc: 0,
      pattern: 0,
    };
    this._filtered_count = {
      new: 0,
      inWork: 0,
      completed: 0,
      canceled: 0,
      postponed: 0,
      arc: 0,
      pattern: 0,
    };

    this._pattern = localStorage.getItem("orderPattern")
      ? JSON.parse(localStorage.getItem("orderPattern"))
      : JSON.stringify("");

    makeAutoObservable(this);
  }

  setFilteredCount(value, ComponentFunction) {
    this._filtered_count[ComponentFunction] = value;
  }

  get filtered_count() {
    return this._filtered_count;
  }

  setViews(value, order_status) {
    this._views[order_status] = value;
  }

  get views() {
    return this._views;
  }

  setIntegrationId() {
    this._integrationId = v4();
  }

  get integrationId() {
    return this._integrationId;
  }

  setPattern(value) {
    this._pattern = value;
    localStorage.setItem("orderPattern", JSON.stringify(value));
  }

  setPatternForWho(value, option) {
    this._pattern_for_who[option] = value;
    localStorage.setItem(
      "orderPatternForWho",
      JSON.stringify(this._pattern_for_who)
    );
  }

  get pattern() {
    return this._pattern;
  }
  get pattern_for_who() {
    return this._pattern_for_who;
  }

  setSelected(value) {
    this._selected = value;
  }

  get selected() {
    return this._selected;
  }

  setGroup(value) {
    this._group = value;
    localStorage.setItem("groupOrders", JSON.stringify(value));
  }

  get group() {
    return this._group;
  }

  setTotalCount(value, componentFunction) {
    this._totalCount[componentFunction] = value;
  }

  get totalCount() {
    return this._totalCount;
  }
  setDividedOrders(value, componentFunction) {
    this._divided_orders[componentFunction] = value;
  }

  get divided_orders() {
    return this._divided_orders;
  }

  setAdded(value) {
    this._added = value;
  }
  get added() {
    return this._added;
  }

  setOrders(orders) {
    this._orders = orders;
  }
  get orders() {
    return this._orders;
  }

  setMapOrders(value) {
    this._map_orders = value;
  }
  get map_orders() {
    return this._map_orders;
  }

  setSortedAndFilteredOrders(sortedAndFilteredOrders) {
    this._sortedAndFilteredOrders = sortedAndFilteredOrders;
  }
  get sortedAndFilteredOrders() {
    return this._sortedAndFilteredOrders;
  }

  setOrder(order) {
    this._order = order;
    localStorage.setItem("order", JSON.stringify(order));
  }
  get order() {
    return this._order;
  }

  setOrderImages(value) {
    this._order_images = value;
  }

  get order_images() {
    return this._order_images;
  }

  setFiles(value) {
    this._files = value;
  }

  get files() {
    return this._files;
  }

  setPairs(value) {
    this._pairs = value;
  }

  get pairs() {
    return this._pairs;
  }
}
