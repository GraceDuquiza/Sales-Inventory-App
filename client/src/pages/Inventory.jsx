import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { fetchInventory, addInventory } from '../services/inventoryService'
import { Button } from '@/components/ui/button'
import { API } from '../services/api'
import axios from 'axios'


export default function Inventory() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const [form, setForm] = useState({
        name: '',
        stock: '',
        price: '',
        createdAt: format(new Date(), 'yyyy-MM-dd'),
    })

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
            price: Number(form.price),
            createdAt: form.createdAt,
        })
        setForm({
            name: '',
            stock: '',
            price: '',
            createdAt: format(new Date(), 'yyyy-MM-dd'),
        })
        await loadInventory()
        } catch {
        alert('Failed to add product')
        } finally {
        setSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
// sourcery skip: use-braces
        if (!confirm('Are you sure you want to remove this product?')) {
            return
        }
        try {
        await axios.delete(`/inventory/${id}`)
        await loadInventory()
        } catch (err) {
        console.error('❌ Failed to delete product:', err)
        alert('Failed to delete product')
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">📦 Inventory</h2>

        {/* Product Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow mb-6 space-y-4"
        >
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

            <div className="flex flex-col gap-2">
            <label className="font-semibold">Date Added</label>
            <input
                type="date"
                name="createdAt"
                value={form.createdAt}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            </div>

            <Button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Product'}
            </Button>
        </form>

        {/* Product Table */}
        {loading ? (
            <p>Loading inventory...</p>
        ) : error ? (
            <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
        ) : (
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100 text-left">
                <tr>
                <th className="p-3">#</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price (₱)</th>
                <th className="p-3">Date Added</th>
                <th className="p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {products
                .filter((product) => !product.deletedAt)
                .map((product, idx) => (
                    <tr key={product.id} className="border-t">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">₱{product.price.toFixed(2)}</td>
                    <td className="p-3">
                        {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                        <Button
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                        >
                        Delete
                        </Button>
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    )
}
