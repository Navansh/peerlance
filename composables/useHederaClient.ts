import { AccountId, Client, PrivateKey } from '@hashgraph/sdk'

export function useHederaClient() {
  const config = useRuntimeConfig()
  const hederaConfig = {
    operatorId: (import.meta.env && import.meta.env.SSR) ? config.hedera.operator.accountId : config.public.hedera.operator.accountId,
    operatorKey: (import.meta.env && import.meta.env.SSR) ? config.hedera.operator.privateKey : config.public.hedera.operator.privateKey,
  }

  const operatorId = AccountId.fromString(hederaConfig.operatorId)
  const operatorPrivateKey = PrivateKey.fromString(hederaConfig.operatorKey)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  return client
}
