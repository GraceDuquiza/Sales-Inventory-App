import express from 'express'
import { getInventory, addInventory, removeInventory } from '../controllers/inventoryController.js'

const router = express.Router()

router.get('/', getInventory)
router.post('/', addInventory);
router.delete('/:id', removeInventory)



export default router
