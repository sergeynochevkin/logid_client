import { makeAutoObservable } from "mobx";

export default class FetcherStore {
    constructor() {
        this._server_notifications = false
        this._subscriptions = false
        this._user_state = false
        this._partners = false


        makeAutoObservable(this)
    }
    //set
    setServerNotifications(value) {
        this._server_notifications = value
    }
    setSubscriptions(value) {
        this._subscriptions = value
    }
    setUserState(value) {
        this._user_state = value
    }
    setPartners(value) {
        this._partners = value
    }

    //get
    get server_notifications() {
        return this._server_notifications
    }
    get subscriptions() {
        return this._subscriptions
    }
    get user_state() {
        return this._user_state
    }
    get partners() {
        return this._partners
    }

}