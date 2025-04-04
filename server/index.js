import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import ReportRoutes from './routes/ReportRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'

// Load env variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors({
    origin: [
    'http://localhost:5173',
    'https://your-firebase-site.web.app',
    'https://your-custom-domain.com'
],
    credentials: true
}))

// API Routes
app.use('/api/reports', ReportRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/analytics', analyticsRoutes)

// ✅ Serve frontend for production (Render or local build)
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 👉 Serve static files from client/dist
app.use(express.static(path.join(__dirname, '../client/dist')))

// 👉 Handle SPA routing for all other paths
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
