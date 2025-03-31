import express from 'express'
import { addSale } from '../controllers/salesControllers.js'

const router = express.Router()

router.post('/', addSale)

export default router
