import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ReportRoutes from './routes/ReportRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'






dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/reports', ReportRoutes) // 👈 Add this

app.use('/api/inventory', inventoryRoutes)

app.use('/api/sales', salesRoutes)

app.use('/api/analytics', analyticsRoutes)




app.get('/api/test', (req, res) => {
res.json({ message: '✅ API is working!' })
})

app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`)
})
