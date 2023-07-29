import { $authHost } from "./index";

export const fetchManagementUsers = async (userId) => {
    const { data } = await $authHost.get('api/management/get_users',
        { params: { userId } }
    )
    return data
}
export const fetchManagementOrders = async () => {
    const { data } = await $authHost.get('api/management/get_orders',
        {}
    )
    return data
}
export const fetchManagementTransports = async () => {
    const { data } = await $authHost.get('api/management/get_transports',
        {}
    )
    return data
}

export const sendManagementNotification = async (
    formData
) => {
    const { data } = await $authHost.post('api/management/send_notification', {
        formData
    })
    return data
}


export const updateField = async (formData) => {
    const { data } = await $authHost.put('api/management', {
        formData
    })
    return data
}