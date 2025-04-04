import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="bg-white shadow-md mb-6">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">📦 Sales Inventory</h1>
            <div className="flex gap-6">
            <Link to="/" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
            <Link to="/sales" className="hover:text-blue-600">Sales</Link>
            <Link to="/reports" className="hover:text-blue-600">Reports</Link>
            </div>
        </nav>
        </header>
    )
}
