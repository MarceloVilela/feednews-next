import axios from 'axios'

const apiNext = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_TECH_URL
})

export {
    api
}

export default apiNext