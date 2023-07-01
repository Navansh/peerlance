<script setup lang="ts">
</script>

<template>
  <div class="bg-[#14161b] font-sans text-white">
    <div class="grid grid-cols-12 h-screen gap-4 py-4" overflow-y-hidden>
      <div col-span-2>
        <NavigationSidebar />
      </div>

      <div col-span-10>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
