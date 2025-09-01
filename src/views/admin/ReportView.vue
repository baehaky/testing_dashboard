<template>
  <div class="min-h-screen bg-[#162F65] flex flex-col items-center p-4 sm:p-8">
    <!-- Header -->
    <div class="flex items-center justify-between w-full max-w-4xl mb-6">
      <RouterLink
        to="/kontraktordashboard"
        class="p-2 border-2 border-[#ffffff] rounded-lg text-[#ffffff] hover:bg-gray-100 transition-colors"
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
      <h2 class="text-xl sm:text-2xl font-bold text-white">Report Progress</h2>
      <div class="w-10"></div>
    </div>

    <!-- Card -->
    <div
      class="bg-white w-full max-w-4xl rounded-2xl shadow p-6 sm:p-8 space-y-6"
    >
      <!-- Tanggal -->
      <div>
        <label class="block font-semibold text-[#162F65]">Tanggal Report</label>
        <input
          type="date"
          placeholder="DD/MM/YY"
          class="mt-1 w-48 bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
        />
      </div>

      <!-- Project -->
      <div>
        <label class="block font-semibold text-[#162F65]">Project</label>
        <input
          type="text"
          placeholder="Nama Project"
          class="mt-1 w-full bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
        />
      </div>

      <!-- Pekerjaan -->
      <div>
        <label class="block font-semibold text-[#162F65]">Pekerjaan</label>
        <input
          type="text"
          placeholder="Nama Pekerjaan"
          class="mt-1 w-full bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
        />
      </div>

      <!-- Volume -->
      <div class="flex flex-wrap items-end gap-3">
        <div class="mb-5">
          <label class="block font-semibold text-[#162F65]">Volume</label>
          <input
            type="number"
            placeholder="Volume Aktual"
            class="mt-1 w-32 bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
          />
        </div>
        <span class="font-bold text-2xl text-[#162F65] mb-6">/</span>
        <div class="flex flex-col">
          <label class="font-semibold text-blue-900">Target</label>
          <input
            type="text"
            value="10000"
            class="w-28 sm:w-32 bg-gray-200 rounded-md px-3 py-2 text-gray-700 text-center"
          />
          <div class="text-[11px] md:text-xs text-[#0D2A58] font-semibold mt-1">
            {{ currentPercent }}% / 100%
          </div>
        </div>
        <div class="mb-5">
          <label class="block font-semibold text-[#162F65]">UoM</label>
          <input
            type="text"
            placeholder="M2"
            class="mt-1 w-24 bg-gray-200 rounded-md px-3 py-2 text-gray-700 text-center focus:ring-2 focus:ring-[#162F65] focus:outline-none"
          />
        </div>
      </div>

      <!-- Upload Gambar -->
      <div>
        <label class="block font-semibold text-[#162F65] mb-2">Gambar</label>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
        <div
          @click="$refs.fileInput.click()"
          class="flex items-center justify-center w-48 h-36 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition relative"
        >
          <div
            v-if="!previewUrl"
            class="flex flex-col items-center text-[#162F65] font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            Upload Gambar
          </div>
          <img
            v-else
            :src="previewUrl"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div class="space-y-4">
          <input type="file" @change="handleFileChange" />
          <button
            @click="uploadFile"
            class="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Upload
          </button>
          <p>{{ uploadStatus }}</p>
        </div>
      </div>

      <!-- Status dan Kendala -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-semibold text-[#162F65]"
            >Status Pekerjaan</label
          >
          <select
            v-model="statusPekerjaan"
            class="mt-1 w-full bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
          >
            <option value="">-- Pilih Status --</option>
            <option value="Berjalan">Berjalan</option>
            <option value="Ditunda">Ditunda</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold text-[#162F65]"
            >Keterangan/Kendala</label
          >
          <input
            type="text"
            placeholder="Masukkan Keterangan"
            v-model="keterangan"
            class="mt-1 w-full bg-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#162F65] focus:outline-none"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-4 pt-4">
        <button
          class="bg-white hover:bg-red-700 text-[#162F65] font-bold px-6 py-2 rounded-lg shadow border-2 border-[#162F65]"
        >
          Cancel
        </button>
        <button
          @click="submitReport"
          :disabled="loading"
          class="bg-green-500 hover:bg-green-600 text-[#162F65] font-bold px-6 py-2 rounded-lg shadow border-2 border-green-800"
        >
          {{ loading ? "Menyimpan..." : "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { supabase } from "@/lib/supabase.js"

const file = ref(null)       // simpan file yang dipilih
const uploadStatus = ref("") // status upload

const handleFileChange = (event) => {
  file.value = event.target.files[0]
}

const uploadFile = async () => {
  if (!file.value) {
    uploadStatus.value = "Pilih file dulu!"
    return
  }

  try {
    // path penyimpanan unik (pakai timestamp biar nggak bentrok)
    const filePath = `progress-reports/${Date.now()}_${file.value.name}`

    const { data, error } = await supabase.storage
      .from("progress-reports") // nama bucket
      .upload(filePath, file.value, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) throw error

    uploadStatus.value = `✅ Berhasil upload ke ${filePath}`
  } catch (err) {
    uploadStatus.value = `❌ Error: ${err.message}`
  }
}
</script>
