import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { SaleContext } from '../context/SaleContext'

export default function Dashboard() {
    const { saleUpdated } = useContext(SaleContext)
    const [data, setData] = useState({ totalToday: 0, itemsSold: 0, topProduct: '—' })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboard = async () => {
        try {
            const res = await axios.get('/api/reports/dashboard')
            setData(res.data)
        } catch (err) {
            console.error('❌ Error loading dashboard:', err)
        } finally {
            setLoading(false)
        }
        }

    fetchDashboard()
    }, [saleUpdated])

    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded text-center">
                <p className="text-gray-500">Total Sales Today</p>
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
        </div>
    )
}
