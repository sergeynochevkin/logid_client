import { $authHost } from "./index";

export const fetchManagementUsers = async (userId) => {
    const { data } = await $authHost.get('api/management/get_users',
        { params: { userId } }
    )
    return data
}
export const fetchManagementOrders = async () => {
    const { data } = await $authHost.get('api/management/get_orders',
        {}
    )
    return data
}
export const fetchManagementTransports = async () => {
    const { data } = await $authHost.get('api/management/get_transports',
        {}
    )
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



