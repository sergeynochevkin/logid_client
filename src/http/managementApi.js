import { $authHost } from "./index";

export const fetchManagementUsers = async () => {
    const { data } = await $authHost.get('api/management/get_users', {
    })
    return data
}

// export const fetchTransport = async (userInfoId) => {
//     const { data } = await $authHost.get('api/transport', { params: { userInfoId } })
//     return data
// }

// export const deleteTransport = async (id) => {
//     const { data } = await $authHost.delete('api/transport', { params: { id } })
//     return data
// }



