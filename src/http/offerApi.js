import { $authHost } from "./index";

export const createOffer = async (
    language, formData
) => {
    const { data } = await $authHost.post('api/offer', {
       language, formData
    })
    return data
}

export const updateOffer = async (
    formData
) => {
    const { data } = await $authHost.post('api/offer/update', {
        formData
    })
    return data
}

export const fetchOffers = async (orderIDs, userInfoId) => {
    const { data } = await $authHost.post('api/offer/get_offers', { orderIDs, userInfoId })
    return data
}

export const deleteOffer = async (id, role) => {
    const { data } = await $authHost.delete('api/offer', { params: { id, role } })
    return data
}



