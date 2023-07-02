<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import type { Project } from '@/utils/types'
import { associateToken, transferToken } from '@/lib/hedera/sdk/helpers'

const hederaData = useHederaClient()
const userName = ref('')
const projects = ref<Project[]>([])

async function sendTokenClicked(project: Project) {
  // eslint-disable-next-line no-alert
  const amount = prompt(`How many tokens do you want to send to ${project.User.name} | Account ID: ${project.User.hederaAccountId}`)

  if (!amount)
    return

  const auth = getAuth()
  const user = auth.currentUser

  const { $toast } = useNuxtApp()
  $toast.info('Initializing to send tokens...')

  $toast.info('Checking token association status')
  const status = await associateToken(hederaData, project.User.hederaAccountId)
  $toast.success(`Token associated | Status: ${status}`)

  $toast.info('Sending tokens...')
  const { transactionId } = await transferToken(hederaData, project.User.hederaAccountId, Number(amount), project.name, project.projectId, user?.displayName || 'No Name')

  $toast.success(`Tokens sent | Transaction ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/transaction/${transactionId}">${transactionId}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })
}

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
      Hello <span text-brand underline="~ wavy brand">{{ userName }},</span>
    </h1>

    <div v-if="projects.length" grid grid-cols-3 gap-4>
      <div v-for="project in projects" :key="project.projectId" flex flex-col gap-2 border-2 rounded-xl>
        <HederaImage :hedera-file-id="project.imageFileId" />

        <div px-4 pt-1>
          {{ project.name }}
        </div>

        <div w-full flex gap-4 px-4 pb-2>
          <button class="bg-[#424448]" w-full flex items-center justify-center gap-2 rounded-md py-1>
            <div color="#df96f9" i-tabler-message2-up />
            Review
          </button>

          <button class="bg-[#424448]" w-full flex items-center justify-center gap-2 rounded-md py-1 @click="sendTokenClicked(project)">
            <div>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M8.94942 18.3331C8.69059 18.3331 8.43533 18.2726 8.204 18.1565L1.46067 14.7782C1.35503 14.725 1.26187 14.65 1.18732 14.5582C1.11276 14.4663 1.0585 14.3597 1.02811 14.2454C0.997723 14.1311 0.991893 14.0117 1.01101 13.8949C1.03012 13.7782 1.07374 13.6668 1.139 13.5682L8.25567 2.03819C8.33164 1.92389 8.4347 1.83014 8.55566 1.76529C8.67663 1.70044 8.81175 1.6665 8.949 1.6665M8.94942 18.3331C9.20825 18.3331 9.46351 18.2726 9.69484 18.1565L16.4382 14.7782C16.8865 14.5532 17.0365 13.9857 16.759 13.5682L9.64234 2.03819C9.56636 1.92389 9.46331 1.83014 9.34234 1.76529C9.22138 1.70044 9.08625 1.6665 8.949 1.6665M8.94942 18.3331L8.949 1.6665" stroke="#DF96F9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            Send Token
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      No Projects Found
    </div>
  </div>
</template>

<style scoped></style>
