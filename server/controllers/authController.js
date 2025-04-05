import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Incoming login:', email, password);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return res.json({ token });
};
