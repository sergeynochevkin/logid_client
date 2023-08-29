import { makeAutoObservable } from "mobx";

export default class AdressStore {

    constructor() {

        this._countries = []
        this._cities = []
        this._country = {}
        this._country_detected = true
        // this._country = localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')) : {}

        this._location = {}

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

    setCities(value) {
        this._cities = value
    }

    get cities() {
        return this._cities
    }

    setLocation(value) {
        this._location = value
    }

    get location() {
        return this._location
    }
}



