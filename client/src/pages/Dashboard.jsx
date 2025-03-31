import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { SaleContext } from '../context/SaleContext'
import { format } from 'date-fns' // 📅 Import from date-fns

export default function Dashboard() {
    const { saleUpdated } = useContext(SaleContext)
    const [data, setData] = useState({ totalToday: 0, itemsSold: 0, topProduct: '—' })
    const [loading, setLoading] = useState(true)

    // 🗓 Default to today's date formatted as YYYY-MM-DD
    const [selectedDate, setSelectedDate] = useState(() => format(new Date(), 'yyyy-MM-dd'))

    useEffect(() => {
        const fetchDashboard = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/reports/dashboard', {
            params: { date: selectedDate },
            })
            setData(res.data)
        } catch (err) {
            console.error('❌ Error loading dashboard:', err)
        } finally {
            setLoading(false)
        }
        }

        fetchDashboard()
    }, [saleUpdated, selectedDate])

    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

        {/* Date Picker */}
        <div className="mb-4">
            <label htmlFor="date" className="text-sm text-gray-600">Select Date:</label>
            <input
            type="date"
            id="date"
            className="ml-2 px-2 py-1 border rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            />
        </div>

        {/* Loading State */}
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded text-center">
                <p className="text-gray-500">Total Sales on {selectedDate}</p>
                <p className="text-xl font-bold">₱{data.totalToday}</p>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
                <p className="text-gray-500">Items Sold</p>
                <p className="text-xl font-bold">{data.itemsSold} pcs</p>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
                <p className="text-gray-500">Top Product</p>
                <p className="text-xl font-bold">{data.topProduct}</p>
            </div>
            </div>
        )}

        {/* Product Table */}
        {data.detailedSales && data.detailedSales.length > 0 && (
            <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">🧾 Products Sold</h3>
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price (₱)</th>
                    <th className="p-3">Total (₱)</th>
                </tr>
                </thead>
                <tbody>
                {data.detailedSales.map((item) => (
                    <tr key={item.name} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">₱{item.price.toFixed(2)}</td>
                    <td className="p-3">₱{item.total.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    )
}
