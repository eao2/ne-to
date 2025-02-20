// server/api/register.js
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { surName, name, phoneNumber, email, password } = body

  // Validate required fields
  if (!phoneNumber || !password) {
    throw createError({ 
      statusCode: 400, 
      message: 'Phone number and password are required.' 
    })
  }

  // Check if user exists with phoneNumber
  const existingUser = await prisma.user.findUnique({
    where: { phoneNumber },
  })  
  
  // Check if user exists with email
  const existingUserEmail = await prisma.user.findUnique({
    where: { email },
  })

  if(existingUserEmail){
    if(existingUserEmail.phoneNumber === phoneNumber){
      throw createError({ 
        statusCode: 409, 
        message: 'Энэ хэрэглэгч аль хэдийн бүртгэгдсэн байна.' 
      })
    }else{
      throw createError({
        statusCode: 409, 
        message: 'Энэ имэйл хаяг дээр хэрэглэгч аль хэдийн бүртгэгдсэн байна.' 
      })
    }
  }

  if (existingUser) {
    if (existingUser.userType === 'REGISTERED') {
      throw createError({ 
        statusCode: 409, 
        message: 'Энэ утасны дугаартай хэрэглэгч аль хэдийн бүртгэгдсэн байна.' 
      })
    }

    // If the email is provided, check if it already exists for another user
    if (email) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingEmailUser && existingEmailUser.phoneNumber !== phoneNumber) {
        throw createError({
          statusCode: 409,
          message: 'Энэ имэйл аль хэдийн өөр хэрэглэгч дээр ашиглагдаж байна.',
        })
      }
    }

    // If user exists but is TEMPORARY, update their record
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const t0 = performance.now()

      const updatedUser = await prisma.user.update({
        where: { phoneNumber },
        data: {
          surName,
          name,
          email: email || existingUser.email, // Keep old email if not provided
          password: hashedPassword,
          userType: 'REGISTERED',
        },
      })

      const t1 = performance.now()
      console.log("register update", t1 - t0)

      // Generate JWT token
      const token = jwt.sign({ 
        userId: updatedUser.id,
        phoneNumber: updatedUser.phoneNumber,
        email: updatedUser.email,
        name: updatedUser.name
      }, JWT_SECRET, { 
        expiresIn: '30d' 
      })

      return {
        token,
        user: {
          id: updatedUser.id,
          surName: updatedUser.surName,
          name: updatedUser.name,
          phoneNumber: updatedUser.phoneNumber,
          email: updatedUser.email,
          userType: updatedUser.userType
        }
      }
    } catch (error) {
      console.error('User update error:', error)
      throw createError({ 
        statusCode: 500, 
        message: 'Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа.' 
      })
    }
  }

  // If no existing user, proceed with normal registration
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const t0 = performance.now()

    const user = await prisma.user.create({
      data: {
        surName,
        name,
        phoneNumber,
        email,
        password: hashedPassword,
        userType: 'REGISTERED',
      },
    })

    const t1 = performance.now()
    console.log("register create", t1 - t0)

    // Generate JWT token
    const token = jwt.sign({ 
      userId: user.id,
      phoneNumber: user.phoneNumber,
      email: user.email,
      name: user.name
    }, JWT_SECRET, { 
      expiresIn: '30d' 
    })

    return {
      token,
      user: {
        id: user.id,
        surName: user.surName,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        userType: user.userType
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw createError({ 
      statusCode: 500, 
      message: 'Хэрэглэгчийн бүртгэл үүсгэхэд алдаа гарлаа.' 
    })
  }
})
