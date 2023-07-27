import axios from 'axios'

export const API = axios.create({
    // baseURL: process.env.REACT_APP_BASEURL, Production
    baseURL: 'http://localhost:5000/api/v1' //local
})

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}