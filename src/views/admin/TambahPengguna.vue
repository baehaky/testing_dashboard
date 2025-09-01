<template>
  <transition name="slide">
    <div v-if="show" class="fixed inset-0 z-50 flex justify-end">
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="close"
      ></div>

      <!-- Sidebar -->
      <div
        class="relative bg-blue-200 w-full sm:w-96 h-full p-6 rounded-l-2xl shadow-lg overflow-y-auto"
      >
        <!-- Header -->
        <h2 class="text-lg font-bold text-blue-900 mb-4">
          {{ isEdit ? "Edit Pengguna" : "Tambah Pengguna" }}
        </h2>

        <!-- Form -->
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700"
              >Username</label
            >
            <input
              v-model="localForm.username"
              type="text"
              required
              class="w-full bg-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div v-if="!isEdit">
            <label class="block text-sm font-semibold text-gray-700"
              >Password</label
            >
            <input
              v-model="localForm.password"
              type="password"
              required
              class="w-full bg-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700"
              >Organisasi</label
            >
            <input
              v-model="localForm.organization"
              type="text"
              required
              class="w-full bg-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700"
              >Email</label
            >
            <input
              v-model="localForm.email"
              type="email"
              required
              class="w-full bg-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-[#0D2A58]"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700"
              >Role</label
            >
            <select
              v-model="localForm.role"
              required
              class="w-full bg-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-[#0D2A58]"
            >
              <option disabled value="">-- Pilih Role --</option>
              <option>SuperAdmin</option>
              <option>Kontraktor</option>
              <option>Owner</option>
              <option>Pemkab</option>
            </select>
          </div>
          <div class="flex justify-end gap-4 mt-12">
            <button
              type="button"
              @click="close"
              class="px-10 py-2 border-2 border-[#0D2A58] text-[#0D2A58] font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Batal
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
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  form: Object,
  isEdit: Boolean,
});
const emit = defineEmits(["close", "save"]);

const localForm = ref({ ...props.form });

// sinkronisasi form dari parent
watch(
  () => props.form,
  (val) => {
    localForm.value = { ...val };
  },
  { deep: true, immediate: true }
);

const close = () => {
  emit("close");
};

const save = () => {
  emit("save", { ...localForm.value });
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
