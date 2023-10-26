import { makeAutoObservable } from "mobx";

export default class ManagementStore {
    constructor() {
        this._users = []
        this._transports = []
        this._transport_images = []
        this._user_images = []
        this._orders = []
        this._visits = {}
        this._registrations = {}
        this._statistics_component_function = ''
        this._report_roles = []
        this._clicks = {}

        this._filters = {
            user: {
                role: 'all',
                city: 'all',
                delivery_group: 'all'
            }
        }

        makeAutoObservable(this)
    }

    setUsers(value) {
        this._users = value
    }
    setTransports(value) {
        this._transports = value
    }
    setOrders(value) {
        this._orders = value
    }
    setTransportImages(value) {
        this._transport_images = value
    }
    setUserImages(value) {
        this._user_images = value
    }
    setVisits(value) {
        this._visits = value
    }
    setRegistrations(value) {
        this._registrations = value
    }
    setStatisticsComponentFunction(value) {
        this._statistics_component_function = value
    }
    setReportRoles(value) {
        this._report_roles = value
    }
    setClicks(value) {
        this._clicks = value
    }
    setFilters(value, option) {
        this._filters[option] = value
    }


    get users() {
        // this._users.filter(el => (this._filters.user.city !== 'all' ? el.user_info.city === this._filters.user.city : el.user_info.city))
        return this._users.filter(el => (this._filters.user.role !== 'all'  && this._filters.user.city !== 'all') ? (el.role === this._filters.user.role && el.user_info.city === this._filters.user.city)  : this._filters.user.city !== 'all' ?  el.user_info.city === this._filters.user.city : this._filters.user.role !== 'all' ?  el.role === this._filters.user.role : el.role !== '')


        //with filters!        
    }
    get transports() {
        return this._transports
    }
    get orders() {
        return this._orders
    }
    get transport_images() {
        return this._transport_images
    }
    get user_images() {
        return this._user_images
    }
    get visits() {
        return this._visits
    }
    get registrations() {
        return this._registrations
    }
    get statistics_component_function() {
        return this._statistics_component_function
    }
    get report_roles() {
        return this._report_roles
    }
    get clicks() {
        return this._clicks
    }
    get filters() {
        return this._filters
    }
}