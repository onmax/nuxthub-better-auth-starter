<script setup lang="ts">
const { signIn } = useUserSession()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleSignIn() {
  loading.value = true
  await signIn.email(
    { email: email.value, password: password.value },
    {
      onSuccess: () => navigateTo('/dashboard'),
      onError: (ctx: { error: Error }) => toast.add({ title: 'Error', description: ctx.error.message, color: 'error' }),
    },
  )
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
        <p class="text-sm text-gray-500">Enter your credentials to access your account</p>
      </template>

      <div class="space-y-4">
        <UFormField label="Email">
          <UInput v-model="email" type="email" placeholder="you@example.com" />
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="password" type="password" placeholder="Your password" />
        </UFormField>
        <UButton block :loading="loading" @click="handleSignIn">Sign In</UButton>

        <UDivider label="or" />

        <UButton block variant="outline" @click="handleGitHub">
          <UIcon name="i-simple-icons-github" />
          Continue with GitHub
        </UButton>
      </div>

      <template #footer>
        <p class="text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary underline">Register</NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
