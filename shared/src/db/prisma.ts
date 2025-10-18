import 'dotenv/config'
import path from 'path'

import dotenv from 'dotenv'
import { PrismaClient } from '../prisma/generated/prisma'

// for DATABASE_URL or just make a new env file in shared
dotenv.config({ path: path.resolve(__dirname, '../../frontend/.env') })

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

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
