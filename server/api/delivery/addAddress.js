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

    await prisma.$connect();

    const newAddress = await prisma.deliveryAddress.create({
      data: {
        userId: decoded.userId,
        provinceOrCity: body.provinceOrCity,
        district: body.district,
        subDistrict: body.subDistrict,
        detailedLocation: body.detailedLocation,
        contactPhone: body.contactPhone,
        addressLabel: body.addressLabel,
        description: body.description
      }
    });

    // Set as default if it's the user's first address
    const addressCount = await prisma.deliveryAddress.count({
      where: { userId: decoded.userId }
    });

    if (addressCount === 1) {
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { defaultDeliveryAddressId: newAddress.id }
      });
    }

    return { 
      success: true, 
      data: newAddress,
      message: 'Хаяг амжилттай нэмэгдлээ'
    };

  } catch (error) {
    console.error('Error adding address:', error);
    return { success: false, message: 'Failed to add address' };
  } finally {
    await prisma.$disconnect();
  }
});
