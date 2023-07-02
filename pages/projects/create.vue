<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { createTopic } from '@/lib/hedera/sdk/helpers'
import { currentChunk, currentFileId, currentFileTransactionId, fileUploadTransactions, totalChunks } from '@/lib/hedera/sdk/store'
import { splitFileIntoChunksAndUploadToHedera } from '@/utils/image'

const hederaData = useHederaClient()

const projectName = ref('')
const projectDescription = ref('')
const githubLink = ref('')
const imageBase64 = ref('')

// @ts-expect-error no typing on parameter
function onFileChange(e) {
  consola.info('onFileChange', e)
  const files = e.target.files || e.dataTransfer.files
  if (!files.length)
    return

  // covert file to base64
  const reader = new FileReader()
  reader.readAsDataURL(files[0])
  reader.onload = (e) => {
    imageBase64.value = (e.target!.result || '') as string
  }
}

function generateHederaURL(transactionId: string) {
  return `https://hashscan.io/testnet/transaction/${transactionId}`
}

async function createProject() {
  if (!projectName.value || !currentFileId.value || !currentFileTransactionId.value)
    return

  const { $toast } = useNuxtApp()

  const projectId = nanoid()

  const topicData = await createTopic(hederaData, projectName.value, projectId)
  consola.info('topicId', topicData)

  $toast.success(`Created Topic for Project | Transaction ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/transaction/${topicData.transactionId}">${topicData.transactionId}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })

  const auth = getAuth()
  const user = auth.currentUser

  const project = {
    projectId,
    creatorId: user?.uid || 'N/A',
    name: projectName.value,
    description: projectDescription.value,
    imageFileId: currentFileId.value,
    hederaTopicId: topicData.topicId,
    links: [
      {
        url: githubLink.value,
      },
    ],
  }

  await $fetch('/api/project', {
    method: 'POST',
    body: project,
  })
}

watch(imageBase64, async () => {
  consola.info('imageBase64', imageBase64.value)
  if (!imageBase64.value)
    return
  const k = await splitFileIntoChunksAndUploadToHedera(hederaData, imageBase64.value, projectName.value)
  consola.info('k', k)
})

onMounted(() => {
  totalChunks.value = 0
  currentChunk.value = 0
  currentFileId.value = null
  currentFileTransactionId.value = null
  fileUploadTransactions.value = []
})
</script>

<template>
  <div h-full flex flex-col gap-6>
    <h1 text-2xl font-bold>
      Add your Project, <span text-brand underline="~ wavy brand">Lancer</span>
    </h1>

    <div class="h-1/3 w-full rounded-xl bg-[#212328]">
      <img h-full w-full rounded-xl object-cover :src="imageBase64" alt="">
    </div>

    <div flex flex-col gap-4>
      <!-- <progress h-6 w-full rounded-full value="12" max="20" /> -->
      <div w-full rounded-full class="bg-[#808080]">
        <div
          h-6 w-fit rounded-full bg-brand transition-all duration-700 :style="{
            width: `${(Number(currentChunk) / Number(totalChunks)) * 100}%`,
          }"
        />
      </div>
      <div w-full flex items-center gap-4 text-black>
        <input :disabled="projectName.length <= 0" type="file" @change="onFileChange">
        <input v-model="projectName" w-full rounded-md px-4 py-2 placeholder="Enter Name" type="text">
        <input v-model="projectDescription" w-full rounded-md px-4 py-2 placeholder="Enter Description" type="text">
      </div>

      <div flex gap-4>
        <div class="w-1/2" h-full flex-1 overflow-y-scroll rounded-xl bg-zinc-500 px-4 py-4>
          <h1 font-bold underline="~ wavy" text-brand>
            Hedera File Service Append Transactions
          </h1>

          <div v-auto-animate h-60 pt-2>
            <div v-for="transactionId in fileUploadTransactions" :key="transactionId" flex items-center gap-2>
              <span font-bold>Txn ID:</span>
              <a target="_blank" :href="generateHederaURL(transactionId)" underline> {{ transactionId }}</a>
            </div>
          </div>
        </div>

        <div class="w-1/2" flex flex-col gap-4>
          <input v-model="githubLink" w-full rounded-md px-4 py-2 text-black placeholder="Add Github Link" type="text">

          <div flex flex-col gap-2>
            <div><span font-bold>Hedera File ID:</span> {{ currentFileId ?? 'N/A' }}</div>
            <div><span font-bold>Hedera File Transaction ID:</span> <a underline target="_blank" :href="generateHederaURL(currentFileTransactionId || '')">{{ currentFileId ?? 'N/A' }}</a></div>
          </div>

          <div py-4>
            <button class="w-1/2" rounded-full bg-brand py-2 text-black @click="createProject">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
