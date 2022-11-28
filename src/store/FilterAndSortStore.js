import { makeAutoObservable } from "mobx";

export default class FilterAndSortStore {

    constructor() {
        this._filters = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : {
            new: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 10,
            },
            arc: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 30,
            },
            postponed: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 10,
            },
            canceled: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 10,
            },
            completed: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 10,
            },
            inWork: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 10,
            },
            pattern: {
                id: '',
                selectedSort: '',
                costFrom: '',
                costTo: '',
                timeFrom: '',
                timeTo: '',
                name: '',
                partnerName: '',
                limit: 30,
            },
            selected: [],
            partnersByGroups: [],
            intercity: false
        }

        this._partnerFilters = localStorage.getItem('partnerFilters') ? JSON.parse(localStorage.getItem('partnerFilters')) : {
            partners: {
                id: '',
                partnerName: '',
                selectedSort: '',
            },
            partnersByGroups: []
        }

        makeAutoObservable(this)
    }

    setPartnerFilters(value, option) {
        this._partnerFilters[option] = value
        localStorage.setItem('partnerFilters', JSON.stringify(this._partnerFilters))
    }

    get partnerFilters() {
        return this._partnerFilters
    }

    setFilters(value, componentFunction) {
        this._filters[componentFunction] = value
        localStorage.setItem('filters', JSON.stringify(this._filters))
    }

    get filters() {
        return this._filters
    }
}

