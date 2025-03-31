// server/analytics/analyticsController.js

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getBestSellingProducts = async (req, res) => {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                product: true
            }
        })

        const productMap = {}

        for (const sale of sales) {
            const name = sale.product.name
            if (!productMap[name]) {
                productMap[name] = 0
            }
            productMap[name] += sale.quantity
        }

        const bestSellers = Object.entries(productMap)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)

        res.json(bestSellers)
    } catch (err) {
        console.error('❌ Error fetching best-selling products:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}
