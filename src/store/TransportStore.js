import { makeAutoObservable } from "mobx";

export default class TransportStore {
    constructor() {
        this._transports = []
        this._transport_by_order = []
        this._transport = {}

        makeAutoObservable(this)
    }
    
    setTransports(transports) {
        this._transports = transports
    }

    setTransport(transport) {
        this._transport = transport
    }

    setTransportByOrder(value) {
        this._transport_by_order = value
    }

    get transports() {
        return this._transports
    }

    get transport() {
        return this._transport
    }
    get transport_by_order() {
        return this._transport_by_order
    }
}