import { makeAutoObservable } from "mobx";

export default class LinktStore {
    constructor() {
        this._refer = { action: '', id: '' }
        this._order = { status: '', id: '' }
        this._internet_speed = ''

        makeAutoObservable(this)
    }

    setRefer(value, item) {
        this._refer[item] = value
    }

    setOrder(value, item) {
        this._order[item] = value
    }

    setInternetSpeed(value) {
        this._internet_speed = value
    }

    get order() {
        return this._order
    }

    get refer() {
        return this._refer
    }
    get internet_speed() {
        return this._internet_speed
    }
}