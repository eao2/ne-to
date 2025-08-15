import { PrismaClient } from '#prisma'
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
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded?.userId) {
            return { statusCode: 401, message: 'Invalid token' };
        }

        await prisma.$connect()

        const cargos = await prisma.cargoTracking.findMany({
            where: {
                userId: decoded.userId,
                currentStatus: {
                    in: ['PRE_REGISTERED', 'RECEIVED_AT_ERENHOT', 'IN_TRANSIT', 'DELIVERED_TO_UB']
                },
                deliveryRequests: {
                    none: {
                        status: {
                            in: ['PENDING', 'APPROVED']
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                destinationLocation: true
            }
        });

        // Group cargos by status
        const grouped = {
            DELIVERED_TO_UB: [],
            IN_TRANSIT: [],
            RECEIVED_AT_ERENHOT: [],
            PRE_REGISTERED: []
        };

        cargos.forEach(cargo => {
            grouped[cargo.currentStatus].push(cargo);
        });

        return { success: true, data: grouped };

    } catch (error) {
        console.error('Error fetching available cargos:', error)
        return { 
            success: false, 
            message: 'Failed to fetch available cargos',
            error: error.message 
        }
    } finally {
        await prisma.$disconnect()
    }
})
