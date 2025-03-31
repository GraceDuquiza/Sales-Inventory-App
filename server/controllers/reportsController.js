import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// 📊 GET: Weekly Sales Report
    export const getWeeklySales = async (req, res) => {
    try {
        // ✅ Calculate start of this week (Sunday)
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        // ✅ Fetch sales from start of the week
        const sales = await prisma.sale.findMany({
        where: {
            createdAt: {
            gte: startOfWeek,
            },
        },
    })

    console.log('📦 Sales fetched for weekly report:', sales)

    // 🔢 Group sales by weekday index
    const dailyTotals = Array(7).fill(0)

    for (let sale of sales) {
        const dayIndex = new Date(sale.createdAt).getDay()
        dailyTotals[dayIndex] += sale.total
        }

        // 📆 Map totals to weekdays
        const result = days.map((day, i) => ({
        day,
        total: dailyTotals[i],
        }))

        res.json(result)
    } catch (err) {
        console.error('❌ Error in getWeeklySales:', err)
        res.status(500).json({ error: 'Failed to fetch weekly sales' })
}
}

// 🧾 GET: Dashboard Summary (Today's stats)
    export const getDashboardSummary = async (req, res) => {
    try {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const todaySales = await prisma.sale.findMany({
        where: {
            createdAt: { gte: todayStart }
        },
        include: { product: true }
    })

    const totalToday = todaySales.reduce((sum, sale) => sum + sale.total, 0)
    const itemsSold = todaySales.reduce((sum, sale) => sum + sale.quantity, 0)

    const productCount = {}
    todaySales.forEach(sale => {
        const name = sale.product.name
        productCount[name] = (productCount[name] || 0) + sale.quantity
        })

    const topProduct = Object.entries(productCount)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

        res.json({
        totalToday,
        itemsSold,
        topProduct
        })
    } catch (err) {
        console.error('❌ Dashboard summary error:', err)
        res.status(500).json({ error: 'Failed to load dashboard data' })
    }
}
