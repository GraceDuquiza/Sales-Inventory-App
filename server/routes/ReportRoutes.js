import express from 'express'
import { getDashboardSummary, getWeeklySales, getMonthlySales } from '../controllers/reportsController.js'
import { getBestSellingProducts } from '../analytics/analyticsController.js'
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅ Import middleware


const router = express.Router()


router.get('/weekly', verifyToken, getWeeklySales)
router.get('/dashboard',verifyToken, getDashboardSummary)
router.get('/monthly',verifyToken, getMonthlySales) // ✅ new route
router.get('/analytics/best-sellers',verifyToken, getBestSellingProducts)

export default router
