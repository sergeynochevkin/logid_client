import { makeAutoObservable } from "mobx";

export default class TranslateStore {
    constructor() {
        this._language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : ''

        this._translation = localStorage.getItem('translation') ? JSON.parse(localStorage.getItem('translation')) : []

        makeAutoObservable(this)
    }

    setTranslation(value) {
        this._translation = value
        localStorage.setItem('translation', JSON.stringify(value))
    }

    get translation() {
        return this._translation
    }

    setLanguage(value) {
        this._language = value
        localStorage.setItem('language', JSON.stringify(value))
    }

    get language() {
        return this._language
    }
}




