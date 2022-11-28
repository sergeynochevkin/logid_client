import { $authHost } from "./index";

export const createPoint = async (
    formData, newOrderIntegrationId, option
) => {
    const { data } = await $authHost.post('api/point', {
        formData, newOrderIntegrationId, option
    })
    return data
}

export const fetchPoints = async (pointsIntegrationIds, userInfoId) => {
    const { data } = await $authHost.post('api/point/get_points', { pointsIntegrationIds, userInfoId })
    return data
}

export const updatePoint = async (
    id,
    status,
    carrier_comment,
    updated_by,
    updated_time,
    finished_time,
    role
) => {
    await $authHost.post('api/point/update', {
        id,
        status,
        carrier_comment,
        updated_by,
        updated_time,
        finished_time, 
        role
    })
}


