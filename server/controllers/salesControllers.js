import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

    export const addSale = async (req, res) => {
    try {
        const { productId, quantity, date } = req.body

        const saleDate = date ? new Date(date) : new Date() // Use provided date or now

        // 🔎 Find the product
        const product = await prisma.product.findUnique({
        where: { id: productId },
        })

        if (!product) {
        return res.status(404).json({ error: 'Product not found' })
        }

        // ❗ Check stock availability
        if (product.stock < quantity) {
        return res.status(400).json({ error: 'Not enough stock available' })
        }

        const total = product.price * quantity

        // ✅ Create the sale
        const sale = await prisma.sale.create({
        data: {
            productId,
            quantity,
            total,
            createdAt: saleDate, // 📅 Insert the date here
        },
        include: { product: true }, // Optional: helpful for frontend
        })

        // 🔻 Decrease stock
        await prisma.product.update({
        where: { id: productId },
        data: {
            stock: product.stock - quantity,
        },
        })

        res.status(201).json(sale)
    } catch (err) {
        console.error('❌ Error creating sale:', err)
        res.status(500).json({ error: 'Failed to add sale' })
    }
}
