import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeeklySalesChart({ data }) {
const chartData = {
    labels: data?.map(item => item.day),
    datasets: [
    {
        label: 'Weekly Sales',
        data: data?.map(item => item.sales),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
    ],
};

return <Line data={chartData} />;
}