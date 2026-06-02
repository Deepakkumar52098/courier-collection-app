import axios from "axios"

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token && {
            Authorization: `Bearer ${token}`
        })
    }
}

export const executeGet = (url) => {
    const config = {
        method: 'get',
        url,
    }
    return axios(config)
}

export const executePost = (url, body) => {
    const config = {
        method: 'post',
        url,
        data: body
    }
    return axios(config)
}

export const executeDelete = (url, body) => {
    const config = {
        method: 'delete',
        url,
        data: body
    }
    return axios(config)
}

axios.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config?.headers,
            ...getAuthHeaders()
        }

        return config
    },
    (error) => Promise.reject(error)
)