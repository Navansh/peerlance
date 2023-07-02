<script lang="ts" setup>
import { getAuth } from 'firebase/auth'
import { userAccountId } from '@/lib/hedera/wallet/store'
import app from '@/utils/firebase'

const loading = ref(true)

consola.withTag('INIT').info('Hello, Firebase!', app)

onMounted(async () => {
  const auth = getAuth()

  auth.onAuthStateChanged(async (user) => {
    consola.withTag('INIT').info('user: ', user)
    if (user) {
      const userInfo = await $fetch('/api/user', {
        method: 'get',
        query: {
          userId: user.uid,
        },
      })

      if (!userInfo)
        navigateTo('/login')

      // @ts-expect-error untyped
      userAccountId.value = userInfo.hederaAccountId

      consola.withTag('INIT').info('userInfo: ', userInfo)

      loading.value = false
      navigateTo('/')
    }
    else {
      loading.value = false
      navigateTo('/login')
    }
  })
})
</script>

<template>
  <div v-if="loading" flex items-center justify-center bg-center text-white class="font-poppins h-screen bg-[#14161b] bg-[url(/bg.svg)] bg-center bg-no-repeat">
    <div i-eos-icons-loading h-12 w-12 />
  </div>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
