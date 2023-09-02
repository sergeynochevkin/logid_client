import { $authHost } from "./index";

export const createUserInfo = async (
    formData
) => {
    const { data } = await $authHost.post('api/user_info', {
        formData
    })
    return data
}

export const fetchUserInfo = async (userId) => {
    const { data } = await $authHost.get('api/user_info/', { params: { userId } })
    return data
}


export const fetchUserInfos = async (userInfos, partnerFilter) => {
    const { data } = await $authHost.post('api/user_info/get_user_infos', { userInfos, partnerFilter })
    return data
}

export const updateUserInfo = async (
    formData
) => {
    await $authHost.put('api/user_info', {
        formData
    })
}

export const updateLocation = async (
    location
) => {
    await $authHost.put('api/user_info/location', {
        location
    })
}





