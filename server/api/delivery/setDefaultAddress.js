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
    const body = await readBody(event);
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded?.userId) {
      return { statusCode: 401, message: 'Invalid token' };
    }

    if (!body.addressId) {
      return { statusCode: 400, message: 'Address ID is required' };
    }

    await prisma.$connect();

    // Verify address belongs to user
    const address = await prisma.deliveryAddress.findFirst({
      where: {
        id: body.addressId,
        userId: decoded.userId
      }
    });

    if (!address) {
      return { statusCode: 404, message: 'Address not found' };
    }

    // Update user's default address
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { defaultDeliveryAddressId: body.addressId }
    });

    return { 
      success: true, 
      message: 'Үндсэн хаяг амжилттай өөрчлөгдлөө'
    };

  } catch (error) {
    console.error('Error setting default address:', error);
    return { success: false, message: 'Failed to set default address' };
  } finally {
    await prisma.$disconnect();
  }
});
