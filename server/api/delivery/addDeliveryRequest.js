import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const JWT_SECRET = process.env.JWT_SECRET || '0';
    const authHeader = getHeader(event, 'authorization');

    if (!authHeader) {
        return { statusCode: 401, message: 'Authorization header missing' };
    }

    const token = authHeader.split(' ')[1];

    try {
        const body = await readBody(event)
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded?.userId) {
            return { statusCode: 401, message: 'Invalid token' };
        }

        if (!body.cargoIds?.length || !body.deliveryAddressId) {
            return { statusCode: 400, message: 'Missing required fields' };
        }

        await prisma.$connect()

        // Create delivery requests for each cargo
        const deliveryRequests = await Promise.all(body.cargoIds.map(cargoId => 
            prisma.deliveryRequest.create({
                data: {
                    cargoId,
                    requestedByUserId: decoded.userId,
                    deliveryAddressId: body.deliveryAddressId,
                    status: 'PENDING'
                }
            })
        ));

        return { 
            success: true, 
            data: deliveryRequests,
            message: 'Хүргэлтийн захиалга амжилттай бүртгэгдлээ'
        }

    } catch (error) {
        console.error('Error creating delivery request:', error)
        return { 
            success: false, 
            message: 'Failed to create delivery request',
            error: error.message 
        }
    } finally {
        await prisma.$disconnect()
    }
})
