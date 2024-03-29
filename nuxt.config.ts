import { appDescription } from './constants/index'
import { pwa } from './config/pwa'

export default defineNuxtConfig({

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    [
      '@pinia/nuxt',
      {
        autuImports: [
          'defineStore',
          'storeToRefs',
        ],
      },
    ],
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@element-plus/nuxt',
  ],
  // experimental: {
  //   // when using generate, payload js assets included in sw precache manifest
  //   // but missing on offline, disabling extraction it until fixed
  //   payloadExtraction: false,
  //   inlineSSRStyles: false,
  //   renderJsonPayloads: true,
  // },
  css: [
    '@unocss/reset/tailwind.css',
    // '@/assets/css/global.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import '@/assets/css/global.scss';  

        `,
        },
      },
    },
  },

  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:3000/**',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
