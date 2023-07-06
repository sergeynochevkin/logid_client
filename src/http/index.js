import axios from 'axios'

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$host.interceptors.response.use((config) => { return config; }, (async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry !== true) {
        originalRequest._isRetry = true;
        try {
            const { data } = await $host.get(`api/user/refresh`, {})
            localStorage.setItem('token', data.accessToken)
            return $host.request(originalRequest)
        } catch (error) {
            console.log('Не авторизован');
        }
    }
    throw error
}))

export {
    $host,
    $authHost
}

