// import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient()

import prisma from '../../utils/prisma.js'

const STATUS_PRIORITY = {
  'DELIVERED_TO_UB': 4,
  'IN_TRANSIT': 3,
  'RECEIVED_AT_ERENHOT': 2,
  'PRE_REGISTERED': 1
}

export default defineEventHandler(async (event) => {
  const JWT_SECRET = process.env.JWT_SECRET || '0';
  const authHeader = getHeader(event, 'authorization');

  if (!authHeader) {
    return { success: true, data: null, user: false };
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return { success: true, data: null, user: false };
    }

    const cargos = await prisma.cargoTracking.groupBy({
      by: ['currentStatus'],
      where: {
        userId: decoded.userId,
        currentStatus: {
          in: ['DELIVERED_TO_UB', 'IN_TRANSIT', 'RECEIVED_AT_ERENHOT', 'PRE_REGISTERED']
        }
      },
      _count: {
        currentStatus: true
      }
    });

    if (cargos.length === 0) {
      return { success: true, data: null, user: true };
    }

    // Find the highest priority status that has cargos
    const statusWithCounts = cargos.map(c => ({
      status: c.currentStatus,
      count: c._count.currentStatus,
      priority: STATUS_PRIORITY[c.currentStatus]
    }));

    const highestPriorityStatus = statusWithCounts.reduce((prev, current) => {
      return (current.priority > prev.priority) ? current : prev;
    });

    return { 
      success: true, 
      data: {
        status: highestPriorityStatus.status,
        count: highestPriorityStatus.count
      },
      user: true
    };

  } catch (error) {
    console.error("Error fetching cargo concise info:", error);
    return { success: true, data: null, user: false };
  }
});
