import { Link } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

    export default function Navbar() {
    return (
        <header className="bg-white shadow-sm w-full sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">📦 Sales Inventory</h1>

            {/* Mobile menu */}
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                <Menu className="w-6 h-6 text-gray-800" />
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                <nav className="flex flex-col space-y-4 mt-8">
                    <Link to="/" className="hover:text-blue-600">Dashboard</Link>
                    <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
                    <Link to="/sales" className="hover:text-blue-600">Sales</Link>
                    <Link to="/reports" className="hover:text-blue-600">Reports</Link>
                </nav>
                </SheetContent>
            </Sheet>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
            <Link to="/sales" className="hover:text-blue-600">Sales</Link>
            <Link to="/reports" className="hover:text-blue-600">Reports</Link>
            </nav>
        </div>
        </header>
    )
}
