import axios from 'axios'

const apiGeneric = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const apiTech = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_TECH_URL
})

export {
    apiGeneric,
    apiTech
}
