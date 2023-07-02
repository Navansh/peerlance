import { nanoid } from 'nanoid'
import prisma from '../prisma'

export default defineEventHandler(async (event) => {
  const projectData = await readBody(event)

  if (projectData.links) {
    for (const link of projectData.links) {
      await prisma.links.create({
        data: {
          projectId: projectData.projectId,
          url: link.url,
          linkId: nanoid(),
        },
      })
    }
  }

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
