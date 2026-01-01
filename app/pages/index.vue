<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold">NuxtHub Better Auth Starter</h1>
      <p class="text-lg text-gray-500">Full-stack authentication with NuxtHub and Better Auth</p>
      <div class="flex gap-4 justify-center">
        <UButton v-if="loggedIn" to="/dashboard" size="lg">Go to Dashboard</UButton>
        <template v-else>
          <UButton to="/login" size="lg">Sign In</UButton>
          <UButton to="/register" variant="outline" size="lg">Register</UButton>
        </template>
      </div>
    </div>
  </div>
</template>
