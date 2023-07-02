import { FileAppendTransaction, FileContentsQuery, FileCreateTransaction, Hbar, TopicCreateTransaction } from '@hashgraph/sdk'
import type { HederaComposable } from '@/composables/useHederaClient'

export async function createTopic(hederaData: HederaComposable, projectName: string, projectId: string) {
  const client = hederaData.client
  const topicCreateTransaction = new TopicCreateTransaction()
    .setTopicMemo(`SourceOfTruth Tracker for Project: ${projectName} | ID: ${projectId}`)

  const txResponse = await topicCreateTransaction.execute(client)
  const receipt = await txResponse.getReceipt(client)
  const newTopicId = receipt.topicId

  return newTopicId?.toString()
}

export async function createFile(hederaData: HederaComposable, projectName: string) {
  const transaction = new FileCreateTransaction()
    .setFileMemo(`Thumbnail image for Project: ${projectName}`)
    .setMaxTransactionFee(new Hbar(10))
    .setKeys([hederaData.filePublicKey])
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
    .setContents(chunk)
    .setMaxTransactionFee(new Hbar(10))
    .freezeWith(hederaData.client)

  const signTx = await transaction.sign(hederaData.filePrivateKey)
  const txResponse = await signTx.execute(client)
  const receipt = await txResponse.getReceipt(client)
  const transactionStatus = receipt.status

  return {
    transactionId: txResponse.transactionId,
    transactionStatus,
  }
}

export async function getFileContents(hederaData: HederaComposable, fileId: string) {
  const client = hederaData.client
  const fileContentsQuery = new FileContentsQuery()
    .setFileId(fileId)

  const contents = await fileContentsQuery.execute(client)
  const decoded = new TextDecoder().decode(contents)

  return decoded
}

// Consensus Service
