import { makeAutoObservable } from "mobx";

export default class AdressStore {

    constructor() {

        this._countries = []
        this._country =  {}
        // this._country = localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')) : {}

        makeAutoObservable(this)
    }

    setCountries(value) {
        this._countries = value
    }

    get countries() {
        return this._countries
    }

    setCountry(value) {
        this._country = value
        localStorage.setItem('country', JSON.stringify(value))
    }

    get country() {
        return this._country
    }
}


