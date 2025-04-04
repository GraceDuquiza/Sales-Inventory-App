import { useState, useEffect, useContext } from 'react'
import { format } from 'date-fns'
import { SaleContext } from '../context/SaleContext.jsx'
import { API } from '../services/api' // ✅ Centralized axios with baseURL

export default function Sales() {
    // Global context to trigger updates (for dashboard/reports)
    const { triggerSaleUpdate } = useContext(SaleContext)

    // Local state
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        productId: '',
        quantity: 1,
        date: format(new Date(), 'yyyy-MM-dd') // 🗓 Default to today
    })
    const [message, setMessage] = useState('')

    // 🔁 Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await API.get('/inventory') // ✅ Use API instead of axios directly
            setProducts(res.data)
        } catch (err) {
            console.error('❌ Failed to load inventory:', err)
        }
        }
        fetchProducts()
    }, [])

    // 📌 Track form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // 🧮 Calculate total based on selected product + quantity
    const selectedProduct = products.find((p) => p.id === Number(form.productId))
    const total = selectedProduct
        ? selectedProduct.price * Number(form.quantity)
        : 0

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // 🚫 Prevent invalid quantity
        if (Number(form.quantity) <= 0) {
        setMessage('❌ Quantity must be at least 1')
        return
        }

        try {
        // 📨 Submit sale
        await API.post('/sales', {
            productId: Number(form.productId),
            quantity: Number(form.quantity),
            date: form.date // ⏱ Include sale date
        })

        // 🎉 Show success + reset form
        setMessage('✅ Sale recorded!')
        setForm({
            productId: '',
            quantity: 1,
            date: format(new Date(), 'yyyy-MM-dd')
        })

        triggerSaleUpdate() // 🔄 Trigger dashboard/report updates

        setTimeout(() => setMessage(''), 3000)
        } catch (err) {
        console.error('❌ Sale failed:', err)
        if (err.response?.data?.error) {
            setMessage(`❌ ${err.response.data.error}`)
        } else {
            setMessage('❌ Failed to record sale')
        }
        setTimeout(() => setMessage(''), 4000)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">➕ Record a Sale</h2>

        {/* 📋 Sale Form */}
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 shadow rounded-lg"
        >
            {/* Product Select */}
            <div>
            <label className="block font-semibold">Product</label>
            <select
                name="productId"
                value={form.productId}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">-- Select a Product --</option>
                {products.map((product) => (
                <option key={product.id} value={product.id}>
                    {product.name} (₱{product.price})
                </option>
                ))}
            </select>
            </div>

            {/* Quantity Input */}
            <div>
            <label className="block font-semibold">Quantity</label>
            <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="1"
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>

            {/* Date Picker */}
            <div>
            <label className="block font-semibold">Date of Sale</label>
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>

            {/* Calculated Total */}
            <p className="font-semibold">Total: ₱{total.toFixed(2)}</p>

            {/* Submit Button */}
            <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Submit Sale
            </button>
        </form>

        {/* Feedback Message */}
        {message && (
            <p
            className={`mt-4 text-center font-medium ${
                message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
            >
            {message}
            </p>
        )}
        </div>
    )
}
