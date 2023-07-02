import prisma from '@/server/prisma'

export default defineEventHandler(async (event) => {
  const requestQuery = getQuery(event)
  const { userId } = requestQuery

  const userData = await prisma.user.findFirst({
    where: {
      userId: userId! as string,
    },
  })

  return userData
})
