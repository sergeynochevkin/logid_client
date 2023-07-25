import { $host } from "./index";

export const fetchMainCounters = async (userInfoId) => {
    const { data } = await $host.get('api/ad/counters')
    return data
}
export const fetchAdTransports = async () => {
    const { data } = await $host.get('api/ad/transports')
    return data
}







