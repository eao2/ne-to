import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const JWT_SECRET = process.env.JWT_SECRET || '0'
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    return { statusCode: 401, body: { message: 'Authorization header missing' } }
  }

  const token = authHeader.split(' ')[1]

  try {
    const query = getQuery(event)
    const id = (query.id || '').trim()

    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded || !decoded.userId) {
      return { statusCode: 401, body: { message: 'Invalid token' } }
    }

    await prisma.$connect()

    const cargo = await prisma.cargoTracking.delete({
      where: {
        id,
        userId: decoded.userId,
      }
    })
    console.log('Cargo deleted:', cargo)

    if (!cargo) {
      return { statusCode: 404, body: { message: 'Cargo not found' } }
    }

    return { success: true, data: cargo }
  } catch (error) {
    console.error('Error deleting cargo:', error)
    return { statusCode: 500, message: 'Ачаа устгаж чадсангүй', error: error.message }
  } finally {
    await prisma.$disconnect()
  }
})


