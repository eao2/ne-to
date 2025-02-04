import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { trackingNumber } = query

    if (!trackingNumber) {
      throw createError({ 
        statusCode: 400,
        message: "Tracking number is required." 
      })
    }

    // Ensure Prisma is connected
    await prisma.$connect()
    // Fetch tracking data
    const cargo = await prisma.cargoTracking.findUnique({
      where: { trackingNumber }
    })


    if (!cargo) {
      console.log('404')
      throw createError({ 
        statusCode: 404, 
        message: "Трак код олдсонгүй."
      })
    }
    
    return { success: true, data: cargo }
  } catch (error) {
    console.error("Error fetching cargo tracking:", error.message, error.stack)
    throw createError({ 
      statusCode: 404, 
      message: "Трак код олдсонгүй."
    })
  } finally {
    await prisma.$disconnect()  // Prevents memory leaks
  }
})
