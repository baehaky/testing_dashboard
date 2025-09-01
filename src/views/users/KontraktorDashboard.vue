<template>
  <div class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <button
          class="p-2 border-2 border-[#0D2A58] rounded-lg text-[#0D2A58] hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>

        <h1 class="text-2xl font-bold text-[#0D2A58]">All Project</h1>

        <button
          class="bg-[#EBEB09] px-4 py-2 rounded-lg font-bold text-black hover:bg-[#FFFF04] transition-colors"
        >
          + Tambah Project
        </button>
      </div>

      <!-- Grid Card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-blue-200 rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
        >
          <!-- Header Card -->
          <div class="flex justify-between items-center mb-2">
            <h2 class="font-bold text-blue-900">{{ project.name }}</h2>
            <span class="text-sm text-gray-700">{{ project.id }}</span>
          </div>

          <!-- Chart -->
          <canvas :id="'chart-' + index" class="mb-4"></canvas>

          <!-- Button -->
          <button
            class="mt-auto bg-white px-4 py-2 rounded-lg font-bold text-blue-900 border border-blue-900 hover:bg-blue-100 transition"
          >
            Lihat Detail Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
);

const projects = [
  { id: "prj12345", name: "Training Ground" },
  { id: "prj12346", name: "Gedung Serbaguna" },
  { id: "prj12347", name: "Lapangan Basket" },
  { id: "prj12348", name: "Taman Kota" },
];

// Data dummy chart
const chartData = {
  labels: ["01/08", "05/08", "10/08", "15/08", "20/08"],
  datasets: [
    {
      label: "Target",
      borderColor: "red",
      backgroundColor: "red",
      data: [0, 10, 30, 50, 70],
      fill: false,
    },
    {
      label: "Aktual",
      borderColor: "black",
      backgroundColor: "black",
      data: [0, 5, 20, 40, 60],
      fill: false,
    },
  ],
};

onMounted(() => {
  projects.forEach((_, index) => {
    const ctx = document.getElementById("chart-" + index).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Progress (%)",
            },
            min: 0,
            max: 100,
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      },
    });
  });
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>