import axios from 'axios'

export const API = axios.create({
    baseURL: 'https://sales-inventory-app.onrender.com/api',
})