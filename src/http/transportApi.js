import { $authHost } from "./index";

export const createTransport = async (formData) => {
    const { data } = await $authHost.post('api/transport', {
        formData
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



