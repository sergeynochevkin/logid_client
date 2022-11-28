import { $authHost } from "./index";

export const fetchDefaultData = async () => {
    const { data } = await $authHost.get('api/default_data')
    return data
}



