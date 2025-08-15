// // Alternative that sometimes works better with bundlers
// import * as PrismaImport from '@prisma/client'
// const { PrismaClient } = PrismaImport

// const prisma = new PrismaClient({
//   log: process.env.NODE_ENV === 'development' ? ['query'] : [],
// })

// export { prisma }