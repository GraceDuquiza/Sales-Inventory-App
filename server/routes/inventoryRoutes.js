import express from 'express'
import { getInventory, addInventory, removeInventory } from '../controllers/inventoryController.js'
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅ Import middleware

const router = express.Router()

// ✅ Protect routes


router.get('/',verifyToken, getInventory)
router.post('/',verifyToken, addInventory);
router.delete('/:id', removeInventory)




export default router
