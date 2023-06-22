import { makeAutoObservable } from "mobx";

export default class FetcherStore {
    constructor() {
        this._server_notifications = false
        this._subscriptions = false
        this._user_state = false
        this._partners = false
        this._transports = false
        this._account_user = false
        this._account_user_info = false

        //orders
        this._orders = false
        this._divided_orders = false
        this._orders_all = false
        this._orders_new = false
        this._orders_in_work = false
        this._create = false
        this._order_viewed = false

        //statuses
        this._new_status = ''
        this._status = ''

        //management
        this._management_users = false
        this._management_orders = false
        this._management_transports = false

        //ad
        this._main_counters = false

        //setting
        this._user_app_setting = false

        makeAutoObservable(this)
    }
    //set
    setServerNotifications(value) {
        this._server_notifications = value
    }
    setSubscriptions(value) {
        this._subscriptions = value
    }
    setUserState(value) {
        this._user_state = value
    }
    setPartners(value) {
        this._partners = value
    }
    setOrders(value) {
        this._orders = value
    }
    setOrdersAll(value) {
        this._orders_all = value
    }
    setOrdersNew(value) {
        this._orders_new = value
    }
    setOrdersInWork(value) {
        this._orders_in_work = value
    }
    setTransports(value) {
        this._transports = value
    }
    setAccountUser(value) {
        this._account_user = value
    }
    setAccountUserInfo(value) {
        this._account_user_info = value
    }
    setDividedOrders(value) {
        this._divided_orders = value
    }
    setNewStatus(value) {
        this._new_status = value
    }
    setStatus(value) {
        this._status = value
    }
    setCreate(value) {
        this._create = value
    }
    setManagementUsers(value) {
        this._management_users = value
    }
    setManagementOrders(value) {
        this._management_orders = value
    }
    setManagementTransports(value) {
        this._management_transports = value
    }
    setMainCounters(value) {
        this._main_counters = value
    }
    setOrderViewed(value) {
        this._order_viewed = value
    }
    setUserAppSetting(value) {
        this._user_app_setting = value
    }

    //get
    get server_notifications() {
        return this._server_notifications
    }
    get subscriptions() {
        return this._subscriptions
    }
    get user_state() {
        return this._user_state
    }
    get partners() {
        return this._partners
    }
    get orders() {
        return this._orders
    }
    get orders_all() {
        return this._orders_all
    }
    get orders_new() {
        return this._orders_new
    }
    get orders_in_work() {
        return this._orders_in_work
    }
    get transports() {
        return this._transports
    }
    get account_user() {
        return this._account_user
    }
    get account_user_info() {
        return this._account_user_info
    }

    get divided_orders() {
        return this._divided_orders
    }
    get new_status() {
        return this._new_status
    }
    get status() {
        return this._status
    }
    get create() {
        return this._create
    }
    get management_users() {
        return this._management_users
    }
    get management_orders() {
        return this._management_orders
    }
    get management_transports() {
        return this._management_transports
    }
    get main_counters() {
        return this._main_counters
    }
    get order_viewed() {
        return this._order_viewed
    }
    get user_app_setting() {
        return this._user_app_setting
    }
}