import { makeAutoObservable } from "mobx";

export default class OfferStore {
    constructor() {
        this._offers = []
        this._offer = {}
        this._changes = {}

        makeAutoObservable(this)
    }

    setChanges(value) {
        this._changes = value
    }

    get changes() {
        return this._changes
    }

    setOffers(offers) {
        this._offers = offers
    }

    get offers() {
        return this._offers
    }

    setOffer(offer) {
        this._offer = offer
    }

    get offer() {
        return this._offer
    }
}