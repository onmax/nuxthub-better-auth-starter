<script setup lang="ts">
const { signUp, signIn } = useUserSession()
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleRegister() {
  loading.value = true
  await signUp.email(
    { name: name.value, email: email.value, password: password.value },
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
        <h2 class="text-xl font-semibold">Create Account</h2>
        <p class="text-sm text-gray-500">Sign up to get started</p>
      </template>

      <div class="space-y-4">
        <UFormField label="Name">
          <UInput v-model="name" placeholder="Your name" />
        </UFormField>
        <UFormField label="Email">
          <UInput v-model="email" type="email" placeholder="you@example.com" />
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="password" type="password" placeholder="Create a password" />
        </UFormField>
        <UButton block :loading="loading" @click="handleRegister">Create Account</UButton>

        <UDivider label="or" />

        <UButton block variant="outline" @click="handleGitHub">
          <UIcon name="i-simple-icons-github" />
          Continue with GitHub
        </UButton>
      </div>

      <template #footer>
        <p class="text-center text-sm">
          Already have an account?
          <NuxtLink to="/login" class="text-primary underline">Sign In</NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
