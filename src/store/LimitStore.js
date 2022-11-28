import { makeAutoObservable } from "mobx";

export default class LimitStore {
    constructor() {
        this._user_limits = {}
        
        this._app_limits = {}

        makeAutoObservable(this)
    }

    setUserLimits(value) {
        this._user_limits = value
    }

    setAppLimits(value) {
        this._app_limits = value
    }

    get user_limits() {
        return this._user_limits
    }

    get app_limits() {
        return this._app_limits
    }
}