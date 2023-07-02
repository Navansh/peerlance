// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{
        children: 'window.global = globalThis || global',
      }],
      title: 'PeerLance',
      meta: [
        {
          name: 'description',
          content: 'an opinionated nuxt starter template',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/logo.svg',
        },
      ],
    },
  },

  modules: ['@vueuse/nuxt', '@unocss/nuxt'],

  css: [
    '@unocss/reset/tailwind.css',
    'vue-toast-notification/dist/theme-sugar.css',
  ],

  imports: {
    imports: [
      {
        name: 'nanoid',
        from: 'nanoid',
      },
      {
        name: 'consola',
        from: 'consola',
      },
    ],
  },

  vite: {
    define: {
      'window.global': 'globalThis',
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },

  devtools: { enabled: true },

  runtimeConfig: {
    hedera: {
      operator: {
        accountId: process.env.HEDERA_OPERATOR_ACCOUNT_ID,
        privateKey: process.env.HEDERA_OPERATOR_PRIVATE_KEY,
      },
      file: {
        publicKey: process.env.HEDERA_FILE_PUBLIC_KEY,
        privateKey: process.env.HEDERA_FILE_PRIVATE_KEY,
      },
    },

    public: {
      hedera: {
        operator: {
          accountId: process.env.HEDERA_OPERATOR_ACCOUNT_ID,
          privateKey: process.env.HEDERA_OPERATOR_PRIVATE_KEY,
        },
        file: {
          publicKey: process.env.HEDERA_FILE_PUBLIC_KEY,
          privateKey: process.env.HEDERA_FILE_PRIVATE_KEY,
        },
      },
    },
  },
})
