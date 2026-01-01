<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ auth: 'guest' })

const { signIn } = useUserSession()
const toast = useToast()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})
type Schema = z.output<typeof schema>

const state = reactive({ email: '', password: '' })
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  await signIn.email(event.data, {
    onSuccess: () => navigateTo('/dashboard'),
    onError: (ctx: { error: Error }) => toast.add({ title: 'Error', description: ctx.error.message, color: 'error' }),
  })
  loading.value = false
}

async function handleGitHub() {
  await signIn.social({ provider: 'github', callbackURL: '/dashboard' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold">Sign In</h2>
        <p class="text-sm text-muted">Enter your credentials to access your account</p>
      </template>

      <UForm :schema :state class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" placeholder="you@example.com" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Your password" />
        </UFormField>
        <UButton type="submit" block :loading>Sign In</UButton>

        <UDivider label="or" />

        <UButton block variant="outline" @click="handleGitHub">
          <UIcon name="i-simple-icons-github" />
          Continue with GitHub
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary underline">Register</NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
