import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const JWT_SECRET = process.env.JWT_SECRET || '0';
  const authHeader = getHeader(event, 'authorization');

  if (!authHeader) {
    return { statusCode: 401, body: { message: 'Authorization header missing' } };
  }

  const token = authHeader.split(' ')[1];

  try {
    const body = await readBody(event)

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return { statusCode: 401, body: { message: 'Invalid token' } };
    }

    // Validate required fields
    if (!body.trackingNumber) {
      throw createError({ statusCode: 400, message: "Tracking number is required." })
    }

    console.log("🆕 Creating cargo tracking entry...")

    await prisma.$connect()

    // Insert new cargo
    const newCargo = await prisma.cargoTracking.create({
      data: {
        trackingNumber: body.trackingNumber,
        nickname: body.nickname ? body.nickname : null,
        cargoType: body.cargoType || "NORMAL",
        price: null,
        paymentStatus: "PENDING",
        preRegisteredDate: new Date(),
        currentStatus: "PRE_REGISTERED",
        userId: decoded.userId || null
      }
    })

    console.log("✅ Cargo created:", newCargo)

    return { success: true, data: newCargo }
  } catch (error) {
    console.error("❌ Error creating cargo:", error)
    return { statusCode: 500, message: "Failed to create cargo", error: error.message }
  } finally {
    await prisma.$disconnect()
  }
})
