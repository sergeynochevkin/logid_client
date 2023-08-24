import { $authHost, $host } from "./index";

export const fetchMainCounters = async (userInfoId) => {
    const { data } = await $host.get('api/ad/counters')
    return data
}
export const fetchAdTransports = async (filters, option, userInfoId) => {
    const { data } = await $host.post('api/ad/get_transports', { filters, option,userInfoId })
    return data
}

export const addView = async (option, item_id, ip) => {
    const { data } = await $host.post('api/ad/add_view', { option, item_id, ip })
    return data
}

export const addContactView = async (option, item_id, ip, id) => {
    const { data } = await $authHost.post('api/ad/add_contact_view', { option, item_id, ip, id })
    return data
}


export const addVisit = async (
    ip
) => {
    const { data } = await $host.post('api/ad/visit', {
        ip
    })
    return data
}

