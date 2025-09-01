<script setup>
import Loading from "@/components/Loading.vue";
import { RouterLink } from "vue-router";
import { onMounted, watch, nextTick, ref } from "vue";
import { useProjectStore } from "@/stores/project";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // penting agar sumbu X bisa baca tanggal

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  TimeScale
);

const projects = useProjectStore();
const chartInstances = ref([]);

onMounted(async () => {
  await projects.fetchProjectsWithProgress();
});

watch(
  () => projects.items,
  async (newProjects) => {
    await nextTick();

    newProjects.forEach((p, index) => {
      const canvas = document.getElementById("chart-" + index);
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      if (chartInstances.value[index]) {
        chartInstances.value[index].destroy();
      }

      console.log("Membuat chart untuk:", p.project_name);
      console.log("Data target:", p.target);
      console.log("Data progress:", p.progress);

      chartInstances.value[index] = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Target",
              borderColor: "red",
              backgroundColor: "red",
              data: p.target, // <-- array [{x,y}]
              parsing: {
                xAxisKey: "x",
                yAxisKey: "y",
              },
              tension: 0.3, // biar smooth (opsional)
            },
            {
              label: "Aktual",
              borderColor: "black",
              backgroundColor: "black",
              data: p.progress, // <-- array [{x,y}]
              parsing: {
                xAxisKey: "x",
                yAxisKey: "y",
              },
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: p.project_name,
            },
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              title: {
                display: true,
                text: "Tanggal",
              },
            },
            y: {
              title: {
                display: true,
                text: "Progress (%)",
              },
              min: 0,
              max: p.total_progress ?? 100,
            },
          },
        },
      });
    });
  },
  { deep: true }
);
</script>

<template>
  <div
    class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6"
  >
    <div class="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <RouterLink
          to="/dashboard"
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
        </RouterLink>

        <h1 class="text-2xl font-bold text-[#0D2A58]">All Project</h1>

        <RouterLink
          to="/dashboard/addproject"
          class="bg-[#EBEB09] px-4 py-2 rounded-lg font-bold text-black hover:bg-[#FFFF04] transition-colors"
        >
          + Tambah Project
        </RouterLink>
      </div>

      <Loading v-if="projects.loading" />

      <div v-else-if="projects.error" class="text-red-600 text-center py-20">
        {{ projects.error }}
      </div>

      <!-- Grid Card -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(p, index) in projects.items"
          :key="p.project_id"
          class="bg-blue-200 rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
        >
          <!-- Header Card -->
          <div class="flex justify-between items-center mb-2">
            <div class="text-left">
              <span class="text-sm text-gray-700">#{{ p.project_id }}</span>
              <h2 class="font-bold text-blue-900">{{ p.project_name }}</h2>
            </div>

            <div class="flex gap-2">
              <!-- Tombol Edit -->
              <RouterLink
                :to="`/dashboard/editproject/${p.project_id}`"
                class="bg-yellow-400 text-blue-900 px-3 py-1 rounded-md hover:bg-yellow-300 transition text-sm"
              >
                Edit
              </RouterLink>
            </div>
          </div>

          <!-- Chart -->
          <canvas :id="'chart-' + index"></canvas>

          <!-- Button -->
          <RouterLink
            to="/detailpekerjaan"
            class="mt-auto bg-white px-4 py-2 rounded-lg font-bold text-blue-900 border border-blue-900 hover:bg-blue-100 transition text-center"
          >
            Lihat Detail Pekerjaan
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
