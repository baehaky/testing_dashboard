<template>
  <div class="min-h-screen bg-[#162F65] flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6 relative">
     <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <!-- Kiri: Back -->
      <RouterLink
        to="/dashboard"
        class="p-2 rounded-lg text-[#0D2A58] hover:bg-gray-200 transition-colors"
      >
        ✖
      </RouterLink>

      <!-- Tengah: Judul -->
      <h1 class="text-2xl font-bold text-blue-900 text-left flex-1">
        Detail Project
      </h1>

      <!-- Kanan: Nama Project -->
      <span class="text-sm font-semibold text-gray-600">
        #Training Ground
      </span>
    </div>


      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center">
          <h3>Total Pekerjaan</h3>
          <p class="text-4xl font-bold">{{ pekerjaan.length }}</p>
          <p>{{ selesaiPersen }} % Selesai</p>
        </div>
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center">
          <h3>Total Pekerjaan Selesai</h3>
          <p class="text-4xl font-bold">{{ totalSelesai }}</p>
          <p>{{ selesaiPersen }} % Selesai</p>
        </div>
        <div class="bg-[#2C5FDF] text-white rounded-lg p-6 text-center">
          <h3>Total Pekerjaan Berjalan</h3>
          <p class="text-4xl font-bold">{{ totalBerjalan }}</p>
          <p>{{ berjalanPersen }} % Berjalan</p>
        </div>
      </div>

      <!-- Tombol tambah -->
      <div class="flex justify-end mb-4">
        <h1 class="text-2xl font-bold text-blue-900 text-left flex-1">
          Tabel Detail Pekerjaan
        </h1>
        <button
          class="bg-[#EBEB09] px-4 py-2 rounded-lg font-bold text-black hover:bg-yellow-400"
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
              <th class="px-3 py-2">Actual Progress</th>
              <th class="px-3 py-2">Bobot Pekerjaan</th>
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
              <td class="px-3 py-2">{{ item.progress }}%</td>
              <td class="px-3 py-2">{{ item.bobot }}%</td>
              <td class="px-3 py-2 flex gap-3">
                <button @click="openForm(item, index)" class="text-blue-700 hover:underline">✏ edit</button>
                <button @click="deletePekerjaan(index)" class="text-red-700 hover:underline">🗑 delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Form Sidebar -->
      <div v-if="showForm" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showForm = false"></div>
        
        <div class="relative bg-blue-200 w-full sm:w-96 h-full p-6 rounded-l-2xl shadow-lg overflow-y-auto">
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
            <!-- ⚠ Progress dihapus karena dihitung otomatis -->
            <label>Bobot % Pekerjaan</label>
            <input v-model="form.bobot" type="number" class="rounded px-3 py-2 bg-gray-200" />
          </div>
          <div class="flex justify-between mt-6">
            <button @click="showForm = false" class="bg-gray-300 px-4 py-2 rounded font-semibold">Batal</button>
            <button @click="saveForm" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

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
    progress: 10, // ⚠ ini nanti jangan dari form, tapi dari API report
    bobot: 10,
  },
  {
    id: "pkr12346",
    namaPekerjaan: "Pemasangan Rumput Sintetis",
    noKontrak: "12345678",
    kontraktor: "Sinarumput",
    uom: "M2",
    volume: 10000,
    mulai: "2025-08-14",
    selesai: "2025-10-12",
    progress: 5,
    bobot: 15,
  },
  {
    id: "pkr12347",
    namaPekerjaan: "Pemasangan Lampu",
    noKontrak: "21323425",
    kontraktor: "SinarDunia",
    uom: "Unit",
    volume: 4,
    mulai: "2025-10-13",
    selesai: "2020-10-19",
    progress: 0,
    bobot: 12,
  },
]);

// Stats
const totalSelesai = computed(() => pekerjaan.value.filter(p => p.progress >= 100).length);
const totalBerjalan = computed(() => pekerjaan.value.filter(p => p.progress > 0 && p.progress < 100).length);
const selesaiPersen = computed(() => pekerjaan.value.length ? Math.round((totalSelesai.value / pekerjaan.value.length) * 100) : 0);
const berjalanPersen = computed(() => pekerjaan.value.length ? Math.round((totalBerjalan.value / pekerjaan.value.length) * 100) : 0);

// State form
const showForm = ref(false);
const editIndex = ref(null);
const form = ref({});

// Open form
const openForm = (item = null, index = null) => {
  if (item) {
    form.value = { ...item };
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
      bobot: 0,
    };
    editIndex.value = null;
  }
  showForm.value = true;
};

// Save
const saveForm = () => {
  if (!form.value.namaPekerjaan) {
    alert("Harap isi semua field!");
    return;
  }
  if (editIndex.value !== null) {
    pekerjaan.value[editIndex.value] = { ...form.value, progress: pekerjaan.value[editIndex.value].progress };
  } else {
    pekerjaan.value.push({ ...form.value, progress: 0 }); // progress default 0
  }
  showForm.value = false;
};

// Delete
const deletePekerjaan = (index) => {
  if (confirm("Yakin hapus pekerjaan ini?")) {
    pekerjaan.value.splice(index, 1);
  }
};
</script>