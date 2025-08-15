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
    const trackingNumber = (query.trackingNumber || '').toString().trim()

    if (!trackingNumber) {
      return { statusCode: 400, body: { message: 'trackingNumber is required' } }
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded || !decoded.userId) {
      return { statusCode: 401, body: { message: 'Invalid token' } }
    }

    await prisma.$connect()

    const cargo = await prisma.cargoTracking.findFirst({
      where: {
        trackingNumber,
        userId: decoded.userId,
      },
      include: {
        destinationLocation: true,
        originLocation: true,
        deliveryRequests: true,
      },
    })

    if (!cargo) {
      return { statusCode: 404, body: { message: 'Cargo not found' } }
    }

    return { success: true, data: cargo }
  } catch (error) {
    console.error('Error fetching cargo detail:', error)
    return { statusCode: 500, message: 'Failed to fetch cargo detail', error: error.message }
  } finally {
    await prisma.$disconnect()
  }
})


