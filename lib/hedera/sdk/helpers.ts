import { type Client, FileAppendTransaction, FileCreateTransaction, TopicCreateTransaction } from '@hashgraph/sdk'
import type { HederaComposable } from '@/composables/useHederaClient'

export async function createTopic(client: Client, projectName: string) {
  const topicCreateTransaction = new TopicCreateTransaction()
    .setTopicMemo(`SourceOfTruth Tracker for Project: ${projectName}`)

  const txResponse = await topicCreateTransaction.execute(client)
  const receipt = await txResponse.getReceipt(client)
  const newTopicId = receipt.topicId

  return newTopicId
}

export async function createFile(hederaData: HederaComposable, projectName: string) {
  const transaction = new FileCreateTransaction()
    .setFileMemo(`Thumbnail image for Project: ${projectName}`)
    .freezeWith(hederaData.client)

  const signTx = await transaction.sign(hederaData.filePrivateKey)
  const submitTx = await signTx.execute(hederaData.client)
  const receipt = await submitTx.getReceipt(hederaData.client)
  const newFileId = receipt.fileId

  return {
    fileId: newFileId,
    transactionId: submitTx.transactionId,
  }
}

export async function appendToFile(hederaData: HederaComposable, fileId: string, chunk: string, projectName: string) {
  const client = hederaData.client
  const transaction = new FileAppendTransaction()
    .setFileId(fileId)
    .setTransactionMemo(`Chunk for Project: ${projectName}`)
    .setContents(chunk)
    .freezeWith(client)

  const signTx = await transaction.sign(hederaData.filePrivateKey)
  const txResponse = await signTx.execute(client)
  const receipt = await txResponse.getReceipt(client)
  const transactionStatus = receipt.status

  return {
    transactionId: txResponse.transactionId,
    transactionStatus,
  }
}
