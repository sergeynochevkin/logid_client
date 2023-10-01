import { makeAutoObservable } from "mobx";

export default class UserInfoStore {
    constructor() {
        this._userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        this._images = []
        makeAutoObservable(this)
    }

    setUserInfo(value) {
        this._userInfo = value
        localStorage.setItem('userInfo', JSON.stringify(value))
    }
    setImages(value) {
        this._images = value
    }

    get userInfo() {
        return this._userInfo
    }
    get images() {
        return this._images
    }
}

