import express from 'express'
import { getBestSellingProducts } from '../analytics/bestSelling.js'

const router = express.Router()

router.get('/best-selling', getBestSellingProducts)

export default router
