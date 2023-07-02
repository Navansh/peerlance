import { appendToFile, createFile } from '@/lib/hedera/sdk/helpers'
import type { HederaComposable } from '@/composables/useHederaClient'
import { currentChunk, currentFileId, currentFileTransactionId, fileUploadTransactions, totalChunks } from '@/lib/hedera/sdk/store'

export async function splitFileIntoChunksAndUploadToHedera(hederaData: HederaComposable, base64Image: string, projectId: string) {
  const fileId = await createFile(hederaData, projectId)
  const chunks = splitStringBySize(base64Image)

  totalChunks.value = chunks.length
  currentFileId.value = fileId.transactionId?.toString() || null
  currentFileTransactionId.value = fileId.transactionId?.toString() || null
  consola.withTag('FileChunker').info('Chunks:', chunks.length)

  const chunkIds = []
  let index = 0
  for (const chunk of chunks) {
    index++
    currentChunk.value = index
    consola.info(fileId.fileId?.toString())
    const chunkId = await appendToFile(hederaData, fileId.fileId?.toString() || '', chunk, index, projectId)
    chunkIds.push(chunkId)
    fileUploadTransactions.value.unshift(chunkId.transactionId.toString() || 'NO ID')
    consola.withTag('FileChunker').info('Chunk ID Appended!:', index, chunkId)
  }

  return {
    fileId,
    chunkIds,
  }
}

function splitStringBySize(str: string, chunkSize = 4) {
  const byteSize = chunkSize * 1024 // Convert KB to bytes
  const chunks = []
  let index = 0

  while (index < str.length) {
    const chunk = str.substr(index, byteSize)
    chunks.push(chunk)
    index += byteSize
  }

  return chunks
}
