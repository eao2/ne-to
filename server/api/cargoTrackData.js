import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const JWT_SECRET = process.env.JWT_SECRET || '0';
  const authHeader = getHeader(event, 'authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return { statusCode: 401, body: { message: 'Authorization header missing' } };
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return { statusCode: 401, body: { message: 'Invalid token' } };
    }

    // Fetch all CargoTracking data for the user
    const cargoTrackings = await prisma.cargoTracking.findMany({
      where: { userId: decoded.userId },
      select: {
        id: true,
        nickname: true,
        trackingNumber: true,
        cargoType: true,
        price: true,
        paymentStatus: true,
        preRegisteredDate: true,
        receivedAtErenhotDate: true,
        inTransitDate: true,
        deliveredToUBDate: true,
        deliveredDate: true,
        currentStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // If no cargo tracking data is found, return a 404
    if (!cargoTrackings || cargoTrackings.length === 0) {
      return { statusCode: 404, body: { message: 'No cargo tracking data found for this user' } };
    }

    // Return cargo tracking data
    return { statusCode: 200, body: cargoTrackings };
  } catch (err) {
    // Log the error for debugging
    console.error('Error in API endpoint:', err);

    // Return appropriate error messages
    if (err.name === 'JsonWebTokenError') {
      return { statusCode: 401, body: { message: 'Invalid or expired token' } };
    } else if (err.name === 'PrismaClientKnownRequestError') {
      return { statusCode: 500, body: { message: 'Database error' } };
    } else {
      return { statusCode: 500, body: { message: 'Internal server error' } };
    }
  } finally {
    // Close the Prisma connection
    await prisma.$disconnect();
  }
});