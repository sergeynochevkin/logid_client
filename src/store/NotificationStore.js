import { makeAutoObservable } from "mobx";

export default class NotificationStore {

    constructor() {
        this._notifications = [
        ]

        this._server_notifications = []
        this._new_server_notifications = []

        makeAutoObservable(this)
    }

    setServerNotifications(value) {
        this._server_notifications = value
    }

    setNewServerNotifications(value) {
        this._new_server_notifications = value
    }

    get server_notifications() {
        return this._server_notifications
    }

    get new_server_notifications() {
        return this._new_server_notifications
    }

    setNotifications(notifications) {
        this._notifications = notifications
    }

    get notifications() {
        return this._notifications
    }

    filterNotifications(id) {
        this._notifications = this._notifications.filter(el => el.id !== id)
    }

    addNotification(notification) {
        this._notifications = [...this._notifications, ...notification]
    }
}