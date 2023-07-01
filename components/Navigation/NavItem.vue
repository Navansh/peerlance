<script setup lang="ts">
defineProps({
  name: String,
  href: String,
  icon: String,
})
</script>

<template>
  <NuxtLink :to="href" class="bg-[#14161b]" flex items-center justify-start gap-2 rounded-xl px-6 py-6>
    <div :class="icon" color-brand />
    {{ name }}
  </NuxtLink>
</template>

<style scoped>

</style>
