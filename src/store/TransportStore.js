import { makeAutoObservable } from "mobx";

export default class TransportStore {
    constructor() {
        this._transports = []
        this._transport = {}
       
        makeAutoObservable(this)
    }

    setTransports(transports) {
        this._transports = transports
    }

    setTransport(transport) {
        this._transport = transport
    } 

    get transports() {
        return this._transports
    }

    get transport() {
        return this._transport
    }   
}