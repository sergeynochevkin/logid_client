import { makeAutoObservable } from "mobx";

export default class LinktStore {
    constructor() {
        this._refer = { action: '', id: '' }
        this._order = { status: '', id: '' }
        this._internet_speed = ''
        this._internet = false
        this._after_actions = {
            add_transport_form: false,
            driver_activation:false, 
            add_order:false            
        }

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
    setInternet(value) {
        this._internet = value
    }
    setAfterActions(value, option) {
        this._after_actions[option] = value
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
    get internet() {
        return this._internet
    }
    get after_actions() {
        return this._after_actions
    }
}