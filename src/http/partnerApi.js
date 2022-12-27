import { $authHost } from "./index";

export const createPartner = async (
    userInfoId, partnerUserInfoId, status
) => {
    const { data } = await $authHost.post('api/partner', {
        userInfoId, partnerUserInfoId, status
    })
    return data
}

export const addPartnerByKey = async (
    language,role, userInfoId, key
) => {
    const { data } = await $authHost.post('api/partner/add_partner', {
       language, role, userInfoId, key
    })
    return data
}

export const fetchPartners = async (userInfoId, partnerUserInfoId) => {
    const { data } = await $authHost.get('api/partner', { params: { userInfoId, partnerUserInfoId } })
    return data
}

export const updatePartner = async (id, status) => {
    await $authHost.post('api/partner/update', { id, status })
}

export const createGroup = async (
    userInfoId, name
) => {
    const { data } = await $authHost.post('api/partner/create_group', {
        userInfoId, name
    })
    return data
}

export const fetchGroups = async (userInfoId, partnerIds) => {
    const { data } = await $authHost.post('api/partner/groups', { userInfoId, partnerIds })
    return data
}


export const deletePartnerFromGroup = async (id, groupId) => {
    const { data } = await $authHost.delete('api/partner/delete_partner_from_group', { params: { id, groupId } })
    return data
}

export const deleteGroup = async (id) => {
    const { data } = await $authHost.delete('api/partner/delete_group', { params: { id } })
    return data
}

export const updateGroups = async (
    userInfoId, partnerId, groupIds
) => {
    const { data } = await $authHost.post('api/partner/update_groups', {
        userInfoId, partnerId, groupIds
    })
    return data
}




