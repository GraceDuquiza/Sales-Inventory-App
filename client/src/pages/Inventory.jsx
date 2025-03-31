import { useEffect, useState } from 'react'
import { fetchInventory, addInventory } from '../services/inventoryService'

export default function Inventory() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

const [form, setForm] = useState({ name: '', stock: '', price: '' })
const [submitting, setSubmitting] = useState(false)

useEffect(() => {
    loadInventory()
}, [])

const loadInventory = async () => {
    try {
        const data = await fetchInventory()
        setProducts(data)
        } catch {
        setError('Failed to fetch inventory.')
        } finally {
        setLoading(false)
    }
}

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
    await addInventory({
        name: form.name,
        stock: Number(form.stock),
        price: Number(form.price)
    })
    setForm({ name: '', stock: '', price: '' })
    await loadInventory()
    } catch {
    alert('Failed to add product')
    } finally {
    setSubmitting(false)
    }
}

return (
    <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">📦 Inventory</h2>

      {/* Product Form */}
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 space-y-4">
        <div className="flex flex-col gap-2">
        <label className="font-semibold">Product Name</label>
        <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
        />
        </div>

        <div className="flex flex-col gap-2">
        <label className="font-semibold">Stock</label>
        <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
        />
        </div>

        <div className="flex flex-col gap-2">
        <label className="font-semibold">Price</label>
        <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
        />
        </div>

        <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
        {submitting ? 'Adding...' : 'Add Product'}
        </button>
    </form>

      {/* Product Table */}
    {loading ? (
        <p>Loading inventory...</p>
    ) : error ? (
        <p className="text-red-500">{error}</p>
    ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-left">
            <tr>
                <th className="p-3">#</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price (₱)</th>
            </tr>
        </thead>
            <tbody>
            {products.map((product, idx) => (
                <tr key={product.id} className="border-t">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">₱{product.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
)
}
