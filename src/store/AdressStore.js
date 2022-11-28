import { makeAutoObservable } from "mobx";

export default class AdressStore {

    constructor() {

        this._countries = []
        this._country = {}

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
    }

    get country() {
        return this._country
    }
}


