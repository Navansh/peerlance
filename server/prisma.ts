import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

const globalWithPrisma = globalThis as typeof globalThis & {
  prisma: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
}
else {
  if (!globalWithPrisma.prisma)
    globalWithPrisma.prisma = new PrismaClient()

  prisma = globalWithPrisma.prisma
}

export default prisma
