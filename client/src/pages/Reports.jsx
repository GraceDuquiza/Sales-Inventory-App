import { useEffect, useState, useContext } from 'react'
import { format, startOfWeek, addDays, startOfMonth } from 'date-fns'
import { Bar } from 'react-chartjs-2'
import { SaleContext } from '../context/SaleContext.jsx'
import { API } from '../services/api' // ✅ Custom axios instance

// Chart.js registration
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Reports() {
    const { saleUpdated } = useContext(SaleContext)

    // 👇 Controls for view type and selected date
    const [view, setView] = useState('weekly') // 'weekly' or 'monthly'
    const [selectedDate, setSelectedDate] = useState(() =>
        format(new Date(), 'yyyy-MM-dd')
    )

    // 📦 Chart data state
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // 🔁 Fetch data when view, date, or new sale happens
    useEffect(() => {
        const fetchReport = async () => {
        setLoading(true)
        try {
            const res = await API.get(`/reports/${view}`, {
            params: { date: selectedDate },
            })
            setData(res.data)
        } catch (err) {
            console.error('❌ Error fetching report:', err)
            setData([])
        } finally {
            setLoading(false)
        }
        }

        fetchReport()
    }, [saleUpdated, selectedDate, view])

    // 🧠 Generate X-axis labels for chart (days or dates)
    let labels = []

    if (view === 'weekly') {
        const start = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 }) // Sunday
        labels = Array.from({ length: 7 }, (_, i) => {
        const d = addDays(start, i)
        return `${format(d, 'EEE')} (${format(d, 'MM/dd')})`
        })
    } else {
        const baseDate = new Date(selectedDate)
        const monthStart = startOfMonth(baseDate)
        const daysInMonth = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + 1,
        0
        ).getDate()

        labels = Array.from({ length: daysInMonth }, (_, i) => {
        const d = addDays(monthStart, i)
        return format(d, 'MM/dd')
        })
    }

    // 📈 Chart.js configuration
    const chartData = {
        labels,
        datasets: [
        {
            label: 'Total Sales (₱)',
            data: data.map((d) => d.total),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderRadius: 8,
        },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
        title: {
            display: true,
            text: view === 'weekly' ? '📊 Weekly Sales Report' : '📊 Monthly Sales Report',
            font: { size: 18 },
        },
        legend: { display: false },
        },
        scales: {
        y: {
            beginAtZero: true,
            ticks: {
            callback: (value) => `₱${value}`,
            },
        },
        },
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">📋 Reports</h1>

        {/* 🔧 Controls for filtering */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <label className="text-sm font-medium">View:</label>
            <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border rounded px-2 py-1"
            >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            </select>

            <label className="text-sm font-medium">Date:</label>
            <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1"
            />
        </div>

        {/* 📈 Chart Output */}
        {loading ? (
            <p>Loading chart...</p>
        ) : data.length === 0 ? (
            <p>No sales data available for this period.</p>
        ) : (
            <Bar data={chartData} options={options} />
        )}
        </div>
    )
}
