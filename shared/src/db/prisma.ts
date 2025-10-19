import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/prisma'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

console.log('DATABASE_URL: ', process.env.DATABASE_URL)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    omit: {
      user: {
        password: true // globally omit
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
