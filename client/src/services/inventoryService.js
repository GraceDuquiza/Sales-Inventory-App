import axios from 'axios'

const API_URL = '/api/inventory'

// 📦 Fetch all inventory products
export const fetchInventory = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('❌ Error fetching inventory:', error)
        throw error
    }
    }

    // ➕ Add a new product to inventory
    export const addInventory = async (product) => {
    try {
        const response = await axios.post(API_URL, product)
        return response.data
    } catch (error) {
        console.error('❌ Error adding product:', error)
        throw error
    }
}

// 🗑️ (Optional) Soft-delete a product by ID
export const deleteInventory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error('❌ Error deleting product:', error)
        throw error
    }
}
