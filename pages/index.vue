<script setup lang="ts">
import { hashconnect, initHashConnect } from '@/lib/hedera/wallet/init'

await initHashConnect()

consola.info('Hello, hashconnect!', hashconnect)
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-zinc-900 font-mono text-white">
    Hello, Pizza!
  </div>
</template>

<style scoped></style>
