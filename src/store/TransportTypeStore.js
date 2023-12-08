import { makeAutoObservable } from "mobx";

export default class TransportTypeStore {
  constructor() {
    this._types = [];

    this._side_types = [];

    this._load_capacities = [];
    makeAutoObservable(this);
  }

  get types() {
    return this._types;
  }

  get side_types() {
    return this._side_types;
  }

  get load_capacities() {
    return this._load_capacities;
  }

  setTypes(value) {
    this._types = value;
  }

  setSideTypes(value) {
    this._side_types = value;
  }

  setLoadCapacities(value) {
    this._load_capacities = value;
  }
}
