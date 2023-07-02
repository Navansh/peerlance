import prisma from '@/server/prisma'

export default defineEventHandler(async (event) => {
  const requestQuery = getQuery(event)
  const { userId } = requestQuery

  const projects = await prisma.project.findMany({
    where: {
      creatorId: userId as string || undefined,
    },

    include: {
      Links: true,
    },
  })

  return projects
})
