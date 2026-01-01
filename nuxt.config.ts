export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/ui', '@onmax/nuxt-better-auth'],

  future: { compatibilityVersion: 4 },

  hub: {
    db: 'sqlite',
    kv: true,
    cache: true,
  },

  auth: {
    redirects: { login: '/login', guest: '/dashboard' },
    secondaryStorage: true,
  },

  routeRules: {
    '/dashboard': { auth: 'user' },
    '/login': { auth: 'guest' },
    '/register': { auth: 'guest' },
  },

  runtimeConfig: {
    public: { siteUrl: '' },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-01',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        compatibility_flags: ['nodejs_compat'],
        d1_databases: [{ binding: 'DB', database_id: '7ceacd83-9a4a-45b3-adf3-bd127df04bce' }],
        kv_namespaces: [
          { binding: 'KV', id: '4f701e72f4414181b2a760cbb798fa8d' },
          { binding: 'CACHE', id: '519b4c402ce444c6ad7e9a6eac1d58d9' },
        ],
      },
    },
  },
})
