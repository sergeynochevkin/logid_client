import { makeAutoObservable } from "mobx";

export default class LoadingStore {
  constructor() {
    this._loading = false;
    makeAutoObservable(this);
  }

  setLoading(loading) {
    this._loading = loading;
  }

  get loading() {
    return this._loading;
  }
}
