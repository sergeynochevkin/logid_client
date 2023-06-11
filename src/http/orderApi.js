import { $authHost } from "./index";

export const createOrder = async (
    language,
    order_comment,
    cost,
    mileage,
    estimated_time,
    carrier,
    order_status,
    order_final_status,
    userId,
    country,
    city,
    type,
    load_capacity,
    side_type,
    thermo_bag,
    hydraulic_platform,
    side_loading,
    glass_stand,
    refrigerator_minus,
    refrigerator_plus,
    thermo_van,
    order_type,
    userInfoId,
    pointsIntegrationId,
    option,
    previousId,
    files,
    for_partner,
    for_group,
    direction_response
) => {
    const { data } = await $authHost.post('api/order', {
        language,
        order_comment,
        cost,
        mileage,
        estimated_time,
        carrier,
        order_status,
        order_final_status,
        userId,
        country,
        city,
        type,
        load_capacity,
        side_type,
        thermo_bag,
        hydraulic_platform,
        side_loading,
        glass_stand,
        refrigerator_minus,
        refrigerator_plus,
        thermo_van,
        order_type,
        userInfoId,
        pointsIntegrationId,
        option,
        previousId,
        files,
        for_partner,
        for_group,
        direction_response
    })
    return data
}

export const fetchOrders = async (userInfoId, role, carrierId, order_status, country, city_place_id, transport, myBlocked, iAmBlocked, myFavorite, isArc, filters) => {
    const { data } = await $authHost.post('api/order/get_orders', {
        userInfoId, role, carrierId, order_status, country, city_place_id, transport, myBlocked, iAmBlocked, myFavorite, isArc, filters
    })
    return data
}

export const fetchOrder = async (id) => {
    const { data } = await $authHost.get('api/order/get_order', { params: { id } })
    return data
}

export const fetchOrderConnections = async (orderIds, option) => {
    const { data } = await $authHost.post('api/order/get_order_connections', { orderIds, option })
    return data
}

export const updateOrder = async (option, order_type, id, role, order_status, order_final_status, carrierId, userInfoId, cost, newTime, firstPointId) => {
    await $authHost.post('api/order/update', { option, order_type, id, role, order_final_status, order_status, carrierId, userInfoId, cost, newTime, firstPointId })
}

export const editOrder = async (
    id,
    order_comment,
    cost,
    mileage,
    estimated_time,
    carrier,
    order_status,
    order_final_status,
    country,
    city,
    type,
    load_capacity,
    side_type,
    thermo_bag,
    hydraulic_platform,
    side_loading,
    glass_stand,
    refrigerator_minus,
    refrigerator_plus,
    thermo_van,
    order_type,
    pointsIntegrationId,
    files,
    for_partner,
    for_group,
    oldPointsId,
    direction_response,
    city_place_id
) => {
    await $authHost.post('api/order/edit', {
        id,
        order_comment,
        cost,
        mileage,
        estimated_time,
        carrier,
        order_status,
        order_final_status,
        country,
        city,
        type,
        load_capacity,
        side_type,
        thermo_bag,
        hydraulic_platform,
        side_loading,
        glass_stand,
        refrigerator_minus,
        refrigerator_plus,
        thermo_van,
        order_type,
        pointsIntegrationId,
        files,
        for_partner,
        for_group,
        oldPointsId,
        direction_response,
        city_place_id
    })
}

export const deleteOrder = async (pointsIntegrationId) => {
    const { data } = await $authHost.delete('api/order/delete_order', { params: { pointsIntegrationId } })
    return data
}

export const setOrderViewed = async (orderId, userInfoId) => {
    const { data } = await $authHost.post('api/order/set_viewed', { orderId, userInfoId })
    return data
}

export const clearOrderViewed = async (orderId) => {
    const { data } = await $authHost.post('api/order/clear_viewed', { orderId })
    return data
}
