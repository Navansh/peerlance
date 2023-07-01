<script lang="ts" setup>
import app from '@/utils/firebase'

consola.withTag('INIT').info('Hello, Firebase!', app)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
