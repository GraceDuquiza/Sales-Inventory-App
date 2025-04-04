import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET /api/inventory
    export const getInventory = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
        orderBy: { id: 'asc' }
        })
        res.json(products)
    } catch (error) {
        console.error('❌ Error fetching inventory:', error)
        res.status(500).json({ error: 'Failed to fetch inventory' })
    }
    }

// POST /api/inventory
    export const addInventory = async (req, res) => {
    const { name, stock, price, createdAt } = req.body

    if (!name || stock == null || price == null) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const newProduct = await prisma.product.create({
        data: {
            name,
            stock: Number(stock),
            price: Number(price),
            createdAt: createdAt ? new Date(createdAt) : undefined
        },
        })

        res.status(201).json(newProduct)
    } catch (error) {
        console.error('❌ Error adding inventory:', error)
        res.status(500).json({ error: 'Failed to add product' })
    }
}

export const removeInventory = async (req, res) => {
    const { id } = req.params

    try {
        await prisma.product.update({
            where: { id: Number(id) },
            data: {
                deletedAt: new Date()
            }
        })

        res.json({ message: 'Product marked as deleted' })
    } catch (err) {
        console.error('❌ Error deleting product:', err)
        res.status(500).json({ error: 'Failed to delete product' })
    }
}
