import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (isSignup) {
            // SIGN UP logic
            await API.post("/auth/signup", { email, password });
            alert("🎉 Account created! Logging you in...");
        }

        // LOGIN logic
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/");
        } catch (err) {
        console.error("Login/Signup error:", err);
        alert("❌ Invalid login or signup failed.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
            {isSignup ? "📝 Sign Up" : "🔐 Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
            {isSignup ? "Create Account" : "Login"}
            </button>
            <p
            className="text-sm text-center text-blue-500 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
            >
            {isSignup ? "Already have an account? Log in" : "No account? Sign up"}
            </p>
        </form>
        </div>
    );
}
