<template>
  <div
    class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6"
  >
    <div class="bg-white w-full max-w-6xl rounded-xl shadow-lg p-4 sm:p-6">
      <!-- Top Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow">
          <h3 class="font-bold">Total Project</h3>

          <p class="text-6xl font-bold">
            {{ projectStore.totalProject }}
          </p>

          <p class="mt-1">
            {{ projectStore.avgCumulative.toFixed(0) }} % Selesai
          </p>
        </div>
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow">
          <h3 class="font-bold">Total Project Selesai</h3>
          <p class="text-6xl font-bold">{{ projectStore.totalProjectDone }}</p>
          <p class="mt-1">
            {{ projectStore.avgCumulativeDone.toFixed(0) }} % Selesai
          </p>
        </div>
      </div>

      <!-- Pendapatan -->
      <div
        class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow mb-2"
      >
        <h3 class="text-lg font-semibold mb-2">
          Total Pendapatan Sport Centre Tangerang Tahun Ini
        </h3>
        <p class="text-3xl md:text-4xl font-bold mb-4">Rp. 65.345.567.432,00</p>
        <RouterLink
          to="/dashboard/detailpemasukan"
          class="bg-white text-[#2C5FDF] px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Lihat Detail Pemasukan
        </RouterLink>
      </div>

      <!-- Pilih Tahun: di bawah pendapatan, pojok kanan -->
      <div class="w-full flex justify-end mb-6">
        <div class="flex items-center gap-2">
          <label class="font-semibold">Pilih Tahun</label>
          <div class="relative">
            <select
              v-model="selectedYear"
              @change="handleYearChange"
              class="bg-[#2C5FDF] text-white rounded px-3 py-2 appearance-none pr-10"
            >
              <option v-for="y in [2025, 2024, 2023]" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Total Project Tahun Ini -->
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow">
          <h3>Total Project Tahun Ini</h3>
          <p class="text-4xl font-bold">{{ projectStore.totalProjectYear }}</p>
          <p>{{ projectStore.percentDone }} % Selesai</p>
        </div>

        <!-- Total Pekerjaan Selesai -->
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow">
          <h3>Total Pekerjaan Selesai</h3>
          <p class="text-4xl font-bold">{{ projectStore.totalDone }}</p>
          <p>{{ projectStore.percentDone }} % Selesai</p>
        </div>

        <!-- Total Pekerjaan Berjalan -->
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center shadow">
          <h3>Total Pekerjaan Berjalan</h3>
          <p class="text-4xl font-bold">{{ projectStore.totalOngoing }}</p>
          <p>{{ projectStore.percentOngoing }} % Berjalan</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <RouterLink
          to="/dashboard/allproject"
          class="bg-[#2C5FDF] hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow font-semibold"
        >
          Lihat Semua Project
        </RouterLink>
        <RouterLink
          to="/dashboard/alluser"
          class="bg-[#2C5FDF] hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow flex items-center gap-2 font-semibold"
        >
          Lihat Semua Pengguna 👤
        </RouterLink>
        <RouterLink
          to="/dashboard/addproject"
          class="bg-[#EBEB09] hover:bg-yellow-400 text-black px-6 py-2 rounded-full shadow font-bold"
        >
          + Tambah Project
        </RouterLink>
      </div>

      <!-- Chart & Detail Section -->
      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-blue-100 rounded-lg p-4"
      >
        <!-- Filter -->
        <div class="flex flex-col gap-2 order-1">
          <label class="font-semibold">Pilih Project</label>
          <div class="relative">
            <select
              id="statusproject"
              class="w-full bg-[#2C5FDF] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58] text-white appearance-none pr-10"
            >
              <option>Training Ground</option>
              <option>MiniSoccer</option>
              <option>Padel</option>
            </select>

            <div
              class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <label class="font-semibold">Pilih Bulan</label>
            <div class="relative">
              <select
                id="statusproject"
                class="w-full bg-[#2C5FDF] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58] text-white appearance-none pr-10"
              >
                <option>Januari</option>
                <option>Februari</option>
                <option>Maret</option>
                <option>April</option>
                <option>Mei</option>
                <option>Juni</option>
                <option>Juli</option>
                <option>Agustus</option>
                <option>September</option>
                <option>Oktober</option>
                <option>November</option>
                <option>Desember</option>
              </select>

              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div
          class="order-3 md:order-2 col-span-1 lg:col-span-2 flex w-full flex-col items-center h-64 bg-white px-5 pb-10 pt-2 rounded-lg"
        >
          <h3 class="font-bold mb-2">Training Ground</h3>
          <canvas ref="progressChart" class="h-56 w-full"></canvas>
        </div>

        <!-- Info -->
        <!-- Info Box -->
        <div class="flex flex-col gap-4 order-2 md:order-3">
          <div
            class="bg-[#2C5FDF] text-white text-center p-4 rounded-lg shadow"
          >
            <h3>Total Pekerjaan Selesai</h3>
            <p class="text-3xl sm:text-4xl font-bold">10</p>
          </div>
          <div
            class="bg-[#2C5FDF] text-white text-center p-4 rounded-lg shadow"
          >
            <h3>Total Pekerjaan Tertunda</h3>
            <p class="text-3xl sm:text-4xl font-bold">1</p>
          </div>
          <RouterLink
            to="/dashboard/detailproject"
            class="bg-white hover:bg-[#2C5FDF] text-[#2C5FDF] px-4 py-2 rounded-lg shadow font-bold border-2 border-[#2C5FDF] hover:text-white transition-colors text-center"
          >
            Lihat Detail Project
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";

const progressChart = ref(null);
const projectStore = useProjectStore();
const selectedYear = ref(new Date().getFullYear());

onMounted(async () => {
  // Ambil data project
  await projectStore.countProjects();
  await projectStore.countProjectsDone();
  await projectStore.countSummary(selectedYear.value);

  // Inisialisasi chart
  if (progressChart.value) {
    new Chart(progressChart.value, {
      type: "line",
      data: {
        labels: ["01/08", "05/08", "10/08", "15/08", "20/08"],
        datasets: [
          {
            label: "Target",
            data: [0, 20, 40, 60, 80],
            borderColor: "red",
            backgroundColor: "red",
            fill: false,
          },
          {
            label: "Aktual",
            data: [0, 10, 25, 50, 70],
            borderColor: "black",
            backgroundColor: "black",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
});

// 🔑 Tambahin watch biar otomatis reload ketika ganti tahun
watch(selectedYear, async (newYear) => {
  await projectStore.countSummary(newYear);
});
</script>
