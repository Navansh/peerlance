<script setup lang="ts">
const projetName = ref('')
const projectDescription = ref('')
</script>

<template>
  <div h-full flex flex-col gap-6 overflow-y-auto>
    <h1 text-2xl font-bold>
      Add your Project, <span text-brand underline="~ wavy brand">Lancer</span>
    </h1>

    <div class="h-1/3 w-full rounded-xl bg-[#212328]">
      <img h-full w-full rounded-xl object-cover src="https://cdn.discordapp.com/attachments/1112770406059880609/1114880464298192917/Thumbnail.png" alt="">
    </div>

    <div flex flex-col gap-4>
      <div w-full flex items-center gap-4 text-black>
        <input v-model="projetName" w-full rounded-md px-4 py-2 placeholder="Enter Name" type="text">
        <input v-model="projectDescription" w-full rounded-md px-4 py-2 placeholder="Enter Description" type="text">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
