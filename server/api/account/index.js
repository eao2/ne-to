import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// Add validation helpers
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{8}$/;
    return phoneRegex.test(phone);
};

export default defineEventHandler(async (event) => {
    const JWT_SECRET = process.env.JWT_SECRET || '0'
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
        return { statusCode: 401, message: 'Authorization header missing' }
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded?.userId) {
            return { statusCode: 401, message: 'Invalid token' }
        }

        await prisma.$connect()

        if (event.method === 'GET') {
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                include: {
                    defaultDeliveryAddress: true
                }
            })

            if (!user) {
                return { statusCode: 404, message: 'User not found' }
            }

            return {
                success: true,
                data: user
            }
        }

        if (event.method === 'PATCH') {
            const body = await readBody(event)
            const { field, value } = body

            if (!field) {
                return { statusCode: 400, message: 'Field is required' }
            }

            // Validate field names
            const allowedFields = ['name', 'phoneNumber', 'email', 'autoDeliveryRequest']
            if (!allowedFields.includes(field)) {
                return { statusCode: 400, message: 'Invalid field' }
            }

            // Add special validation for autoDeliveryRequest
            if (field === 'autoDeliveryRequest' && value === true) {
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                    include: { defaultDeliveryAddress: true }
                })

                if (!user.defaultDeliveryAddress) {
                    return {
                        statusCode: 400,
                        message: 'Үндсэн хаягаа сонгосны дараа хүргэлтийг идэвхжүүлэх боломжтой'
                    }
                }
            }

            // Validate email format
            if (field === 'email' && value) {
                if (!isValidEmail(value)) {
                    return {
                        statusCode: 400,
                        message: 'И-мэйл хаяг буруу байна'
                    }
                }
            }

            // Validate phone number format
            if (field === 'phoneNumber') {
                if (!isValidPhoneNumber(value)) {
                    return {
                        statusCode: 400,
                        message: 'Утасны дугаар 8 оронтой тоо байх ёстой'
                    }
                }
            }

            // Special validation for unique fields
            if (field === 'phoneNumber' || field === 'email') {
                const existing = await prisma.user.findFirst({
                    where: {
                        [field]: value,
                        NOT: { id: decoded.userId }
                    }
                })

                if (existing) {
                    return {
                        statusCode: 400,
                        message: field === 'phoneNumber' ? 
                            'Энэ утасны дугаар бүртгэлтэй байна' : 
                            'Энэ и-мэйл хаяг бүртгэлтэй байна'
                    }
                }
            }

            const updatedUser = await prisma.user.update({
                where: { id: decoded.userId },
                data: { [field]: value }
            })

            return {
                success: true,
                data: updatedUser
            }
        }

        return { statusCode: 405, message: 'Method not allowed' }

    } catch (error) {
        console.error('Account API error:', error)
        return { statusCode: 500, message: 'Internal server error' }
    } finally {
        await prisma.$disconnect()
    }
})
