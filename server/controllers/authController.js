import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Incoming login:', email, password); // ✅ check terminal for this

    // For now, use a hardcoded user for testing
    if (email === 'admin@example.com' && password === 'admin123') {
        const token = jwt.sign({ email, userId: 1 }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};
