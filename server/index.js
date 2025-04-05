import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';

import { fileURLToPath } from 'url';

import ReportRoutes from './routes/ReportRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import loginRoutes from './routes/loginRoutes.js';

// Load env variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json())
app.use(cors({
    origin: [
    'http://localhost:5173',
    'https://salesinventoryapp-ba0dc.web.app',
    'https://sales-inventory-app.onrender.com'
],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use('/api/auth', loginRoutes);


// API Routes
app.use('/api/reports', ReportRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/analytics', analyticsRoutes)

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req, res) => {
    res.send('✅ Sales Inventory API is running. Use /api/... endpoints.');
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
