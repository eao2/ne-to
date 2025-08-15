import { PrismaClient } from '#prisma'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { token } = body

    if (!token) {
      throw createError({
        statusCode: 400,
        message: 'Token is required'
      })
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, phoneNumber: true }
      })

      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        })
      }

      return {
        valid: true,
        user: {
          id: user.id,
          phoneNumber: user.phoneNumber
        }
      }
    } catch (err) {
      console.error('Token verification error:', err)
      
      // Handle different JWT errors
      if (err.name === 'TokenExpiredError') {
        throw createError({
          statusCode: 401,
          message: 'Token has expired'
        })
      } else if (err.name === 'JsonWebTokenError') {
        throw createError({
          statusCode: 401,
          message: 'Invalid token'
        })
      } else {
        throw createError({
          statusCode: 401,
          message: 'Token verification failed'
        })
      }
    }
  } catch (error) {
    console.error('Verify reset token error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred while verifying token'
    })
  }
})