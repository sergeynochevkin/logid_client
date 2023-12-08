import { makeAutoObservable } from "mobx";

export default class TranslateStore {
  constructor() {
    this._language = "";
    this._translation = [];
    makeAutoObservable(this);
  }

  setTranslation(value) {
    this._translation = value;
  }

  get translation() {
    return this._translation;
  }

  setLanguage(value) {
    this._language = value;
    localStorage.setItem("language", value);
  }

  get language() {
    return this._language;
  }
}
