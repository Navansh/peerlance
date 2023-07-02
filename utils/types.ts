export interface Project {
  id: number
  creatorId: string
  projectId: string
  hederaTopicId: string
  name: string
  description: string
  imageFileId: string
  createdAt: string
  updatedAt: string
  userId: any
  Links: Link[]
}

export interface Link {
  id: number
  linkId: string
  projectId: string
  url: string
  createdAt: string
  updatedAt: string
}
