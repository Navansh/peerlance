<script setup lang="ts">
import { initHashConnect } from '@/lib/hedera/wallet/init'

await initHashConnect()

consola.withTag('meta').info('Hello, hashconnect!')
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-zinc-900 font-mono text-white">
    Hello, Pizza!
  </div>
</template>

<style scoped></style>
