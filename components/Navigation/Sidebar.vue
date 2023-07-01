<script lang="ts" setup>
const PATHS = [
  {
    name: 'My Projects',
    href: '/projects/me',
    icon: 'i-tabler-brand-backbone',
  },
  {
    name: 'Weekly Battles',
    href: '/battles',
    icon: 'i-tabler-swords',
  },
  {
    name: 'Review Logs',
    href: '/review-logs',
    icon: 'i-tabler-swipe',
  },
  {
    name: 'My Stats',
    href: '/stats',
    icon: 'i-tabler-chart-line',
  },
  {
    name: 'Badges Earned',
    href: '/badges',
    icon: 'i-tabler-badge',
  },
]
</script>

<template>
  <div class="bg-[#212328]" mx-4 h-full w-full flex flex-col justify-between rounded-xl px-4 py-4>
    <div flex items-center gap-2 px-4 py-2>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path id="Vector" d="M4.66663 24.5V22.1667C4.66663 20.929 5.15829 19.742 6.03346 18.8668C6.90863 17.9917 8.09562 17.5 9.33329 17.5H14M6.99996 8.16667C6.99996 9.40434 7.49162 10.5913 8.36679 11.4665C9.24196 12.3417 10.4289 12.8333 11.6666 12.8333C12.9043 12.8333 14.0913 12.3417 14.9665 11.4665C15.8416 10.5913 16.3333 9.40434 16.3333 8.16667C16.3333 6.92899 15.8416 5.742 14.9665 4.86683C14.0913 3.99167 12.9043 3.5 11.6666 3.5C10.4289 3.5 9.24196 3.99167 8.36679 4.86683C7.49162 5.742 6.99996 6.92899 6.99996 8.16667Z" stroke="#D6FE63" stroke-width="3" stroke-linecap="square" stroke-linejoin="round" />
          <path id="Vector_2" d="M25.375 18.6667V25.6667L19.5417 21L13.7084 25.6667V18.6667L19.5417 14L25.375 18.6667Z" stroke="#D6FE63" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" />
        </g>
      </svg>

      <h1 text-xl font-medium tracking-wide>
        PeerLance
      </h1>
    </div>

    <div flex flex-col gap-4>
      <NavigationNavItem v-for="path in PATHS" :key="path.href" :name="path.name" :href="path.href" :icon="path.icon" />
    </div>

    <div />
  </div>
</template>

<style scoped></style>
