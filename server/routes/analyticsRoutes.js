import express from 'express'
import { getBestSellingProducts } from '../analytics/bestSelling.js'
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅ Import middleware

const router = express.Router()


router.get('/best-selling',verifyToken, getBestSellingProducts)

export default router
