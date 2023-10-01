import { makeAutoObservable } from "mobx";

export default class DriverStore {
    constructor() {
        this._drivers = []
        this._driver = {}
        this._images = []

        makeAutoObservable(this)
    }

    setDrivers(value) {
        this._drivers = value
    }
    setDriver(value) {
        this._driver = value
    }
    setImages(value) {
        this._images = value
    }

    get drivers() {
        return this._drivers
    }
    get driver() {
        return this._driver
    }
    get images() {
        return this._images
    }

}