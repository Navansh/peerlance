import type { PublicKey } from '@hashgraph/sdk'
import { AccountId, Client, PrivateKey } from '@hashgraph/sdk'

export interface HederaComposable {
  client: Client
  operatorId: AccountId
  operatorPrivateKey: PrivateKey
  filePublicKey: PublicKey
  filePrivateKey: PrivateKey
}

export function useHederaClient(): HederaComposable {
  const config = useRuntimeConfig()
  const hederaConfig = {
    operatorId: (import.meta.env && import.meta.env.SSR) ? config.hedera.operator.accountId : config.public.hedera.operator.accountId,
    operatorKey: (import.meta.env && import.meta.env.SSR) ? config.hedera.operator.privateKey : config.public.hedera.operator.privateKey,

    filePublicKey: (import.meta.env && import.meta.env.SSR) ? config.hedera.file.publicKey : config.public.hedera.file.publicKey,
    filePrivateKey: (import.meta.env && import.meta.env.SSR) ? config.hedera.file.privateKey : config.public.hedera.file.privateKey,
  }

  const operatorId = AccountId.fromString(hederaConfig.operatorId)
  const operatorPrivateKey = PrivateKey.fromString(hederaConfig.operatorKey)
  const filePrivateKey = PrivateKey.fromString(hederaConfig.filePrivateKey)
  const filePublicKey = filePrivateKey.publicKey

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  return {
    client,
    operatorId,
    operatorPrivateKey,
    filePublicKey,
    filePrivateKey,
  }
}
