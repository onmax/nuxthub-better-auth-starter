<script setup lang="ts">
const { user, signOut } = useUserSession()

const loading = ref(false)

async function handleSignOut() {
  loading.value = true
  await signOut()
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <p class="text-sm text-gray-500">You are logged in</p>
      </template>

      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <UAvatar :src="user?.image ?? undefined" :alt="user?.name ?? undefined" size="lg" />
          <div>
            <p class="font-medium">{{ user?.name || 'User' }}</p>
            <p class="text-sm text-gray-500">{{ user?.email }}</p>
          </div>
        </div>

        <UDivider />

        <div class="text-sm text-gray-500">
          <p><strong>User ID:</strong> {{ user?.id }}</p>
          <p><strong>Created:</strong> {{ user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' }}</p>
        </div>
      </div>

      <template #footer>
        <UButton block color="error" variant="soft" :loading="loading" @click="handleSignOut">
          Sign Out
        </UButton>
      </template>
    </UCard>
  </div>
</template>
