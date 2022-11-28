import { $authHost } from "./index";

export const fetchSettings = async (userInfoId) => {
    const { data } = await $authHost.get('api/setting', { params: { userInfoId } })
    return data
}

export const updateSetting = async (id, value, userInfoId) => {
    const { data } = await $authHost.put('api/setting', { id, value, userInfoId })
    return data
}





