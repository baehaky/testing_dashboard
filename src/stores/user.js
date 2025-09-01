import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [], // 👈 ganti ke plural
    loading: false,
    error: "",
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("role", "Kontraktor");

        if (error) throw error;
        this.users = data || [];
      } catch (err) {
        this.error = err.message || "Gagal memuat data pengguna";
        console.error("Fetch users error:", err);
      } finally {
        this.loading = false;
      }
    },

    async createUser(user) {
      this.error = "";
      try {
        // 1. Buat user di auth.users
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: user.email,
            password: user.password,
          }
        );
        if (authError) throw authError;

        const userId = authData.user?.id;
        if (!userId) throw new Error("Gagal membuat user di auth");

        // 2. Insert ke public.user
        const { data: publicUser, error: publicError } = await supabase
          .from("user")
          .insert([
            {
              user_id: userId,
              username: user.username,
              organization: user.organization,
              email: user.email,
              password: user.password,
              role: user.role,
            },
          ])
          .select()
          .single();
        if (publicError) throw publicError;

        // 3. Update state
        this.users.unshift(publicUser);

        return publicUser;
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },

    async updateUser(user) {
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("user")
          .update({
            username: user.username,
            organization: user.organization,
            email: user.email,
            role: user.role,
          })
          .eq("user_id", user.user_id) // pastikan pakai user_id
          .select()
          .single();
        if (error) throw error;

        // update di state
        const idx = this.users.findIndex((u) => u.id === user.id);
        if (idx !== -1) this.users[idx] = data;
        return data;
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },

    async deleteUser(id) {
      this.error = "";
      try {
        const { error: authError } = await supabase.auth.admin.deleteUser(id);
        if (authError) throw authError;

        const { error } = await supabase
          .from("user")
          .delete()
          .eq("user_id", id);
        if (error) throw error;

        this.users = this.users.filter((u) => u.user_id !== id);
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },
  },
});
