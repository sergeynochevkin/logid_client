import { makeAutoObservable } from "mobx";

export default class ManagementStore {
    constructor() {
        this._users = []

        makeAutoObservable(this)
    }

    setUsers(value) {
        this._users = value
    }

    setTransport(transport) {
        this._transport = transport
    }

    get users() {
        return this._users
    }
}