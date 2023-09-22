import { makeAutoObservable } from "mobx";

export default class ManagementStore {
    constructor() {
        this._users = []
        this._transports = []
        this._transport_images = []
        this._orders = []
        this._visits = {}
        this._registrations = {}

        makeAutoObservable(this)
    }

    setUsers(value) {
        this._users = value
    }
    setTransports(value) {
        this._transports = value
    }
    setOrders(value) {
        this._orders = value
    }
    setTransportImages(value) {
        this._transport_images = value
    }
    setVisits(value) {
        this._visits = value
    }
    setRegistrations(value) {
        this._registrations = value
    }

    get users() {
        return this._users
    }
    get transports() {
        return this._transports
    }
    get orders() {
        return this._orders
    }
    get transport_images() {
        return this._transport_images
    }
    get visits() {
        return this._visits
    }
    get registrations() {
        return this._registrations
    }
}