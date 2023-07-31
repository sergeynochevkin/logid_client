import { makeAutoObservable } from "mobx";

export default class AdressStore {

    constructor() {

        this._countries = []
        //temporary one country
        this._country = { value: 'russia', country_code_iso3: 'RUS', default_language: 'russian', google_code: 'RU', currency: 'RUR', google_language: 'ru', weight: 'tonn', distance: 'kilometer', sector: 'one' }
        //temporary one country
        this._country_detected = true
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

    setCountryDetected(value) {
        this._country_detected = value
    }

    get country_detected() {
        return this._country_detected
    }
}



