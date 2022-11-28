import { makeAutoObservable } from "mobx";

export default class SubscriptionStore {
    constructor() {
        this._plans = []
        this._options = []
        this._options_by_plans = []
        this._subscription = {}

        makeAutoObservable(this)
    }


    setSubscription(value) {
        this._subscription = value
    }
    get subscription() {
        return this._subscription
    }
    setPlans(value) {
        this._plans = value
    }
    get plans() {
        return this._plans
    }
    setOptions(value) {
        this._options = value
    }
    get options() {
        return this._options
    }
    setOptionsByPlans(value) {
        this._options_by_plans = value
    }
    get options_by_plans() {
        return this._options_by_plans
    }
}