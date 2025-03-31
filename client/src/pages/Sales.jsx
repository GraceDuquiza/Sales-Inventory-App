import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { SaleContext } from '../context/SaleContext.jsx'

export default function Sales() {
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        productId: '',
        quantity: 1,
        date: format(new Date(), 'yyyy-MM-dd') // Default to today
    })
    const [message, setMessage] = useState('')
    const { triggerSaleUpdate } = useContext(SaleContext)

    useEffect(() => {
        axios.get('/api/inventory').then((res) => setProducts(res.data))
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const selectedProduct = products.find(
        (p) => p.id === Number(form.productId)
    )
    const total = selectedProduct
        ? selectedProduct.price * Number(form.quantity)
        : 0

    const handleSubmit = async (e) => {
    e.preventDefault()

        if (Number(form.quantity) <= 0) {
        setMessage('❌ Quantity must be at least 1')
        return
        }

        try {
        await axios.post('/api/sales', {
            productId: Number(form.productId),
            quantity: Number(form.quantity),
            date: form.date // Send date to backend
        })

        setMessage('✅ Sale recorded!')
        setForm({
            productId: '',
            quantity: 1,
            date: format(new Date(), 'yyyy-MM-dd')
        })
        triggerSaleUpdate()

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000)
            } catch (err) {
        console.error(err)
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

        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 shadow rounded-lg"
        >
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

            <p className="font-semibold">Total: ₱{total.toFixed(2)}</p>

                <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Submit Sale
            </button>
        </form>

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
