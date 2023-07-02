import { appendToFile, createFile } from 'lib/hedera/sdk/helpers'
import type { HederaComposable } from '@/composables/useHederaClient'

export async function splitFileIntoChunksAndUploadToHedera(hederaData: HederaComposable, base64Image: string, projectId: string) {
  const fileId = await createFile(hederaData, projectId)
  const chunks = chunk(base64Image, 4 * 1024)

  const chunkIds = []
  for (const chunk of chunks) {
    const chunkId = appendToFile(hederaData, fileId.fileId?.toString() || '', chunk, projectId)
    chunkIds.push(chunkId)
  }

  return {
    fileId,
    chunkIds,
  }
}

export function chunk(s: string, maxBytes: number) {
  const decoder = new TextDecoder('utf-8')
  let buf = new TextEncoder().encode(s)
  const result = []
  let counter = 0
  while (buf.length) {
    consola.withTag('FileChunker').info(`=============== BEG LOOP ${counter} ===============`)
    consola.withTag('FileChunker').info('result is now:')
    consola.withTag('FileChunker').info(result)
    consola.withTag('FileChunker').info('buf is now:')
    consola.withTag('FileChunker').info(decoder.decode(buf))
    let i = buf.lastIndexOf(32, maxBytes + 1)
    consola.withTag('FileChunker').info(`i is: ${i}`)
    if (i < 0)
      i = buf.indexOf(32, maxBytes)
    consola.withTag('FileChunker').info(`at first condition, i is: ${i}`)

    if (i < 0)
      i = buf.length
    consola.withTag('FileChunker').info(`at second condition, i is: ${i}`)
    consola.withTag('FileChunker').info(`pushing buf.slice from 0 to ${i} into result array`)
    result.push(decoder.decode(buf.slice(0, i)))

    consola.withTag('FileChunker').info(`buf.slicing with value: ${i + 1}`)
    buf = buf.slice(i + 1)
    consola.withTag('FileChunker').info(`=============== END LOOP ${counter} ===============`)
    counter++
  }
  return result
}

consola.withTag('FileChunker').info(chunk('Hey there! € 100 to pay', 12))
