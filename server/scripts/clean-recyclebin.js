import readline from 'readline'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Utility to ask for confirmation
const askConfirmation = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
        rl.close()
        resolve(answer.toLowerCase())
        })
    })
}

async function cleanRecycleBin() {
    try {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const productsToDelete = await prisma.product.findMany({
        where: {
            deletedAt: {
            lte: oneWeekAgo,
            },
        },
        })

        if (productsToDelete.length === 0) {
        console.log('✅ No products to permanently delete.')
        return
        }

        console.log(`🗑️ Found ${productsToDelete.length} product(s) to permanently delete:`)
        productsToDelete.forEach((p) => {
        console.log(` - ${p.name} (ID: ${p.id}) deleted at ${p.deletedAt}`)
        })

        const confirm = await askConfirmation('⚠️ Are you sure you want to permanently delete these? (yes/no): ')
        if (confirm !== 'yes') {
        console.log('❌ Operation cancelled.')
        return
    }

        const result = await prisma.product.deleteMany({
        where: {
            deletedAt: {
            lte: oneWeekAgo,
            },
        },
        })

        console.log(`✅ Permanently deleted ${result.count} product(s) from recycle bin.`)
    } catch (err) {
        console.error('❌ Error during cleanup:', err)
    } finally {
        await prisma.$disconnect()
    }
}

cleanRecycleBin()
