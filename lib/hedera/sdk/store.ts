import { ref } from 'vue'

export const totalChunks = ref(0)
export const currentChunk = ref(0)
export const currentFileId = ref<string | null>(null)
export const currentFileTransactionId = ref<string | null>(null)
export const fileUploadTransactions = ref<string[]>([])
