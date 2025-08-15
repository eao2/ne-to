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
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded?.userId) {
      return { statusCode: 401, message: 'Invalid token' };
    }

    await prisma.$connect();

    const addresses = await prisma.deliveryAddress.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        defaultForUser: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });


    return { 
      success: true, 
      data: addresses.map(addr => ({
        ...addr,
        isDefault: !!addr.defaultForUser
      }))
    };

  } catch (error) {
    console.error('Error fetching addresses:', error);
    return { success: false, message: 'Failed to fetch addresses' };
  } finally {
    await prisma.$disconnect();
  }
});
