import { makeAutoObservable } from "mobx";

export default class AdStore {
    constructor() {
        this._customers_count = 0
        this._carriers_count = 0
        this._finished_orders_count = 0

        makeAutoObservable(this)
    }

    setCustomersCount(value) {
        this._customers_count = value
    }

    setCarriersCount(value) {
        this._carriers_count = value
    }

    setFinishedOrdersCount(value) {
        this._finished_orders_count = value
    }

    get customers_count() {
        return this._customers_count
    }

    get carriers_count() {
        return this._carriers_count
    }

    get finished_orders_count() {
        return this._finished_orders_count
    }
}