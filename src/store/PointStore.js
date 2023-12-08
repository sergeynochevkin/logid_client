import { makeAutoObservable } from "mobx";

export default class PointStore {
  constructor() {
    this._points = [];
    this._divided_points = {
      new: [],
      inWork: [],
      completed: [],
      canceled: [],
      postponed: [],
      arc: [],
      pattern: [],
    };
    this._thisOrderPoints = localStorage.getItem("thisOrderPoints")
      ? JSON.parse(localStorage.getItem("thisOrderPoints"))
      : [];
    this._point = {};
    this._added = {};
    this._pattern = JSON.stringify("");

    makeAutoObservable(this);
  }

  setDividedPoints(value, componentFunction) {
    this._divided_points[componentFunction] = value;
  }

  get divided_points() {
    return this._divided_points;
  }

  setPattern(value) {
    this._pattern = value;
  }

  get pattern() {
    return this._pattern;
  }

  setPoints(points) {
    this._points = points;
  }

  setThisOrderPoints(value) {
    this._thisOrderPoints = value;
    localStorage.setItem("thisOrderPoints", JSON.stringify(value));
  }

  setPoint(point) {
    this._point = point;
  }

  get points() {
    return this._points;
  }

  get thisOrderPoints() {
    return this._thisOrderPoints;
  }

  get point() {
    return this._point;
  }

  setAdded(value) {
    this._added = value;
  }
  get added() {
    return this._added;
  }
}
