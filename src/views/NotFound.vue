<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <div class="text-center px-6">
      <!-- Angka 404 dengan animasi -->
      <h1
        class="text-[8rem] font-extrabold text-indigo-600 drop-shadow-lg animate-bounce"
      >
        404
      </h1>

      <!-- Pesan error -->
      <p class="mt-4 text-xl md:text-2xl text-gray-700 font-semibold">
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <p class="mt-2 text-gray-500">
        Sepertinya kamu nyasar, yuk kembali ke halaman utama 🚀
      </p>

      <!-- Tombol kembali -->
      <RouterLink
        to="/login"
        class="mt-8 inline-block px-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-500 transition transform hover:-translate-y-1"
      >
        ⬅ Kembali ke Beranda
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>
