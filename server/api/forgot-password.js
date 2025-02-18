import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { phoneNumber } = body

    if (!phoneNumber) {
      throw createError({
        statusCode: 400,
        message: 'Phone number is required'
      })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Generate JWT token for password reset
    const token = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Create the reset URL
    const resetUrl = `${BASE_URL}/reset-password/${token}`

    // In a real application, you would send this URL via SMS or email
    // For now, we'll just log it
    console.log(`Reset password URL for ${user.phoneNumber}: ${resetUrl}`)

    // TODO: Add your SMS or email sending logic here
    // if (user.email) {
    //   await sendResetEmail(user.email, resetUrl)
    // }
    
    // Send SMS
    // await sendResetSms(user.phoneNumber, resetUrl)

    return {
      success: true,
      message: 'Password reset link has been sent'
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred while processing your request'
    })
  }
})