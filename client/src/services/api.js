import axios from 'axios';

const baseURL = import.meta.env.PROD
  ? 'https://sales-inventory-app.onrender.com/api'
  : 'http://localhost:5000/api'

export const API = axios.create({ baseURL })

// ✅ Add interceptor to include token dynamically with every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // or from context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});