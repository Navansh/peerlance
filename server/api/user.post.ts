import prisma from '../prisma'

export default defineEventHandler(async (event) => {
  const userData = await readBody(event)

  const userExists = await prisma.user.findUnique({ where: { userId: userData.userId } })

  if (userExists) {
    return {
      id: userExists.id,
    }
  }

  const id = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      userId: userData.userId,
      hederaAccountId: userData.hederaAccountId,
    },
  })

  return {
    id: id.id,
  }
})
