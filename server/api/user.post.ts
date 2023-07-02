import prisma from '../prisma'

export default defineEventHandler(async (event) => {
  const userData = await readBody(event)

  prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      userId: userData.userId,
      hederaAccountId: userData.hederaAccountId,
    },
  })
})
