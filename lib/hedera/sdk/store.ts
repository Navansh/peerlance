import { ref } from 'vue'

export const totalChunks = ref(0)
export const currentChunk = ref(0)
export const currentFileId = ref('')
export const fileUploadTransactions = ref<string[]>([])
