import express from 'express'
import { addSale } from '../controllers/salesControllers.js'
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅ Import middleware

const router = express.Router()


router.post('/',verifyToken, addSale)

export default router
