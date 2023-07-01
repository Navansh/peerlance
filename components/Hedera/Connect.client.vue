<script setup lang="ts">
import { isWalletAvailable } from '@/lib/hedera/wallet/store'
import { hashconnect, initHashConnect } from '@/lib/hedera/wallet/init'

await initHashConnect()
consola.withTag('[HEDERA]').info('init: ', hashconnect)
</script>

<template>
  <div>
    <button v-if="isWalletAvailable" flex items-center gap-2 rounded-full bg-white px-4 py-2 text-black>
      <div i-simple-icons-hedera />
      Connect Hedera Wallet
    </button>

    <div v-else flex items-center gap-2>
      <div i-fxemoji-warningsign />
      No wallet found!
    </div>
  </div>
</template>

<style scoped>

</style>
