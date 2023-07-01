import { HashConnect } from 'hashconnect'

import { isWalletAvailable, isWalletConnected, userAccountId } from './store'

const hashconnect = new HashConnect(true)

const appMetadata = {
  name: 'Repu',
  description: 'Repu~',
  icon: 'http://localhost:30000/icon.png',
  url: 'http://localhost:30000',
}

export async function initHashConnect() {
  const previousData = await hashconnect.init(appMetadata, 'testnet', true)

  if (previousData.savedPairings.length)
    userAccountId.value = previousData.savedPairings[0].accountIds[0]
}

hashconnect.foundExtensionEvent.once(() => {
  isWalletAvailable.value = true
})

hashconnect.pairingEvent.once((walletMetadata) => {
  consola.withTag('Hedera').info('pairingEvent', walletMetadata)

  userAccountId.value = walletMetadata.pairingData?.accountIds[0] ?? null
  isWalletConnected.value = true
})

watch(isWalletAvailable, (isAvailable) => {
  consola.withTag('Hedera').info('isWalletAvailable', isAvailable)
})

export function connectToWallet() {
  if (!isWalletAvailable.value)
    return null

  hashconnect.connectToLocalWallet()
}

export { hashconnect }
