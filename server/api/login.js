// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient()

import prisma from '../utils/prisma.js'

export const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { phoneNumber, password } = body;

  if (!phoneNumber || !password) {
    throw createError({ statusCode: 400, message: 'Phone number and password are required.' });
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  if (!user || !user.password) {
    throw createError({ statusCode: 401, message: 'Invalid credentials.' });
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials.' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, userName: user.username, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

  return { token, user };
});

