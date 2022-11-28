import { $authHost } from "./index";

export const createNotifivation = async (formData) => {
    const { data } = await $authHost.post('api/transport', {
        formData
    })
    return data
}

export const fetchNotifications = async (userInfoId, viewed) => {
    const { data } = await $authHost.get('api/notification/get_notifications', { params: { userInfoId } })
    return data
}

export const fetchNotification = async (uuid) => {
    const { data } = await $authHost.get('api/notification/get_notification', { params: { uuid } })
    return data
}

export const updateNotifications = async (ids, viewed) => {
    const { data } = await $authHost.put('api/notification/update_notifications', { ids, viewed })
    return data
}

export const deleteNotification = async (id) => {
    const { data } = await $authHost.delete('api/notification', { params: { id } })
    return data
}

export const deleteNotifications = async (ids) => {
    const { data } = await $authHost.delete('api/notification/delete_all', { params: { ids } })
    return data
}



