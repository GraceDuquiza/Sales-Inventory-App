import express from 'express'
import { getDashboardSummary, getWeeklySales, getMonthlySales } from '../controllers/reportsController.js'
import { getBestSellingProducts } from '../analytics/analyticsController.js'


const router = express.Router()

router.get('/weekly', getWeeklySales)
router.get('/dashboard', getDashboardSummary)
router.get('/monthly', getMonthlySales) // ✅ new route
router.get('/analytics/best-sellers', getBestSellingProducts)

export default router
