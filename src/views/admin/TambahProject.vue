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

        <h1 class="text-3xl font-bold text-[#0D2A58]">Tambah Project</h1>
      </header>

      <form @submit.prevent="simpanProject">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <label
              for="nama-project"
              class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Nama Project</label
            >
            <input
              type="text"
              id="nama-project"
              v-model="form.namaProject"
              class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div>
            <label
              for="mulai-project"
              class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Mulai Project</label
            >
            <input
              type="date"
              id="mulai-project"
              v-model="form.mulaiProject"
              placeholder="DD/MM/YYYY"
              class="w-full bg-gray-200 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div>
            <label
              for="total-bobot"
              class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Total Bobot Project</label
            >
            <div class="flex items-center">
              <input
                type="number"
                id="total-bobot"
                v-model="form.totalBobot"
                class="w-full bg-gray-200 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
              />
              <span
                class="bg-gray-200 p-3 rounded-r-lg text-[#0D2A58] font-bold text-lg"
                >%</span
              >
            </div>
          </div>

          <div>
            <label
              for="selesai-project"
              class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Selesai Project</label
            >
            <input
              type="date"
              id="selesai-project"
              v-model="form.selesaiProject"
              placeholder="DD/MM/YYYY"
              class="w-full bg-gray-200 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div class="flex items-end gap-4">
            <div class="flex-grow">
              <label
                for="kontraktor"
                class="block text-lg font-bold text-[#0D2A58] mb-2"
                >Kontraktor</label
              >
              <input
                type="text"
                id="kontraktor"
                v-model="form.kontraktor"
                class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58]"
              />
            </div>
            <button
              type="button"
              class="text-4xl text-[#0D2A58] font-light hover:text-blue-700 transition-colors pb-1"
            >
              +
            </button>
          </div>

          <div>
            <label
              for="statusproject"
              class="block text-lg font-bold text-[#0D2A58] mb-2"
              >Status Project</label
            >

            <div class="relative">
              <select
                id="statusproject"
                v-model="form.status_project"
                class="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D2A58] text-gray-700 appearance-none pr-10"
              >
                <option disabled value="">Pilih status</option>

                <option value="berjalan">Berjalan</option>
                <option value="Ditunda">Ditunda</option>
                <option value="Selesai">Selesai</option>
              </select>

              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-700"
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

        <div class="flex justify-end gap-4 mt-12">
          <RouterLink
            to="/dashboard/allproject"
            type="button"
            class="px-10 py-2 border-2 border-[#0D2A58] text-[#0D2A58] font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Batal
          </RouterLink>
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
import { RouterLink, useRouter } from "vue-router";
import { reactive } from "vue";
import { useProjectStore } from "@/stores/project";

const router = useRouter();
const projectStore = useProjectStore();

// form reactive
const form = reactive({
  namaProject: "",
  mulaiProject: "",
  totalBobot: null,
  selesaiProject: "",
  kontraktor: "",
  status_project: "",
});

// Fungsi simpan
const simpanProject = async () => {
  try {
    const newProject = {
      project_name: form.namaProject,
      start_project: form.mulaiProject || null,
      end_project: form.selesaiProject || null,
      total_progress: form.totalBobot || null,
      contractor_name: form.kontraktor || null,
      cumulative_progress: 0, // default 0
      user_id: "3b8c44c0-8653-4861-9b86-5ad4edab940d", // kalau belum ada auth, isi null
      status_project: form.status_project || null,
    };

    await projectStore.create(newProject);
    alert("Project berhasil ditambahkan!");
    router.push("/allproject");
  } catch (e) {
    alert("Gagal menyimpan project: " + e.message);
  }
};
</script>

<style scoped>
/* Menambahkan gaya kustom jika diperlukan,
   namun untuk kasus ini Tailwind sudah mencukupi. */
.font-sans {
  font-family: "Poppins", sans-serif; /* Contoh jika ingin menggunakan font kustom */
}
</style>
