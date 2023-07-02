import { appendToFile, createFile } from '@/lib/hedera/sdk/helpers'
import type { HederaComposable } from '@/composables/useHederaClient'

export async function splitFileIntoChunksAndUploadToHedera(hederaData: HederaComposable, base64Image: string, projectId: string) {
  const fileId = await createFile(hederaData, projectId)
  const chunks = splitStringBySize(base64Image)

  consola.withTag('FileChunker').info('Chunks:', chunks.length)

  const chunkIds = []
  let index = 0
  for (const chunk of chunks) {
    index++
    consola.info(fileId.fileId?.toString())
    const chunkId = await appendToFile(hederaData, fileId.fileId?.toString() || '', chunk, projectId)
    chunkIds.push(chunkId)
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
