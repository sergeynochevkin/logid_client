import { $authHost } from "./index";

export const createState = async () => {
    const { data } = await $authHost.post('api/state', {})
    return data
}

export const fetchUserState = async (userInfoId) => {
    const { data } = await $authHost.get('api/state', { params: {userInfoId} })
    return data
}

export const updateUserState = async (state, userInfoId) => {
    const { data } = await $authHost.put('api/state', { state, userInfoId })
    return data
}

export const deleteState = async (id) => {
    const { data } = await $authHost.delete('api/state', { params: { id } })
    return data
}



