import prisma from '../prisma'

export default defineEventHandler(async (event) => {
  const projectData = await readBody(event)

  const id = await prisma.project.create({
    data: {
      creatorId: projectData.creatorId,
      projectId: projectData.projectId,
      name: projectData.name,
      description: projectData.description,
      imageFileId: projectData.imageFileId,
      hederaTopicId: projectData.hederaTopicId,
    },
  })

  return {
    id: id.id,
  }
})
