<script setup lang="ts">
import { getFileContents } from '@/lib/hedera/sdk/helpers'

const props = defineProps({
  hederaFileId: {
    type: String,
    required: true,
  },
})

const hederaData = useHederaClient()

const imageLoading = ref(true)
const fileData = ref('')

onMounted(async () => {
  const contents = await getFileContents(hederaData, props.hederaFileId)

  fileData.value = contents
  imageLoading.value = false
})
</script>

<template>
  <div>
    <div v-if="imageLoading" h-48 w-full flex flex-col items-center justify-center gap-2 text-zinc-400>
      <div i-eos-icons-loading />
      Loading image from Hedera File Service
    </div>
    <img v-else h-48 w-full object-cover object-center :src="fileData" alt="thumbnail">
  </div>
</template>

<style scoped>

</style>
