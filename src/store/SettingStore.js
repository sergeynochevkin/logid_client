import { makeAutoObservable } from "mobx";

export default class StateStore {
    constructor() {
        this._user_settings = []
        this._app_settings = []
        this._user_map_scale = undefined
        this._user_map_city = {}
        this._user_map_cities = []
        this._all_cities = false
        this._app_theme = 'light'
        this._center = {}
        this._bounds = {}
        this._bounds_limit = undefined
        this._zoom = undefined
        this._adress_history = []

        makeAutoObservable(this)
    }
    setUserSettings(value) {
        this._user_settings = value
    }
    setAppSettings(value) {
        this._app_settings = value
    }
    setUserMapScale(value) {
        this._user_map_scale = value
    }
    setUserMapCity(value) {
        this._user_map_city = value
    }
    setUserMapCities(value) {
        this._user_map_cities = value
    }
    get user_settings() {
        return this._user_settings
    }
    get app_settings() {
        return this._app_settings
    }
    get user_map_scale() {
        return this._user_map_scale
    }
    get user_map_city() {
        return this._user_map_city
    }
    get user_map_cities() {
        return this._user_map_cities
    }
    setCenter(value) {
        this._center = value
    }
    get center() {
        return this._center
    }
    setAppTheme(value) {
        this._app_theme = value
        localStorage.setItem('app_theme', value)
    }
    get app_theme() {
        return this._app_theme
    }
    setBounds(value) {
        this._bounds = value
    }
    get bounds() {
        return this._bounds
    }
    setZoom(value) {
        this._zoom = value
    }
    get zoom() {
        return this._zoom
    }
    setBoundsLimit(value) {
        this._bounds_limit = value
    }
    get bounds_limit() {
        return this._bounds_limit
    }
    setAllCities(value) {
        this._all_cities = value
    }
    get all_cities() {
        return this._all_cities
    }
    setAdressHistory(value) {
        this._adress_history = value
    }
    get adress_history() {
        return this._adress_history
    }
}