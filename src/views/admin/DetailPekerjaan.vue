<template>
  <div class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6">
    <!-- Card Utama -->
    <div class="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6 relative">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <!-- Kiri: Icon + Judul -->
        <div class="flex items-center space-x-3">
          <RouterLink
            to="/dashboard"
            class="p-2 border-2 border-[#0D2A58] rounded-lg text-[#0D2A58] hover:bg-gray-100 transition-colors"
          >
            <!-- icon home -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </RouterLink>
          <h1 class="text-2xl font-bold text-blue-900">Detail Pekerjaan</h1>
        </div>

        <!-- Kanan: Tombol -->
        <button
          class="bg-[#EBEB09] px-4 py-2 rounded-lg font-bold text-black hover:bg-[#FFFF04]"
          @click="openForm()"
        >
          + Tambah Pekerjaan
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead class="bg-blue-200 text-blue-900">
            <tr>
              <th class="px-3 py-2">Pekerjaan_Id</th>
              <th class="px-3 py-2">Nama Pekerjaan</th>
              <th class="px-3 py-2">Nomor Kontrak</th>
              <th class="px-3 py-2">Nama Kontraktor</th>
              <th class="px-3 py-2">UoM</th>
              <th class="px-3 py-2">Volume</th>
              <th class="px-3 py-2">Mulai Pekerjaan</th>
              <th class="px-3 py-2">Selesai Pekerjaan</th>
              <th class="px-3 py-2">Bobot %</th>
              <th class="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody class="bg-blue-100">
            <tr
              v-for="(item, index) in pekerjaan"
              :key="item.id"
              class="border-b hover:bg-blue-200"
            >
              <td class="px-3 py-2">{{ item.id }}</td>
              <td class="px-3 py-2">{{ item.namaPekerjaan }}</td>
              <td class="px-3 py-2">{{ item.noKontrak }}</td>
              <td class="px-3 py-2">{{ item.kontraktor }}</td>
              <td class="px-3 py-2">{{ item.uom }}</td>
              <td class="px-3 py-2">{{ item.volume }}</td>
              <td class="px-3 py-2">{{ item.mulai }}</td>
              <td class="px-3 py-2">{{ item.selesai }}</td>
              <td class="px-3 py-2">{{ item.bobot }}%</td>
              <td class="px-3 py-2 flex gap-2">
                <button
                  class="text-blue-600 font-semibold hover:underline"
                  @click="openForm(item, index)"
                >
                  ✏ Edit
                </button>
                <button
                  class="text-red-600 font-semibold hover:underline"
                  @click="deletePekerjaan(index)"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Popup Form -->
      <div v-if="showForm" class="fixed inset-0 z-50 flex justify-end">
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-40"
          @click="showForm = false"
        ></div>

        <!-- Sidebar Form -->
        <div
          class="relative bg-blue-200 w-full sm:w-96 h-full p-6 rounded-l-2xl shadow-lg overflow-y-auto z-60"
        >
          <h3 class="text-lg font-bold text-blue-900 mb-4">
            {{ editIndex !== null ? "Edit Pekerjaan" : "Tambah Pekerjaan" }}
          </h3>

          <div class="flex flex-col gap-3">
            <label>Nama Kontraktor</label>
            <input v-model="form.kontraktor" type="text" class="rounded px-3 py-2 bg-gray-200" />

            <label>Nomor Kontrak</label>
            <input v-model="form.noKontrak" type="text" class="rounded px-3 py-2 bg-gray-200" />

            <label>Nama Pekerjaan</label>
            <input v-model="form.namaPekerjaan" type="text" class="rounded px-3 py-2 bg-gray-200" />

            <label>UoM</label>
            <input v-model="form.uom" type="text" class="rounded px-3 py-2 bg-gray-200" />

            <label>Volume</label>
            <input v-model="form.volume" type="number" class="rounded px-3 py-2 bg-gray-200" />

            <label>Mulai Pekerjaan</label>
            <input v-model="form.mulai" type="date" class="rounded px-3 py-2 bg-gray-200" />

            <label>Selesai Pekerjaan</label>
            <input v-model="form.selesai" type="date" class="rounded px-3 py-2 bg-gray-200" />

            <label>Bobot % Pekerjaan</label>
            <input v-model="form.bobot" type="number" class="rounded px-3 py-2 bg-gray-200" />
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-between mt-6">
            <button
              @click="showForm = false"
              class="bg-gray-300 px-4 py-2 rounded font-semibold"
            >
              Batal
            </button>
            <button
              @click="saveForm"
              class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

// Data pekerjaan
const pekerjaan = ref([
  {
    id: "pkr12345",
    namaPekerjaan: "Paving Blok",
    noKontrak: "12345678",
    kontraktor: "Sinarumput",
    uom: "M2",
    volume: 1200,
    mulai: "2025-08-12",
    selesai: "2025-10-30",
    bobot: 10,
  },
]);

// State popup & form
const showForm = ref(false);
const editIndex = ref(null);
const form = ref({
  id: "",
  namaPekerjaan: "",
  noKontrak: "",
  kontraktor: "",
  uom: "",
  volume: "",
  mulai: "",
  selesai: "",
  bobot: "",
});

// Open form (tambah / edit)
const openForm = (item = null, index = null) => {
  if (item) {
    form.value = { ...item }; // clone data lama
    editIndex.value = index;
  } else {
    form.value = {
      id: "pkr" + Date.now(),
      namaPekerjaan: "",
      noKontrak: "",
      kontraktor: "",
      uom: "",
      volume: "",
      mulai: "",
      selesai: "",
      bobot: "",
    };
    editIndex.value = null;
  }
  showForm.value = true;
};

// Save data
const saveForm = () => {
  // Validasi sederhana
  if (
    !form.value.namaPekerjaan ||
    !form.value.noKontrak ||
    !form.value.kontraktor ||
    !form.value.uom ||
    !form.value.volume ||
    !form.value.mulai ||
    !form.value.selesai ||
    !form.value.bobot
  ) {
    alert("Harap isi semua field sebelum simpan!");
    return;
  }

  if (editIndex.value !== null) {
    // update
    pekerjaan.value[editIndex.value] = { ...form.value };
  } else {
    // tambah baru
    pekerjaan.value.push({ ...form.value });
  }
  showForm.value = false;
};

// Delete data
const deletePekerjaan = (index) => {
  if (confirm("Yakin mau hapus pekerjaan ini?")) {
    pekerjaan.value.splice(index, 1);
  }
};
</script>