import { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import { SaleContext } from '../context/SaleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { API } from '../services/api'; // ✅ Centralized API helper

export default function Dashboard() {
    const { saleUpdated } = useContext(SaleContext);

    // 📦 State for dashboard data
    const [data, setData] = useState({
        totalToday: 0,
        itemsSold: 0,
        topProduct: '—',
        detailedSales: [],
    });

    const [loading, setLoading] = useState(true);

    // 📅 Selected date for filtering dashboard data
    const [selectedDate, setSelectedDate] = useState(() =>
        format(new Date(), 'yyyy-MM-dd')
    );

    // 🔁 Re-fetch dashboard data when:
    // - The component mounts
    // - The selected date changes
    // - A new sale is added (via SaleContext)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        window.location.href = '/login'; // or use react-router navigate
        }
        const fetchDashboard = async () => {
        setLoading(true);
        try {
            // ✅ Fetch dashboard data with query param: ?date=YYYY-MM-DD
            const res = await API.get('/reports/dashboard', {
            params: { date: selectedDate },
            });

            console.log('📦 Dashboard API Response:', res.data); // ✅ Debug: inspect the response

            setData(res.data); // ✅ Store fetched data in state
        } catch (err) {
            console.error('❌ Error loading dashboard:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchDashboard();
    }, [saleUpdated, selectedDate]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

            {/* 📆 Date Picker */}
            <div className="mb-6 flex items-center gap-3">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Select Date:
            </label>
            <input
                type="date"
                id="date"
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
            </div>

            {/* 🔢 Summary Cards */}
            {loading ? (
            <p className="text-gray-600">Loading...</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                <CardContent className="p-4 text-center">
                    <p className="text-gray-500">Total Sales on {selectedDate}</p>
                    <p className="text-2xl font-bold">₱{Number(data.totalToday).toLocaleString('en-PH', {
                    minimumFractionDigits: 2,maximumFractionDigits: 2,})}</p>
                </CardContent>
                </Card>
                <Card>
                <CardContent className="p-4 text-center">
                    <p className="text-gray-500">Items Sold</p>
                    <p className="text-2xl font-bold">{data.itemsSold} pcs</p>
                </CardContent>
                </Card>
                <Card>
                <CardContent className="p-4 text-center">
                    <p className="text-gray-500">Top Product</p>
                    <p className="text-2xl font-bold">{data.topProduct}</p>
                </CardContent>
                </Card>
            </div>
            )}

            {/* 🧾 Table of Products Sold */}
            {data.detailedSales && data.detailedSales.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">🧾 Products Sold</h3>
                <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                    <th className="p-3 font-medium text-gray-700">Product</th>
                    <th className="p-3 font-medium text-gray-700">Quantity</th>
                    <th className="p-3 font-medium text-gray-700">Price (₱)</th>
                    <th className="p-3 font-medium text-gray-700">Total (₱)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.detailedSales.map((item) => (
                    <tr key={item.name} className="border-t hover:bg-gray-50">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3">₱{Number(item.price).toLocaleString('en-PH', 
                            {minimumFractionDigits: 2,maximumFractionDigits: 2,})}
</td>
                        <td className="p-3">₱{Number(item.total).toLocaleString('en-PH', 
                        { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}
