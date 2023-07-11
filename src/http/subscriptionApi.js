import { $authHost } from "./index";


export const fetchSubscription = async (userInfoId) => {
    const { data } = await $authHost.get('api/subscription', { params: { userInfoId } })
    return data
}

export const updateSubscription = async (payment_id,language,userInfoId, planId, paid_to) => {
    const { data } = await $authHost.put('api/subscription', {
        payment_id, language, userInfoId, planId, paid_to
    })
    return data
}

export const fetchSubscriptionData = async () => {
    const { data } = await $authHost.get('api/subscription/subscripttion_data')
    return data
}


