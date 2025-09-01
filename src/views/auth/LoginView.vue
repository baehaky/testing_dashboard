<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#A0BBFF] font-sans px-4 sm:px-6 lg:px-8"
  >
    <!-- Header -->
    <div class="mb-8 text-center">
      <p class="text-xl sm:text-2xl tracking-wide text-[#162F65] font-bold">
        WELCOME TO
      </p>
      <h1
        class="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#162F65]"
      >
        Construction Report SCK2
      </h1>
    </div>

    <!-- Card -->
    <div
      class="w-full max-w-md sm:max-w-lg md:max-w-[800px] bg-[#162F65] text-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl"
    >
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 sm:gap-5">
        <!-- Username -->
        <input
          v-model="email"
          type="email"
          placeholder="Username/Email"
          class="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <!-- Password -->
        <input
          v-model="password"
          type="password"
          placeholder="Kata Sandi"
          class="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-yellow-400 text-blue-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          Masuk
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    if (authStore.user?.role === "SuperAdmin") {
      router.push("/dashboard");
    } else if (authStore.user?.role === "Kontraktor") {
      router.push("/kontraktordashboard");
    } else {
      router.push("/");
    }
  }
};
</script>
