import prisma from '@/server/prisma'

export default defineEventHandler(async (event) => {
  const requestQuery = getQuery(event)
  const { userId } = requestQuery

  const userData = await prisma.user.findUnique({
    where: {
      userId: userId! as string,
    },
  })

  if (!userData) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return userData
})
