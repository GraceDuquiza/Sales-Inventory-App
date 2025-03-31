import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// 📊 GET: Weekly Sales Report
export const getWeeklySales = async (req, res) => {
    try {
        const { date } = req.query
        const baseDate = date ? new Date(date) : new Date()

        const startOfWeek = new Date(baseDate)
        startOfWeek.setDate(baseDate.getDate() - baseDate.getDay()) // Sunday
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(endOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        const sales = await prisma.sale.findMany({
        where: {
            createdAt: {
            gte: startOfWeek,
            lte: endOfWeek
            }
        }
        })

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

    // 📆 GET: Monthly Sales Report
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

    // 🧾 GET: Dashboard Summary with product list
    export const getDashboardSummary = async (req, res) => {
    try {
        const { date } = req.query
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
        const detailedSales = []

        sales.forEach(({ product, quantity, total }) => {
        const { name, price } = product

        if (!productCount[name]) {
            productCount[name] = {
            name,
            quantity: 0,
            price,
            total: 0
            }
        }

        productCount[name].quantity += quantity
        productCount[name].total += total
        })

        // Convert object to array
        for (const entry of Object.values(productCount)) {
        detailedSales.push(entry)
        }

        const topProduct = detailedSales.sort((a, b) => b.quantity - a.quantity)[0]?.name || '—'

        res.json({
        totalToday,
        itemsSold,
        topProduct,
        detailedSales
        })
    } catch (err) {
        console.error('❌ Dashboard summary error:', err)
        res.status(500).json({ error: 'Failed to load dashboard data' })
    }
    }
