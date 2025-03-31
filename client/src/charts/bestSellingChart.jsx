// bestSellingChart.jsx
import React from 'react'

export default function BestSellingChart({ bestSellers }) {
    return (
        <div className="mt-10">
        <h2 className="text-xl font-bold mt-8 mb-2">🔥 Best Selling Products</h2>
        <ul className="list-disc pl-6">
            {bestSellers.length === 0 ? (
            <li>No sales data available.</li>
            ) : (
            bestSellers.map((item, i) => (
                <li key={i}>
                {item.name}: {item.quantity} sold
                </li>
            ))
            )}
        </ul>
        </div>
    )
}
