import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getBestSellingProducts(req, res) {
    try {
        const sales = await prisma.sale.findMany({
        include: { product: true },
        })

    const productSales = {}

    for (let sale of sales) {
        const name = sale.product.name
        productSales[name] = (productSales[name] || 0) + sale.quantity
        }

        const sorted = Object.entries(productSales)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)

        res.json(sorted)
    } catch (err) {
        console.error('Error fetching best-selling products:', err)
        res.status(500).json({ error: 'Failed to fetch best-selling products' })
    }
}
