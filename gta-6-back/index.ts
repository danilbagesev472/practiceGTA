import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
const app = express()
const PORT = 5000

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.post('/api', async (req, res) => {
	const { email, name } = req.body
	if (!email || !name) {
		return res.status(404).json({ message: 'Note email or name!' })
	}
	try {
		const createRow = await prisma.waitList.create({ data: { email, name } })

		res.json(createRow)
	} catch (error) {
		res.status(400).send({ message: error })
	}
})
const server = app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})
