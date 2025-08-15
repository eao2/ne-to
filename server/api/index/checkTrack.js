import { PrismaClient } from '#prisma'

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

    await prisma.$connect()

    const cargo = await prisma.cargoTracking.findUnique({
      where: { trackingNumber },
      include: {
        destinationLocation: true,
      }
    })
    if (!cargo) {
      throw createError({ 
        statusCode: 404, 
        message: "Трак код олдсонгүй."
      })
    }

    console.log(cargo)
    
    return { success: true, data: cargo }
  } catch (error) {
    console.error("Error fetching cargo tracking:", error.message, error.stack)
    throw createError({ 
      statusCode: 404, 
      message: "Трак код олдсонгүй."
    })
  } finally {
    await prisma.$disconnect()
  }
})