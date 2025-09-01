<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div
    class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6"
  >
    <div class="bg-white w-full max-w-6xl rounded-xl shadow-lg p-4 sm:p-6">
      <!-- Header -->
      <header class="flex flex-wrap items-center justify-between mb-6 gap-4">
        <h1 class="bg-gray-100 border rounded px-4 py-2 font-bold">
          Contruction Report SCK2
        </h1>
        <nav class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="font-bold">Report:</span>
            <RouterLink
              to="/dashboard/reportlist"
              class="border rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200 relative"
            >
              📩
            </RouterLink>
          </div>
          <button
            @click="handleLogout()"
            class="flex items-center gap-2 font-bold hover:underline"
          >
            <span class="border rounded-full p-2">👤</span>
            Logout
          </button>
        </nav>
      </header>

      <router-view />
    </div>
  </div>
</template>
