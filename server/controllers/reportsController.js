import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// 📊 GET: Weekly Sales Report
export const getWeeklySales = async (req, res) => {
    try {
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay()) // Start of current week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0)

        const sales = await prisma.sale.findMany({
        where: {
            createdAt: {
            gte: startOfWeek
            }
        }
        })

        console.log('📦 Sales fetched for weekly report:', sales)

        // 🔢 Group by weekday
        const dailyTotals = Array(7).fill(0)

        for (let sale of sales) {
        const dayIndex = new Date(sale.createdAt).getDay()
        dailyTotals[dayIndex] += sale.total
        }

        const result = days.map((day, i) => ({
        day,
        total: dailyTotals[i]
        }))

        res.json(result)
    } catch (err) {
        console.error('❌ Error in getWeeklySales:', err)
        res.status(500).json({ error: 'Failed to fetch weekly sales' })
    }
    }

    export const getMonthlySales = async (req, res) => {
            try {
            const { date } = req.query
            const selectedDate = date ? new Date(date) : new Date()
        
            const year = selectedDate.getFullYear()
            const month = selectedDate.getMonth()
        
            const monthStart = new Date(year, month, 1)
            const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999)
        
            const sales = await prisma.sale.findMany({
                where: {
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd
                }
                }
            })
        
            const daysInMonth = new Date(year, month + 1, 0).getDate()
            const dailyTotals = Array(daysInMonth).fill(0)
        
            for (let sale of sales) {
                const saleDay = new Date(sale.createdAt).getDate() - 1
                dailyTotals[saleDay] += sale.total
            }
        
            const result = Array.from({ length: daysInMonth }, (_, i) => ({
                day: i + 1,
                total: dailyTotals[i]
            }))
        
            res.json(result)
            } catch (err) {
            console.error('❌ Error in getMonthlySales:', err)
            res.status(500).json({ error: 'Failed to fetch monthly sales' })
            }
        }
        

        // 🧾 GET: Dashboard Summary (with date filter support)
    export const getDashboardSummary = async (req, res) => {
    try {
        const { date } = req.query

        // Fallback to today if no date provided
        const selectedDate = date ? new Date(date) : new Date()

        const dayStart = new Date(selectedDate)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(selectedDate)
        dayEnd.setHours(23, 59, 59, 999)

        const sales = await prisma.sale.findMany({
        where: {
            createdAt: {
            gte: dayStart,
            lte: dayEnd
            }
        },
        include: {
            product: true
        }
        })

        const totalToday = sales.reduce((sum, sale) => sum + sale.total, 0)
        const itemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0)

        const productCount = {}
        sales.forEach(sale => {
        const { product } = sale
        const { name } = product
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
