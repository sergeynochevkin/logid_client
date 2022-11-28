import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, role) => {
    const { data } = await $host.post('api/user/registration', { email, password, role })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const update = async (userId, email, password) => {
    const { data } = await $authHost.put('api/user/update', { userId, email, password })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const code = async (email) => {
    const { data } = await $host.get(`api/user/get_code`, { params: { email } })
    return data
}

export const restoreLink = async (email) => {
    const { data } = await $authHost.get(`api/user/restore_link`, { params: { email } })
    return data
}

export const restore = async (password, code) => {
    const { data } = await $host.put('api/user/restore', { password, code })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}


export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
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
