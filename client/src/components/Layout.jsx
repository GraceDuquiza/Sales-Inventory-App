import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* 🔁 Reusable Navbar component */}
        <header className="bg-white shadow-md mb-6">
            <Navbar />
        </header>

        <main className="max-w-6xl mx-auto px-4">
            {/* Where all protected pages (Dashboard, Inventory, etc.) will render */}
            <Outlet />
        </main>
        </div>
    )
}
