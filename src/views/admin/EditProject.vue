<template>
  <div
    class="bg-gray-800 min-h-screen flex items-center justify-center p-4 font-sans"
  >
    <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl">
      <header class="flex justify-between items-center mb-10">
        <RouterLink
          to="/dashboard"
          class="p-2 border-2 border-[#0D2A58] rounded-lg text-[#0D2A58] hover:bg-gray-100 transition-colors"
        >
          <!-- Icon Home -->
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

        <h1 class="text-3xl font-bold text-[#0D2A58]">Edit Project</h1>
      </header>

      <form @submit.prevent="handleUpdate">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <!-- Nama Project -->
          <div>
            <label class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Nama Project</label
            >
            <input
              type="text"
              v-model="project.project_name"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <!-- Mulai Project -->
          <div>
            <label class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Mulai Project</label
            >
            <input
              type="date"
              v-model="project.start_project"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <!-- Selesai Project -->
          <div>
            <label class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Selesai Project</label
            >
            <input
              type="date"
              v-model="project.end_project"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <!-- Kontraktor -->
          <div>
            <label class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Kontraktor</label
            >
            <input
              type="text"
              v-model="project.contractor_name"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <!-- Status Project -->
          <div>
            <label class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Status Project</label
            >
            <select
              v-model="project.status_project"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58] text-gray-700"
            >
              <option disabled value="">Pilih status</option>
              <option value="Berjalan">Berjalan</option>
              <option value="Ditunda">Ditunda</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="flex justify-end gap-4 mt-12">
          <button
            type="button"
            @click="hapusProject"
            class="px-10 py-2 border-2 border-[#0D2A58] text-[#0D2A58] font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Hapus
          </button>
          <button
            type="submit"
            class="px-10 py-2 bg-[#0D2A58] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProjectStore } from "@/stores/project";
import { useRoute, useRouter, RouterLink } from "vue-router";

const projects = useProjectStore();
const route = useRoute();
const router = useRouter();

const project = ref({
  project_id: null,
  project_name: "",
  start_project: "",
  end_project: "",
  contractor_name: "",
  status_project: "",
  total_progress: 100,
});

// Ambil data existing berdasarkan ID dari route
onMounted(() => {
  const existing = projects.items.find(
    (p) => p.project_id === Number(route.params.id)
  );
  if (existing) {
    project.value = { ...existing };
  } else {
    console.error("Project tidak ditemukan, id:", route.params.id);
  }
});

// Update project
const handleUpdate = async () => {
  const updated = await projects.update(project.value.project_id, {
    project_name: project.value.project_name,
    start_project: project.value.start_project,
    end_project: project.value.end_project,
    contractor_name: project.value.contractor_name,
    status_project: project.value.status_project,
    total_progress: project.value.total_progress,
  });

  if (updated) {
    alert("Project berhasil diupdate!");
    router.push("/dashboard/allproject");
  }
};

const hapusProject = async () => {
  if (confirm("Apakah kamu yakin ingin menghapus project ini?")) {
    await projects.delete(project.value.project_id);
    alert("Project berhasil dihapus!");
    router.push("/dashboard/allproject");
  }
};
</script>
