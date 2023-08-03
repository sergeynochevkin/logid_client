import { $authHost } from "./index";
import { $host } from "./index";

export const createTransport = async (formData) => {
    const { data } = await $authHost.post('api/transport', {
        formData
    })
    return data
}

export const transportContactViewed = async (transportId, userInfoId) => {
    const { data } = await $authHost.post('api/transport/contact_viewed', {
        transportId, userInfoId
    })
    return data
}

export const transportViewed = async (transportId, userInfoId) => {
    const { data } = await $host.post('api/transport/viewed', {
        transportId, userInfoId
    })
    return data
}

export const updateTransport = async (formData) => {
    const { data } = await $authHost.put('api/transport', {
        formData
    })
    return data
}

export const fetchTransport = async (userInfoId) => {
    const { data } = await $authHost.get('api/transport', { params: { userInfoId } })
    return data
}

export const deleteTransport = async (id) => {
    const { data } = await $authHost.delete('api/transport', { params: { id } })
    return data
}



