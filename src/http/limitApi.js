import { $authHost } from "./index";

export const fetchUserLimits = async (userInfoId) => {
    const { data } = await $authHost.get('api/limit', { params: { userInfoId } })
    return data
}







