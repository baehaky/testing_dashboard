<template>
  <div class="min-h-screen bg-[#162F65] flex items-center justify-center p-6">
    <div class="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-[#0D2A58]">List Semua Pengguna</h1>
        <button
          @click="openForm(null)"
          class="bg-[#EBEB09] px-4 py-2 rounded-lg font-bold text-black hover:bg-[#FFFF04]"
        >
          + Tambah Pengguna
        </button>
      </div>

      <div v-if="userStore.loading" class="text-center py-6 text-blue-600">
        🔄 Sedang memuat data...
      </div>

      <!-- Error -->
      <div v-else-if="userStore.error" class="text-center py-6 text-red-600">
        ⚠ {{ userStore.error }}
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse shadow rounded-lg overflow-hidden">
          <thead class="bg-blue-200 text-blue-900">
            <tr>
              <th class="px-3 py-2">User_ID</th>
              <th class="px-3 py-2">Username</th>
              <th class="px-3 py-2">Organization</th>
              <th class="px-3 py-2">Email</th>
              <th class="px-3 py-2">Role</th>
              <th class="px-3 py-2">Action</th>
            </tr>
          </thead>

          <!-- kalau ada data -->
          <tbody v-if="userStore.users.length > 0" class="bg-blue-100">
            <tr
              v-for="(user, index) in userStore.users"
              :key="user.user_id"
              class="border-b hover:bg-blue-200 text-center"
            >
              <td class="px-3 py-2">{{ index + 1 }}</td>
              <td class="px-3 py-2">{{ user.username }}</td>
              <td class="px-3 py-2">{{ user.organization }}</td>
              <td class="px-3 py-2">{{ user.email }}</td>
              <td class="px-3 py-2">{{ user.role }}</td>
              <td class="px-3 py-2 flex gap-2 text-center justify-center">
                <button
                  class="text-blue-600 font-semibold hover:underline"
                  @click="openForm(user, index)"
                >
                  ✏ Edit
                </button>
                <button
                  class="text-red-600 font-semibold hover:underline"
                  @click="deleteUser(user.user_id)"
                >
                  🗑 Hapus
                </button>
              </td>
            </tr>
          </tbody>

          <!-- kalau kosong -->
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center py-6 text-gray-500 italic">
                Belum ada pengguna ditemukan
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sidebar Form -->
      <TambahPengguna
        :show="showForm"
        :form="form"
        :isEdit="editIndex !== null"
        @close="closeForm"
        @save="saveForm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user"; // 👈 import store
import TambahPengguna from "@/views/admin/TambahPengguna.vue";

const userStore = useUserStore();

// state untuk sidebar form
const showForm = ref(false);
const editIndex = ref(null);

const form = ref({
  id: "",
  username: "",
  organization: "",
  email: "",
  role: "",
  password: "",
});

// fetch data saat halaman dibuka
onMounted(() => {
  userStore.fetchUsers();
});

// buka form
const openForm = (user = null, index = null) => {
  if (user) {
    form.value = { ...user, password: "" };
    editIndex.value = index;
  } else {
    form.value = {
      username: "",
      organization: "",
      email: "",
      role: "",
      password: "",
    };
    editIndex.value = null;
  }
  showForm.value = true;
};

// tutup form
const closeForm = () => {
  showForm.value = false;
};

// simpan form
const saveForm = async (data) => {
  try {
    if (editIndex.value !== null) {
      await userStore.updateUser(data); // update lewat store
    } else {
      await userStore.createUser(data); // create lewat store
    }
    closeForm();
  } catch (e) {
    alert("Gagal menyimpan: " + e.message);
  }
};

// hapus user
const deleteUser = async (id) => {
  if (confirm("Yakin mau hapus pengguna ini?")) {
    try {
      await userStore.deleteUser(id);
    } catch (e) {
      alert("Gagal menghapus: " + e.message);
    }
  }
};
</script>
