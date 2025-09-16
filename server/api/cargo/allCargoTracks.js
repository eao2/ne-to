// import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient()

import prisma from '../../utils/prisma.js'

export default defineEventHandler(async (event) => {
  const JWT_SECRET = process.env.JWT_SECRET || '0';
  const authHeader = getHeader(event, 'authorization');

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

    const cargos = await prisma.cargoTracking.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        destinationLocation: true
      },
      orderBy: [
        {
          currentStatus: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });

    return { success: true, data: cargos }

  } catch (error) {
    console.error("Error fetching cargo tracks:", error)
    return { statusCode: 500, message: "Failed to fetch cargo tracks", error: error.message }
  }
})
