import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth(() => ({
  appName: 'NuxtHub Better Auth Starter',
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: import.meta.env.GITHUB_CLIENT_ID || '',
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET || '',
    },
  },
}))
