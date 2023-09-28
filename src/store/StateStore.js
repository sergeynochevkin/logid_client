import { makeAutoObservable } from "mobx";
import { updateUserState } from "../http/stateApi";

export default class StateStore {
    constructor() {
        this._user_state = {}
        this._supervisor_state = {cities:[]}
        this._app_state = {}

        makeAutoObservable(this)
    }
    async setUserStateField(value, option, userInfoId) {
        this._user_state[option] = value
        await updateUserState(JSON.stringify(this._user_state), userInfoId)
    }
    setUserState(value) {
        this._user_state = value
    }
    setSupervisorState(value) {
        this._supervisor_state = value
    }
    setAppState(value, option) {
        this._app_state[option] = value
    }
    get user_state() {
        return this._user_state
    }
    get app_state() {
        return this._app_state
    }
    get supervisor_state() {
        return this._supervisor_state
    }
}