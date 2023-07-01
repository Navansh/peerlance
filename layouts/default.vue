<script setup lang="ts">
</script>

<template>
  <div class="bg-[#14161b] font-sans text-white">
    <div class="h-screen flex gap-8 px-4 py-4" overflow-y-hidden>
      <div>
        <NavigationSidebar />
      </div>

      <div flex-1>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
