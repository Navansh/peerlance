<script setup lang="ts">
import type { Project } from '@prisma/client'
import { getAuth } from 'firebase/auth'

const userName = ref('')
const projects = ref<Project[]>([])

onMounted(async () => {
  const auth = getAuth()

  if (auth.currentUser) {
    userName.value = (auth.currentUser.displayName || '').split(' ')[0]

    const serverProjects = await $fetch('/api/projects', {
      method: 'GET',
      query: {
        userId: auth.currentUser.uid,
      },
    })

    consola.info('projects', serverProjects)

    // @ts-expect-error non-typed
    projects.value = serverProjects
  }
})
</script>

<template>
  <div h-full flex flex-col gap-6>
    <h1 text-2xl font-bold>
      Hello, <span text-brand underline="~ wavy brand">{{ userName }},</span>
    </h1>

    <div grid grid-cols-3 gap-4>
      <div v-for="project in projects" :key="project.projectId" flex flex-col gap-2 border-2 px-4 py-2>
        <div>{{ project.name }}</div>

        <HederaImage :hedera-file-id="project.imageFileId" />

        <div w-full flex gap-4 py-2>
          <button w-full rounded-md bg-blue-900 py-1>
            Hello
          </button>

          <button w-full rounded-md bg-blue-900 py-1>
            Hello2
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
