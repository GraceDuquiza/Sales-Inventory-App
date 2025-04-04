import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Layout from './components/Layout'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
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

      <main className="max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  )
}
