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
      return sendRedirect(event, '/login', 302);
    }

    // Fetch user information from the database
    const t0 = performance.now();
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        emailVerified: true,
        userType: true,
      },
    });

    const t1 = performance.now();

    console.log("user data",t1-t0)
    // If the user doesn't exist, return a 404
    if (!user) {
      return { statusCode: 404, body: { message: 'User not found' } };
    }

    // Return user data
    return { statusCode: 200, body: user };
  } catch (err) {
    // Log the error for debugging (remove in production)
    console.error('Error verifying token or fetching user:', err);

    // Return a 401 Unauthorized error
    return { statusCode: 401, body: { message: 'Unauthorized access' } };
  } finally {
    // Close the Prisma connection
    await prisma.$disconnect();
  }
});
