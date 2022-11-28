import { makeAutoObservable } from "mobx";

export default class PartnerStore {
    constructor() {
        this._partners = []
        this._partnerInfos = []
        this._partner = {}
        this._partnerInfo = {}

        this._noPartnerInfos = []
        this._noPartnerInfo = {}

        this._myBlocked = []
        this._myFavorite = []
        this._iAmBlocked = []
        this._iAmFavorite = []

        this._groups = []

        makeAutoObservable(this)
    }

    setGroups(value) {
        this._groups = value
    }

    get groups() {
        return this._groups
    }

    setPartners(partners) {
        this._partners = partners
    }

    setPartnerInfos(partnerInfos) {
        this._partnerInfos = partnerInfos
    }

    setPartner(partner) {
        this._partner = partner
    }

    setPartnerInfo(partnerInfo) {
        this._partnerInfo = partnerInfo
    }

    setNoPartnerInfos(noPartnerInfos) {
        this._noPartnerInfos = noPartnerInfos
    }

    setMyBlocked(myBlocked) {
        this._myBlocked = myBlocked
    }

    setMyFavorite(myFavorite) {
        this._myFavorite = myFavorite

    }
    setIAmBlocked(iAmBlocked) {
        this._iAmBlocked = iAmBlocked
    }
    setIAmFavorite(iAmFavorite) {
        this._iAmFavorite = iAmFavorite
    }

    get partners() {
        return this._partners
    }

    get partnerInfos() {
        return this._partnerInfos
    }

    get partner() {
        return this._partner
    }

    get partnerInfo() {
        return this._partnerInfo
    }

    get noPartnerInfos() {
        return this._noPartnerInfos
    }

    get myBlocked() {
        return this._myBlocked
    }

    get myFavorite() {
        return this._myFavorite
    }

    get iAmBlocked() {
        return this._iAmBlocked
    }

    get iAmFavorite() {
        return this._iAmFavorite
    }
}