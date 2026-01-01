import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

const githubClientId = import.meta.env.GITHUB_CLIENT_ID
const githubClientSecret = import.meta.env.GITHUB_CLIENT_SECRET

export default defineServerAuth(() => ({
  appName: 'NuxtHub Better Auth Starter',
  emailAndPassword: { enabled: true },
  socialProviders: githubClientId && githubClientSecret
    ? { github: { clientId: githubClientId, clientSecret: githubClientSecret } }
    : {},
}))
