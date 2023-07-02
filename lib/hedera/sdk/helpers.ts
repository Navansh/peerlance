import { type Client, TopicCreateTransaction } from '@hashgraph/sdk'

export async function createTopic(client: Client, projectName: string) {
  const topicCreateTransaction = new TopicCreateTransaction()
    .setTopicMemo(`SourceOfTruth Tracker for Project: ${projectName}`)

  const txResponse = await topicCreateTransaction.execute(client)
  const receipt = await txResponse.getReceipt(client)
  const newTopicId = receipt.topicId

  return newTopicId
}
