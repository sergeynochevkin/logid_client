import { $authHost } from "./index";

export const createOrderRating = async (
    formData
) => {
    const { data } = await $authHost.post('api/rating/create_order_rating', {
        formData
    })
    return data
}

export const updateOtherRating = async (
    formData
) => {
    const { data } = await $authHost.post('api/rating/update_other_rating', {
        formData
    })
    return data
}

export const fetchOrderRatings = async (orderIDs, raterUserInfoId) => {
    const { data } = await $authHost.post('api/rating/get_order_ratings', { orderIDs, raterUserInfoId })
    return data
}

export const fetchOtherRatings = async (raterUserInfoId) => {
    const { data } = await $authHost.post('api/rating/get_other_ratings', { raterUserInfoId })
    return data
}


export const fetchOneOrderRating = async (orderId, raterUserInfoId) => {
    const { data } = await $authHost.post('api/rating/get_one_order_rating', { orderId, raterUserInfoId })
    return data
}

// export const deleteOffer = async (id) => {
//     const { data } = await $authHost.delete('api/offer', { params: { id } })
//     return data
// }



