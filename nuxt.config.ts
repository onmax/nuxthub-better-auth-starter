export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/ui', '@onmax/nuxt-better-auth'],

  css: ['~/assets/css/main.css'],

  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'd1',
      connection: { databaseId: '7ceacd83-9a4a-45b3-adf3-bd127df04bce' },
    },
    kv: {
      driver: 'cloudflare-kv-binding',
      namespaceId: '4f701e72f4414181b2a760cbb798fa8d',
    },
    cache: {
      driver: 'cloudflare-kv-binding',
      namespaceId: '519b4c402ce444c6ad7e9a6eac1d58d9',
    },
  },

  // Better Auth: Configure redirects and session storage
  auth: {
    redirects: { login: '/login', guest: '/dashboard' },
    secondaryStorage: true, // Uses KV for session storage
  },

  // Route protection via auth middleware
  routeRules: {
    '/dashboard': { auth: 'user' },
    '/login': { auth: 'guest' },
    '/register': { auth: 'guest' },
  },

  runtimeConfig: {
    public: { siteUrl: 'https://onmax-nuxthub-better-auth-starter.maximogarciamtnez.workers.dev' },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-01',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      nodeCompat: true,
      wrangler: {
        observability: { logs: { enabled: true, head_sampling_rate: 1, invocation_logs: true, persist: true } },
      },
    },
  },
})
