import { makeAutoObservable } from "mobx";

export default class DriverStore {
    constructor() {
        this._drivers = []


        makeAutoObservable(this)
    }

    setDrivers(value) {
        this._drivers = value
    }

    get drivers() {
        return this._drivers
    }

}