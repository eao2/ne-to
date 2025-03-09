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

    console.log("🔍 Checking cargo tracking entry...")

    await prisma.$connect()

    const checkExist = await prisma.cargoTracking.findUnique({
      where: {
        trackingNumber: body.trackingNumber.trim()
      }
    })

    // If cargo exists and has a status of RECEIVED_AT_ERENHOT or IN_TRANSIT and no user assigned
    if (checkExist && 
        (checkExist.currentStatus === 'RECEIVED_AT_ERENHOT' || checkExist.currentStatus === 'IN_TRANSIT') && 
        !checkExist.userId) {
      // Update the cargo with user's ID
      const updatedCargo = await prisma.cargoTracking.update({
        where: {
          trackingNumber: body.trackingNumber.trim()
        },
        data: {
          userId: decoded.userId,
          nickname: body.nickname || null
        }
      })
      
      console.log("✅ Cargo claimed and updated:", updatedCargo)
      return { success: true, data: updatedCargo, message: 'Ачаа амжилттай холбогдлоо' }
    }

    // If cargo exists but doesn't meet update criteria
    if (checkExist) {
      if (checkExist.userId) {
        return { statusCode: 406, body: { message: 'Аль хэдийн бүртгэгдсэн байна' } }
      } else {
        return { statusCode: 406, body: { message: 'Энэ ачаа одоогоор бүртгэх боломжгүй байна' } }
      }
    }

    // Insert new cargo if it doesn't exist
    const newCargo = await prisma.cargoTracking.create({
      data: {
        trackingNumber: body.trackingNumber.trim(),
        nickname: body.nickname ? body.nickname : null,
        cargoType: body.cargoType || "NORMAL",
        price: null,
        paymentStatus: "PENDING",
        preRegisteredDate: new Date(),
        currentStatus: "PRE_REGISTERED",
        userId: decoded.userId
      }
    })

    console.log("✅ New cargo created:", newCargo)
    return { success: true, data: newCargo, message: 'Шинэ ачаа амжилттай бүртгэгдлээ' }

  } catch (error) {
    console.error("❌ Error processing cargo:", error)
    return { statusCode: 500, message: "Failed to process cargo", error: error.message }
  } finally {
    await prisma.$disconnect()
  }
})
