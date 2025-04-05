// services/inventoryService.js

import { API } from './api' // ✅ use API that includes token

const API_URL = '/inventory' // ✅ no need to include /api since API already handles baseURL

// 📦 Fetch all inventory products
export const fetchInventory = async () => {
    try {
        const response = await API.get(API_URL)
        return response.data
    } catch (error) {
        console.error('❌ Error fetching inventory:', error)
        throw error
    }
    }

    // ➕ Add a new product to inventory
    export const addInventory = async (product) => {
    try {
        const response = await API.post(API_URL, product)
        return response.data
    } catch (error) {
        console.error('❌ Error adding product:', error)
        throw error
    }
    }

    // 🗑️ Soft-delete a product by ID
    export const deleteInventory = async (id) => {
    try {
        const response = await API.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error('❌ Error deleting product:', error)
        throw error
    }
}
