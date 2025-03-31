import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InventoryChart({ data }) {
  const chartData = {
    labels: data?.map(item => item.product),
    datasets: [
      {
        label: 'Inventory Stock',
        data: data?.map(item => item.stock),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
    },
    ],
};

return <Bar data={chartData} />;
}