import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export default class OrderStore {

    constructor() {
        this._orders = []
        this._divided_orders = {
            new: [],
            inWork: [],
            completed: [],
            canceled: [],
            postponed: [],
            arc: [],
            pattern: []
        }
        this._map_orders = []
        this._group = localStorage.getItem('groupOrders') ? JSON.parse(localStorage.getItem('groupOrders')) : []
        this._sortedAndFilteredOrders = []
        this._order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
        this._added = {}
        this._totalCount = {
            new: 0,
            inWork: 0,
            completed: 0,
            canceled: 0,
            postponed: 0,
            arc: 0,
            pattern: 0
        }
        this._filtered_count = {
            new: 0,
            inWork: 0,
            completed: 0,
            canceled: 0,
            postponed: 0,
            arc: 0,
            pattern: 0
        }
        this._ordersByGroup = []
        this._ordersByPartner = []
        this._pattern = JSON.stringify('')
        this._integrationId = ''

        makeAutoObservable(this)
    }

    setOrdersByGroup(value) {
        this._ordersByGroup = value
    }

    get ordersByGroup() {
        return this._ordersByGroup
    }

    setFilteredCount(value, ComponentFunction) {
        this._filtered_count[ComponentFunction] = value
    }

    get filtered_count() {
        return this._filtered_count
    }


    setOrdersByPartner(value) {
        this._ordersByPartner = value
    }

    get ordersByPartner() {
        return this._ordersByPartner
    }

    setIntegrationId() {
        this._integrationId = v4()
    }

    get integrationId() {
        return this._integrationId
    }

    setPattern(value) {
        this._pattern = value
    }

    get pattern() {
        return this._pattern
    }

    setSelected(value) {
        this._selected = value
    }

    get selected() {
        return this._selected
    }

    setGroup(value) {
        this._group = value
        localStorage.setItem('groupOrders', JSON.stringify(value))
    }

    get group() {
        return this._group
    }

    setTotalCount(value, componentFunction) {
        this._totalCount[componentFunction] = value
    }

    get totalCount() {
        return this._totalCount
    }
    setDividedOrders(value, componentFunction) {
        this._divided_orders[componentFunction] = value
    }

    get divided_orders() {
        return this._divided_orders
    }

    setAdded(value) {
        this._added = value
    }
    get added() {
        return this._added
    }

    setOrders(orders) {
        this._orders = orders
    }
    get orders() {
        return this._orders
    }

    setMapOrders(value) {
        this._map_orders = value
    }
    get map_orders() {
        return this._map_orders
    }

    setSortedAndFilteredOrders(sortedAndFilteredOrders) {
        this._sortedAndFilteredOrders = sortedAndFilteredOrders
    }
    get sortedAndFilteredOrders() {
        return this._sortedAndFilteredOrders
    }

    setOrder(order) {
        this._order = order
        localStorage.setItem('order', JSON.stringify(order))
    }
    get order() {
        return this._order
    }

}

