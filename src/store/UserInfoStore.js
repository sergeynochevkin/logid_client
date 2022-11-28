import { makeAutoObservable } from "mobx";

export default class UserInfoStore {
    constructor() {
        this._userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        makeAutoObservable(this)
    }

    setUserInfo(value) {
        this._userInfo = value
        localStorage.setItem('userInfo',JSON.stringify(value ))
    }

    get userInfo() {
        return this._userInfo
    }
}

