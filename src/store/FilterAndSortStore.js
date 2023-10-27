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
            intercity: false,
            city: ''
        }

        this._partnerFilters = localStorage.getItem('partnerFilters') ? JSON.parse(localStorage.getItem('partnerFilters')) : {
            partners: {
                id: '',
                partnerName: '',
                selectedSort: '',
            },
            partnersByGroups: []
        }

        this._boardFilters = localStorage.getItem('boardFilters') ? JSON.parse(localStorage.getItem('boardFilters')) : {
            transports: {
                limit: 30,
                main_limit: 5,
                searchString: '',
                selectedSort: '',
                country: 'russia',
                city: '',
                type: '',
                side_type: '',
                load_capacity: '',
                thermo_bag: '',
                hydraulic_platform: '',
                side_loading: '',
                glass_stand: '',
                refrigerator_minus: '',
                refrigerator_plus: '',
                thermo_van: ''
            }
        }

        this._managementFilters = {
            users: {
                role: 'all',
                city: 'all',
                delivery_group: 'all',
                searchString: ''
            }
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

    setBoardFilters(value, option) {
        this._boardFilters[option] = value
        localStorage.setItem('boardFilters', JSON.stringify(this._boardFilters))
    }

    get boardFilters() {
        return this._boardFilters
    }

    setManagementFilters(value, option) {
        this._managementFilters[option] = value
        // localStorage.setItem('boardFilters', JSON.stringify(this._boardFilters))
    }

    get managementFilters() {
        return this._managementFilters
    }
}

