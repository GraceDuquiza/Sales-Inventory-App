// pages/Login.jsx
import { useState } from 'react';
import { API } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        alert('✅ Login successful!');
        window.location.href = '/'; // or navigate programmatically
        } catch (err) {
        console.error('Login error:', err);
        alert('❌ Invalid login');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
            <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-600 text-white py-2 rounded" type="submit">
            Login
            </button>
        </form>
        </div>
    );
}
