import { makeAutoObservable } from "mobx";

export default class ManagementStore {
    constructor() {
        this._users = []
        this._transports = []
        this._orders = []

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

    get users() {
        return this._users
    }
    get transports() {
        return this._transports
    }
    get orders() {
        return this._orders
    }
}