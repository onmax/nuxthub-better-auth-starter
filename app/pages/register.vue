<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ auth: 'guest' })

const { signUp, signIn } = useUserSession()
const toast = useToast()

const schema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})
type Schema = z.output<typeof schema>

const state = reactive({ name: '', email: '', password: '' })
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  await signUp.email(event.data, {
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
        <h2 class="text-xl font-semibold">Create Account</h2>
        <p class="text-sm text-muted">Sign up to get started</p>
      </template>

      <UForm :schema :state class="space-y-4" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" placeholder="Your name" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" placeholder="you@example.com" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Create a password" />
        </UFormField>
        <UButton type="submit" block :loading>Create Account</UButton>

        <UDivider label="or" />

        <UButton block variant="outline" @click="handleGitHub">
          <UIcon name="i-simple-icons-github" />
          Continue with GitHub
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-center text-sm">
          Already have an account?
          <NuxtLink to="/login" class="text-primary underline">Sign In</NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
