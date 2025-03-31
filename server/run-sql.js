import fs from 'fs'
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Client } = pkg

const file = process.argv[2]

if (!file) {
    console.error('❌ Please provide a path to a SQL file.')
    process.exit(1)
}

const runSQL = async () => {
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    })

    try {
    await client.connect()
    const sql = fs.readFileSync(file).toString()
    const result = await client.query(sql)
    console.log(`✅ Executed "${file}" → ${result.rowCount} rows affected`)
    } catch (error) {
    console.error('❌ Error executing SQL:', error)
    } finally {
    await client.end()
    }
}

runSQL()
