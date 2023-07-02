<script setup lang="ts">
import type { User } from 'firebase/auth'
import { isWalletAvailable, isWalletConnected, userAccountId } from '@/lib/hedera/wallet/store'
import { connectToWallet, hashconnect, initHashConnect } from '@/lib/hedera/wallet/init'

const props = defineProps<{
  signedInUser: User | null
}>()

consola.withTag('Hedera').info('init: ', hashconnect)

onMounted(async () => {
  await initHashConnect()
})

watch(userAccountId, async () => {
  consola.withTag('Hedera').info('newUserAccountId: ', userAccountId.value)
  if (!userAccountId.value) {
    consola.withTag('Hedera').info('userAccountId is empty')
    return
  }

  consola.withTag('Hedera').info('userAccountId: ', userAccountId.value)
  const data = await $fetch('/api/user', {
    method: 'POST',
    body: {
      hederaAccountId: userAccountId.value,
      name: props.signedInUser?.displayName,
      email: props.signedInUser?.email,
      userId: props.signedInUser?.uid,
    },
  })

  consola.withTag('Register user API').info('data: ', data)

  navigateTo('/')
})
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
