import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { token, password } = body

    if (!token || !password) {
      throw createError({
        statusCode: 400,
        message: 'Token and password are required'
      })
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const userId = decoded.userId

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Update user password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      })

      return {
        success: true,
        message: 'Password reset successful'
      }
    } catch (err) {
      console.error('Password reset error:', err)
      
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
    console.error('Reset password error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred while resetting password'
    })
  }
})