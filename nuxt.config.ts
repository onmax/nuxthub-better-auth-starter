export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/ui', '@onmax/nuxt-better-auth'],

  css: ['~/assets/css/main.css'],

  // NuxtHub: Supports sqlite (D1/Turso), postgresql (Neon), mysql (PlanetScale)
  // Preset auto-detected from hosting provider (Cloudflare, Vercel, Deno, etc.)
  // See: https://hub.nuxt.com/docs/getting-started/installation
  hub: {
    db: 'sqlite',
    kv: true,
    cache: true,
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
    public: { siteUrl: '' }, // Set via NUXT_PUBLIC_SITE_URL
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-01',
})
