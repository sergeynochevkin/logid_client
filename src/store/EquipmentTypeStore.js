import { makeAutoObservable } from "mobx";

export default class EquipmentTypeStore {

    constructor() {
        this._types = []

        makeAutoObservable(this)
    }

    setTypes(value) {
        this._types = value
    }

    get types() {
        return this._types
    }
}

