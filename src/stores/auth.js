// src/stores/useAuthStore.js
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role || null,
  },
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from("user") // pastikan tabelnya "user"
          .select("*")
          .eq("email", email)
          .eq("password", password) // kalau masih plaintext, lebih baik nanti pakai hash
          .single();

        if (error || !data) {
          this.error = "Email atau password salah";
          return false;
        }

        this.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user_id", data.user_id); // simpan id saja kalau perlu
        return true;
      } catch (err) {
        this.error = "Terjadi kesalahan server";
        console.error(err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
    },
  },
});
