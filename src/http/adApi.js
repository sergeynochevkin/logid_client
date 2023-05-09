import { $host } from "./index";

export const fetchMainCounters = async (userInfoId) => {
    const { data } = await $host.get('api/ad/main_counters')
    return data
}







