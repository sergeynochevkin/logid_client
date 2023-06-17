import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, role, language, country, user_agreement_accepted, privacy_policy_accepted, age_accepted, cookies_accepted, personal_data_agreement_accepted) => {
    const { data } = await $host.post('api/user/registration', { email, password, role, language, country, user_agreement_accepted, privacy_policy_accepted, age_accepted, cookies_accepted, personal_data_agreement_accepted })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const fast_registration = async (
    language,
    phone,
    email,
    password,
    role,
    country,
    user_agreement_accepted,
    privacy_policy_accepted,
    age_accepted,
    personal_data_agreement_accepted,
    cookies_accepted,
    city,
    city_place_id,
    city_latitude,
    city_longitude,  

    load_capacity,
    side_type,
    type,

    thermo_bag,
    hydraulic_platform,
    side_loading,
    glass_stand,
    refrigerator_minus,
    refrigerator_plus,
    thermo_van,
    tag,

) => {
    const { data } = await $host.post('api/user/fast_registration', {
        language,
        phone,
        email,
        password,
        role,
        country,
        user_agreement_accepted,
        privacy_policy_accepted,
        age_accepted,
        personal_data_agreement_accepted,
        cookies_accepted,
        city,
        city_place_id,
        city_latitude,
        city_longitude,
       
        load_capacity,
        side_type,
        type,

        thermo_bag,
        hydraulic_platform,
        side_loading,
        glass_stand,
        refrigerator_minus,
        refrigerator_plus,
        thermo_van,      
        tag,

    })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const update = async (userId, email, password, language) => {
    const { data } = await $authHost.put('api/user/update', { userId, email, password, language })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const code = async (email, language) => {
    const { data } = await $host.get(`api/user/get_code`, { params: { email, language } })
    return data
}

export const restoreLink = async (email, language) => {
    const { data } = await $authHost.get(`api/user/restore_link`, { params: { email, language } })
    return data
}

export const restore = async (password, code, language) => {
    const { data } = await $host.put('api/user/restore', { password, code, language })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}


export const login = async (email, password, language) => {
    const { data } = await $host.post('api/user/login', { email, password, language })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const check = async () => {
    const { data } = await $host.get(`api/user/refresh`, {})
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.refreshToken)
}

export const logout = async () => {
    const data = await $authHost.post('api/user/logout')
    localStorage.removeItem('token')
    return data
}

export const fetchUser = async (userId) => {
    const { data } = await $authHost.get('api/user/', { params: { userId } })
    return data
}
