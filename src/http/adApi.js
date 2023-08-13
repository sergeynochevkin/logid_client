import { $host } from "./index";

export const fetchMainCounters = async (userInfoId) => {
    const { data } = await $host.get('api/ad/counters')
    return data
}
export const fetchAdTransports = async (filters) => {
    const { data } = await $host.post('api/ad/get_transports', { filters })
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

