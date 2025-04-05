// components/ProtectedRoute.jsx
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setAuthenticated(!!token)
        setLoading(false)
    }, [])


    if (loading) {
        return (
            <p className="p-4">🔒 Checking login...</p>
        );
    }
    return authenticated ? children : <Navigate to="/login" />
}
