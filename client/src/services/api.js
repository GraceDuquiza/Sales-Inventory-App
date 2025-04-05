import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://sales-inventory-app.onrender.com/api', // ✅ Replace with your actual Render backend URL
});

// ✅ Add interceptor to include token dynamically with every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // or from context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});