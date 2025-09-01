<template>
  <div class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6">
    <!-- Card Utama -->
    <div class="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-6">
        <RouterLink to="/dashboard" class="p-2 border-2 border-[#0D2A58] rounded-lg text-[#0D2A58] hover:bg-gray-100 transition-colors" >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </RouterLink>
        <h1 class="text-2xl font-bold text-[#0D2A58]">Report Project</h1>
      </div>

      <!-- List Report -->
      <div class="flex flex-col gap-4">
        <div
          v-for="item in reports"
          :key="item.id"
          class="rounded-xl p-4 text-[#0D2A58] font-bold"
          :class="{
            'bg-red-500 text-white': item.status === 'Rejected',
            'bg-green-400 text-white': item.status === 'Done',
            'bg-white border border-gray-300': item.status === 'Belum Review'
          }"
        >
          <div class="flex justify-between items-center">
            <span>{{ item.id }}</span>
            <span>{{ item.kontraktor }}</span>
          </div>

          <div class="text-xl my-1">{{ item.tanggal }}</div>
          <div>{{ item.judul }}</div>

          <div class="flex justify-end mt-2">
            <RouterLink to="/reportview"
              v-if="item.status === 'Belum Review'"
              class="bg-white text-blue-800 border border-blue-800 px-3 py-1 rounded shadow hover:bg-blue-100"
            >
              Review
          </RouterLink>
            <span v-else-if="item.status === 'Rejected'" class="text-white">Rejected</span>
            <span v-else-if="item.status === 'Done'" class="text-white">Done</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from "vue";

const reports = ref([
  {
    id: "rpt0021",
    tanggal: "18/08/25",
    judul: "Training Ground - Pemasangan Rumput Sintetis",
    kontraktor: "sinarumput",
    status: "Rejected",
  },
  {
    id: "rpt0022",
    tanggal: "18/08/25",
    judul: "Training Ground - Paving Blok",
    kontraktor: "sinarumput",
    status: "Done",
  },
  {
    id: "rpt0023",
    tanggal: "20/08/25",
    judul: "Renovasi Jalan Akses",
    kontraktor: "megabuild",
    status: "Belum Review",
  },
]);
</script>