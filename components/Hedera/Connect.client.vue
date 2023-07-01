<script setup lang="ts">
import { isWalletAvailable, isWalletConnected, userAccountId } from '@/lib/hedera/wallet/store'
import { connectToWallet, hashconnect, initHashConnect } from '@/lib/hedera/wallet/init'

await initHashConnect()
consola.withTag('Hedera').info('init: ', hashconnect)
</script>

<template>
  <div>
    <div v-if="isWalletAvailable">
      <div v-if="isWalletConnected" flex items-center gap-2>
        <span font-bold underline="~ double">Hedera Account ID:</span> {{ userAccountId }}
      </div>
      <button v-else flex items-center gap-2 rounded-full bg-white px-4 py-2 text-black @click="connectToWallet">
        <div i-simple-icons-hedera />
        Connect Hedera Wallet
      </button>
    </div>

    <div v-else flex items-center gap-2>
      <div i-fxemoji-warningsign />
      No wallet found!
    </div>
  </div>
</template>

<style scoped>

</style>
