import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { SaleContext } from '../context/SaleContext.jsx'
import { Bar } from 'react-chartjs-2'
import BestSellingChart from '../charts/bestSellingChart'
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
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [bestSellers, setBestSellers] = useState([])
    const { saleUpdated } = useContext(SaleContext)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get('/api/reports/weekly')
                setData(res.data)
            } catch (err) {
                console.error('❌ Error fetching report:', err)
                setData([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [saleUpdated])

    useEffect(() => {
        axios.get('/api/analytics/best-selling')
            .then(res => setBestSellers(res.data))
            .catch(err => console.error('❌ Error fetching best sellers:', err))
    }, [saleUpdated])

    const chartData = {
        labels: Array.isArray(data) ? data.map((d) => d.day) : [],
        datasets: [
            {
                label: 'Total Sales (₱)',
                data: Array.isArray(data) ? data.map((d) => d.total) : [],
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
                text: '📊 Weekly Sales Report',
                font: { size: 18 },
            },
            legend: {
                display: false,
            },
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
            <h1 className="text-2xl font-bold mb-4">Reports</h1>

            {loading ? (
                <p>Loading chart...</p>
            ) : data.length === 0 ? (
                <p>No sales recorded this week.</p>
            ) : (
                <Bar data={chartData} options={options} />
            )}

            <BestSellingChart bestSellers={bestSellers} />
        </div>
    )
}
